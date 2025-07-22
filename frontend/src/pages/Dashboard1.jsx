import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Wallet, Search, Send, Users, DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { BACKEND_URL } from '../assets/backurl';
import './Landing.css';

const Dashboard1 = () => {
  const { user, token } = useAuth();
  const [balance, setBalance] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // DEBUG: Log Dashboard1's internal state on every render
  console.log("DASHBOARD_DEBUG: Component Render - User:", user?.username, "Token:", token ? "Present" : "Missing");
  console.log("DASHBOARD_DEBUG: Current State -> selectedRecipient:", selectedRecipient ? selectedRecipient.username : 'null', "transferAmount:", transferAmount, "isLoading:", isLoading);


  // Effect to fetch balance on token change
  useEffect(() => {
    console.log('DASHBOARD_DEBUG: useEffect (fetchBalance) triggered. Token:', token ? 'Present' : 'Missing');
    if (token) {
      fetchBalance();
    } else {
      console.error('DASHBOARD_DEBUG: No token found in useEffect for balance fetch! User might not be authenticated.');
      setErrorMessage('Authentication token missing. Please log in again.');
    }
  }, [token]);

  // Effect for debounced user search
  useEffect(() => {
    console.log('DASHBOARD_DEBUG: useEffect (searchUsers) triggered. SearchQuery:', searchQuery, 'Token:', token ? 'Present' : 'Missing');
    if (searchQuery.trim() && token) { // Ensure token is present for search
      setIsSearching(true);
      const delayDebounceFn = setTimeout(() => {
        searchUsers();
      }, 300); // Debounce search to avoid excessive API calls
      return () => clearTimeout(delayDebounceFn); // Cleanup on unmount or query change
    } else {
      setSearchResults([]);
      setIsSearching(false); // Stop loading spinner if query is empty
    }
  }, [searchQuery, token]); // Add token to dependencies for searchUsers

  const fetchBalance = async () => {
    console.log('DASHBOARD_DEBUG: fetchBalance called. Token:', token ? 'Present' : 'Missing');
    if (!token) {
      console.error('DASHBOARD_DEBUG: fetchBalance - Aborting, no token available.');
      setErrorMessage('Cannot fetch balance: Not authenticated.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/account/balance`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBalance(data.balance);
        console.log('DASHBOARD_DEBUG: Balance fetched successfully:', data.balance);
      } else {
        console.error('DASHBOARD_DEBUG: Failed to fetch balance:', data.message || response.statusText);
        setErrorMessage(`Failed to fetch balance: ${data.message || response.statusText}`);
      }
    } catch (error) {
      console.error('DASHBOARD_DEBUG: Error fetching balance:', error);
      setErrorMessage('Network error while fetching balance.');
    }
  };

  const searchUsers = async () => {
    setIsSearching(true);
    setSearchResults([]); // Clear previous search results immediately
    console.log("DASHBOARD_DEBUG: searchUsers called. Query:", searchQuery, "Token:", token ? 'Present' : 'Missing');
    
    if (!token) {
      console.error('DASHBOARD_DEBUG: searchUsers - Aborting, no token available.');
      setIsSearching(false);
      setErrorMessage('Cannot search users: Not authenticated.');
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/user/bulk?filter=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('DASHBOARD_DEBUG: User search response:', data);
      console.log('DASHBOARD_DEBUG: User search response status:', response.status);
      
      if (response.ok) {
        setSearchResults(data.user || []);
        console.log('DASHBOARD_DEBUG: Search results set:', data.user || []);
      } else {
        console.error('DASHBOARD_DEBUG: Search failed:', data.message || response.statusText);
        setErrorMessage(`Search failed: ${data.message || response.statusText}`);
      }
    } catch (error) {
      console.error('DASHBOARD_DEBUG: Error searching users:', error);
      setErrorMessage('Network error during user search.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleTransfer = async (e) => {
    // THIS IS THE NEW DEBUG STATEMENT
    console.log("DASHBOARD_DEBUG: handleTransfer function top-level invoked."); 
    e.preventDefault(); // Prevent default form submission behavior
    console.log("DASHBOARD_DEBUG: handleTransfer function invoked. (After preventDefault)"); // Confirm function call
    setSuccessMessage(''); // Clear previous message on new attempt
    setErrorMessage(''); // Clear previous error on new attempt
    console.log("=== DASHBOARD_DEBUG: TRANSFER ATTEMPT DETAILS ===");
    console.log("DASHBOARD_DEBUG: Selected recipient:", selectedRecipient ? selectedRecipient.username : 'null');
    console.log("DASHBOARD_DEBUG: Transfer amount (string):", transferAmount);
    console.log("DASHBOARD_DEBUG: Current balance:", balance);
    console.log("DASHBOARD_DEBUG: Token:", token ? 'Present' : 'Missing');
    
    if (!token) {
      console.error("DASHBOARD_DEBUG: handleTransfer - Aborting, no token available.");
      setErrorMessage("Authentication token missing. Please log in again.");
      return;
    }

    if (!selectedRecipient) {
      console.error("DASHBOARD_DEBUG: No recipient selected. Returning early.");
      setErrorMessage("Please select a recipient from the search results.");
      return;
    }

    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      console.error("DASHBOARD_DEBUG: Invalid amount (NaN or <= 0). Returning early.");
      setErrorMessage("Please enter a valid amount greater than zero.");
      return;
    }

    if (amount > balance) {
      console.error("DASHBOARD_DEBUG: Insufficient funds. Returning early.");
      setErrorMessage("Insufficient funds. Your balance is too low.");
      return;
    }

    setIsLoading(true); // Start loading state
    try {
      console.log("DASHBOARD_DEBUG: Making transfer request to:", `${BACKEND_URL}/account/transfer`);
      console.log("DASHBOARD_DEBUG: Request body being sent:", JSON.stringify({
        to: selectedRecipient._id,
        amount: amount,
      }));
      
      const response = await fetch(`${BACKEND_URL}/account/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: selectedRecipient._id,
          amount: amount,
        }),
      });

      console.log("DASHBOARD_DEBUG: Transfer Response status:", response.status);
      const data = await response.json();
      console.log("DASHBOARD_DEBUG: Transfer Response data:", data);
      
      if (response.ok) {
        setSuccessMessage('Send money successful!');
        setErrorMessage(''); // Clear any previous error
        setTransferAmount('');
        setSelectedRecipient(null);
        setSearchQuery('');
        setSearchResults([]);
        fetchBalance(); // Refresh balance
      } else {
        setSuccessMessage(''); // Clear any previous success
        setErrorMessage(data.message || `Transfer failed with status ${response.status}. Please try again.`);
        console.error("DASHBOARD_DEBUG: Transfer failed on backend:", data.message || "Something went wrong");
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Network error. Please check your connection.');
      console.error("DASHBOARD_DEBUG: Network error during transfer fetch:", error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  // Determine if the button should be disabled
  const isTransferButtonDisabled = !selectedRecipient || !transferAmount || isLoading || parseFloat(transferAmount) <= 0 || parseFloat(transferAmount) > balance || !token;
  console.log("DASHBOARD_DEBUG: isTransferButtonDisabled:", isTransferButtonDisabled);
  console.log("DASHBOARD_DEBUG:   - !selectedRecipient:", !selectedRecipient);
  console.log("DASHBOARD_DEBUG:   - !transferAmount:", !transferAmount);
  console.log("DASHBOARD_DEBUG:   - isLoading:", isLoading);
  console.log("DASHBOARD_DEBUG:   - parseFloat(transferAmount) <= 0:", parseFloat(transferAmount) <= 0);
  console.log("DASHBOARD_DEBUG:   - parseFloat(transferAmount) > balance:", parseFloat(transferAmount) > balance);
  console.log("DASHBOARD_DEBUG:   - !token:", !token);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4 animate-scale-in">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-xl text-gray-300 mb-2">Manage your virtual money and make transfers</p>
          <div className="flex justify-center items-center space-x-2 text-green-400">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span className="text-sm">Auth Token: Active</span>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
          {/* Balance Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white shadow-2xl border-0 hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 animate-scale-in">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-xl">
                  <span className="flex items-center">
                    <Wallet className="h-6 w-6 mr-2" />
                    Your Balance
                  </span>
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  ${balance.toFixed(2)}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white/80 text-sm">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Virtual Currency
                  </div>
                  <div className="flex items-center text-green-300 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Active
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-500/20 rounded-xl backdrop-blur-sm">
                      <ArrowDownLeft className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Available</p>
                      <p className="font-bold text-white text-lg">${balance.toFixed(2)}</p>
                    </div>
                  </div>
                  <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border border-pink-300/20 hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Send className="h-4 w-4 text-pink-400" />
                    <span className="text-sm text-gray-300">Ready to Send</span>
                  </div>
                  <p className="text-pink-300 font-semibold">Transfer Money Instantly</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Transfer Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 animate-scale-in">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="flex items-center text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <Send className="h-7 w-7 mr-3 text-purple-400" />
                  Send Money
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* User Search */}
                <div className="space-y-3">
                  <Label htmlFor="search" className="text-gray-200 font-medium">Search Recipients</Label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-purple-400 hover:bg-white/15 transition-all duration-300 rounded-xl text-lg"
                    />
                    {isSearching && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-400 border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl max-h-48 overflow-y-auto animate-fade-in">
                      {searchResults.map((searchUser, index) => (
                        <div
                          key={searchUser._id}
                          onClick={() => {
                            setSelectedRecipient(searchUser);
                            setSearchQuery(searchUser.username);
                            setSearchResults([]);
                          }}
                          className="p-4 hover:bg-white/20 cursor-pointer border-b border-white/10 last:border-b-0 flex items-center space-x-4 transition-all duration-200 hover:scale-[1.02]"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <Users className="h-6 w-6 text-purple-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-white text-lg">{searchUser.username}</p>
                            <p className="text-sm text-gray-300">Click to select recipient</p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-purple-400 opacity-60" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Recipient */}
                {selectedRecipient && (
                  <div className="p-5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-300/30 backdrop-blur-sm animate-scale-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-300 text-sm">Sending to:</p>
                          <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {selectedRecipient.username}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedRecipient(null);
                          setSearchQuery('');
                        }}
                        className="text-gray-300 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}

                {/* Transfer Form */}
                <form onSubmit={handleTransfer} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="amount" className="text-gray-200 font-medium">Amount</Label>
                    <div className="relative group">
                      <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 group-focus-within:text-green-400 transition-colors" />
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0.01"
                        max={balance}
                        placeholder="0.00"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-green-400 hover:bg-white/15 transition-all duration-300 rounded-xl text-xl font-semibold"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-300 flex items-center justify-between">
                      <span>Available balance: ${balance.toFixed(2)}</span>
                      <span className="text-green-400 font-medium">Ready to transfer</span>
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white border-0 rounded-xl shadow-2xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    disabled={!selectedRecipient || !transferAmount || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                        <span>Processing Transfer...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Send className="h-6 w-6" />
                        <span>Send ${transferAmount || '0.00'}</span>
                        <Sparkles className="h-5 w-5 animate-pulse" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
