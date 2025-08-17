import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { BACKEND_URL } from "../../assets/backurl";


export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/transaction/history`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        setTransactions(res.data.transactions);
        setFilteredTransactions(res.data.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredTransactions(transactions);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = transactions.filter((txn) => {
        const senderName = `${txn.senderId.firstName} ${txn.senderId.lastName}`.toLowerCase();
        const receiverName = `${txn.receiverId.firstName} ${txn.receiverId.lastName}`.toLowerCase();
        return senderName.includes(lowerQuery) || receiverName.includes(lowerQuery);
      });
      setFilteredTransactions(filtered);
    }
  }, [searchQuery, transactions]);

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Transactions</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by sender or receiver"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Sender</th>
                <th className="px-4 py-3">Receiver</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">${txn.amount}</td>
                  <td className="px-4 py-3">
                    {txn.senderId.firstName} {txn.senderId.lastName}
                  </td>
                  <td className="px-4 py-3">
                    {txn.receiverId.firstName} {txn.receiverId.lastName}
                  </td>
                  <td className="px-4 py-3">
                    {txn.status === "success" ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                        Success
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(txn.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
