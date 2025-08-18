import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../Card';
import {
  Sparkles, Wallet, Search, Send, Users, DollarSign,
  TrendingUp, Zap, ArrowUpRight, ArrowDownLeft, CheckCircle, XCircle,QrCode
} from 'lucide-react';
import { toast } from 'sonner';
import { BACKEND_URL } from '../../assets/backurl';
import { useSearchParams } from 'react-router-dom';

export const SendMoney = () => {
  const [balance, setBalance] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const qrParam = searchParams.get("qr"); // query parameter remember
  // 🔑 Pull user & token from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const resolveQr = async () => {
      if (!qrParam || !token) return;

      try {
        const response = await fetch(`${BACKEND_URL}/qr/resolve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ qrData: 
            JSON.stringify({ qrCodeId: qrParam }) }),
        });

        const data = await response.json();
        if (response.ok) {
          setSelectedRecipient(data);
          setSearchQuery(data.username); // pre-fill search box
        } else {
          setErrorMessage(data.message || "Invalid QR code");
        }
      } catch {
        setErrorMessage("Network error while resolving QR");
      }
    };

    resolveQr();
  }, [qrParam, token]);
  // ✅ Fetch balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${BACKEND_URL}/account/balance`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) setBalance(data.balance);
        else setErrorMessage(data.message || 'Failed to fetch balance');
      } catch {
        setErrorMessage('Network error while fetching balance.');
      }
    };
    fetchBalance();
  }, [token]);

  // ✅ Debounced search
  useEffect(() => {
    if (searchQuery.trim() && token) {
      setIsSearching(true);
      const timer = setTimeout(async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/user/bulk?filter=${encodeURIComponent(searchQuery)}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (response.ok) setSearchResults(data.user || []);
          else setErrorMessage(data.message || 'Search failed');
        } catch {
          setErrorMessage('Network error during search.');
        } finally {
          setIsSearching(false);
        }
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, token]);

  // ✅ Clear alerts after timeout
  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => setSuccessMessage(''), 4000);
      return () => clearTimeout(t);
    }
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(t);
    }
  }, [successMessage, errorMessage]);

  // ✅ Transfer handler
  const handleTransfer = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    if (!selectedRecipient) return setErrorMessage('Please select a recipient.');
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) return setErrorMessage('Enter a valid amount.');
    if (amount > balance) return setErrorMessage('Insufficient balance.');

    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/account/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ to: selectedRecipient._id, amount })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Transfer successful! ")
        setSuccessMessage(`Sent $${amount.toFixed(2)} to ${selectedRecipient.username}!`);
        setTransferAmount('');
        setSelectedRecipient(null);
        setSearchQuery('');
        setSearchResults([]);
        // refresh balance
        const balRes = await fetch(`${BACKEND_URL}/account/balance`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const balData = await balRes.json();
        if (balRes.ok) setBalance(balData.balance);
      } else {
        setErrorMessage(data.message || 'Transfer failed');
        toast.error("Transfer failed!")
      }
    } catch {
      setErrorMessage('Network error. Please try again.');
      toast.error("Network error, please try again ")
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    !selectedRecipient || !transferAmount || isLoading || parseFloat(transferAmount) <= 0 || parseFloat(transferAmount) > balance;

  return (
    <>
    <div className="relative z-10 p-6 min-h-screen ">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome back, {user?.username || "User"}!</h1>
          <p className="text-lg text-slate-600">Manage your money and make secure transfers</p>
        </div>

        {(successMessage || errorMessage) && (
          <div className="fixed top-4 right-4 z-50">
            {successMessage && (
              <div className="flex items-center bg-green-500 text-white p-4 rounded-lg shadow-lg mb-2">
                <CheckCircle className="h-5 w-5 mr-2" />
                <p>{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="flex items-center bg-red-500 text-white p-4 rounded-lg shadow-lg">
                <XCircle className="h-5 w-5 mr-2" />
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div>
            <Card className="bg-white border border-teal-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="bg-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Wallet className="h-6 w-6 mr-2" />
                    Your Balance
                  </span>
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-5xl font-bold mb-4 text-slate-900">${balance.toFixed(2)}</div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center text-slate-600">
                    <DollarSign className="h-4 w-4 mr-1" /> Available
                  </span>
                  <span className="flex items-center text-teal-600">
                    <TrendingUp className="h-4 w-4 mr-1" /> Active
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-white border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-slate-900">
                  <Send className="h-6 w-6 mr-2 text-teal-600" /> Send Money
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div>
                  <label className="text-slate-700 font-medium">
                    Search Recipients</label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search by username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      disabled={!!qrParam} // disable editing if from QR
                      className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin rounded-full h-5 w-5 border-2 border-teal-500 border-t-transparent"></div>
                    )}
                  </div>
                  {searchResults.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-lg mt-2 max-h-40 overflow-y-auto shadow-lg">
                      {searchResults.map((u) => (
                        <div
                          key={u._id}
                          onClick={() => {
                            setSelectedRecipient(u)
                            setSearchQuery(u.username)
                            setSearchResults([])
                          }}
                          className="p-3 hover:bg-slate-50 cursor-pointer flex items-center border-b border-slate-100 last:border-b-0"
                        >
                          <Users className="h-5 w-5 text-teal-500 mr-2" />
                          <div>
                            <p className="text-slate-900 font-medium">{u.username}</p>
                            <p className="text-slate-500 text-sm">
                              {u.firstName} {u.lastName}
                            </p>
                          </div>
                          <ArrowUpRight className="ml-auto h-4 w-4 text-teal-500" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {selectedRecipient && (
                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-slate-700">Sending to</p>
                        <p className="font-bold text-slate-900">{selectedRecipient.username}</p>
                        <p className="text-slate-600 text-sm">
                          {selectedRecipient.firstName} {selectedRecipient.lastName}
                        </p>
                      </div>
                      <button

                        onClick={() => {
                          setSelectedRecipient(null)
                          setSearchQuery("")
                        }}
                        className="text-teal-600 border-teal-300 hover:bg-teal-50"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleTransfer} className="space-y-4">
                  <div>
                    <label className="text-slate-700 font-medium">Amount</label>
                    <div className="relative mt-2">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        max={balance}
                        placeholder="0.00"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Available balance: ${balance.toFixed(2)}</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 h-12 font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      disabled={isDisabled}
                    >
                      {isLoading ? "Processing..." : `Send $${Number.parseFloat(transferAmount || 0).toFixed(2)}`}
                    </button>

                    <button
                      
                      className="h-12 px-6 border-teal-300 text-teal-600 hover:bg-teal-50"
                    >
                      <QrCode className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                
              </CardContent>
            </Card>
          </div>
        </div>
</div>
    </>
    
  );
};

export default SendMoney;
