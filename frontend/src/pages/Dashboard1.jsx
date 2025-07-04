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

  useEffect(() => {
    if (!token) {
      console.error('No token found! User is not authenticated.');
      return;
    }
    fetchBalance();
  }, [token]);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchBalance = async () => {
    console.log('Token used for /account/balance:', token);
    if (!token) {
      alert('You are not authenticated. Please sign in again.');
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
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const searchUsers = async () => {
    setIsSearching(true);
    try {
      const response = await fetch(`${BACKEND_URL}/user/bulk?filter=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('User search response:', data);
      if (response.ok) {
        setSearchResults(data.user || []);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!selectedRecipient || !transferAmount) {
      console.error("Missing information");
      return;
    }

    const amount = parseFloat(transferAmount);
    if (amount <= 0) {
      console.error("Invalid amount");
      return;
    }

    if (amount > balance) {
      console.error("Insufficient funds");
      return;
    }

    setIsLoading(true);
    try {
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

      const data = await response.json();
      if (response.ok) {
        console.log("Transfer successful!");
        setTransferAmount('');
        setSelectedRecipient(null);
        setSearchQuery('');
        setSearchResults([]);
        fetchBalance(); // Refresh balance
      } else {
        console.error("Transfer failed", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Network error. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#16161a] via-[#232946] to-[#7f5af0] dark:from-[#16161a] dark:via-[#232946] dark:to-[#7f5af0] transition-colors duration-700">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text drop-shadow-lg mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-xl text-gray-300">Manage your virtual money and make transfers</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Balance Card */}
          <div className="lg:col-span-1">
            <Card className="gradient-bg text-white shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Balance</span>
                  <Wallet className="h-6 w-6" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">
                  ${balance.toFixed(2)}
                </div>
                <div className="flex items-center text-white/80 text-sm">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Virtual Currency
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="mt-6 space-y-4">
              <Card className="rounded-2xl">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Available</p>
                      <p className="font-semibold">${balance.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Transfer Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gradient-text drop-shadow-md">
                  <Send className="h-6 w-6 mr-2 text-primary" />
                  Send Money
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* User Search */}
                <div className="space-y-2">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-200 mb-1">Search Recipients</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="search"
                      type="text"
                      placeholder="Search by username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 w-full rounded-full border border-gray-300 bg-white/80 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm"
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="border rounded-lg max-h-48 overflow-y-auto bg-white/90 shadow-lg mt-2">
                      {searchResults.map((searchUser) => (
                        <div
                          key={searchUser._id}
                          onClick={() => {
                            setSelectedRecipient(searchUser);
                            setSearchQuery(searchUser.username);
                            setSearchResults([]);
                          }}
                          className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 flex items-center space-x-3 transition-colors"
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{searchUser.username}</p>
                            <p className="text-sm text-gray-600">Click to select</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Recipient */}
                {selectedRecipient && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Sending to:</p>
                          <p className="text-lg font-semibold text-blue-700">
                            {selectedRecipient.username}
                          </p>
                        </div>
                      </div>
                      <Button
                        className="rounded-full px-4 py-1 text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
                        onClick={() => {
                          setSelectedRecipient(null);
                          setSearchQuery('');
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </div>
                )}

                {/* Transfer Form */}
                <form onSubmit={handleTransfer} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-200 mb-1">Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0.01"
                        max={balance}
                        placeholder="0.00"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="pl-10 h-12 w-full rounded-full border border-gray-300 bg-white/80 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-sm text-lg"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-300">
                      Available balance: ${balance.toFixed(2)}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg gradient-bg button-pop shadow-xl rounded-full"
                    disabled={!selectedRecipient || !transferAmount || isLoading}
                  >
                    {isLoading ? (
                      'Processing Transfer...'
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send ${transferAmount || '0.00'}
                      </>
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

export default Dashboard1;