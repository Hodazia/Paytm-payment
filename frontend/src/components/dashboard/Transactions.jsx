import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../assets/backurl";

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(7); // items per page
  const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });
  const [selectedTxn, setselectedTxn] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTransactions = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/transaction/history?page=${pageNum}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTransactions(res.data.transactions);
      setFilteredTransactions(res.data.transactions);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

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

  // ADD a useffect to fetch /me request


  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Transactions History</h2>
          <p className="text-xl font-semibold text-slate-500">All your transaction history</p>
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
              {filteredTransactions.map((txn,idx) => {
                // const isSender = txn.senderId._id === userId;
                const rowBg = idx % 2 === 0 ? "bg-gray-50" : "bg-white";

                return (
                  <>
                  <tr key={txn._id} 
                  className={`${rowBg} border-b hover:bg-teal-50 cursor-pointer transition`}
                  onClick={()  => setselectedTxn(txn)}>
                  <td className={`px-4 py-3 font-bold text-lg 
                      }`}>
                        ${txn.amount}
                        </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 items-center">
                    <img src={txn.senderId.profileurl} className="object-cover rounded-full w-15 h-15"/>
                      <div className="flex justify-center items-center">
                        {txn.senderId.firstName} {txn.senderId.lastName}
                        </div>
                      
                    </div>
                    
                  </td>
                  <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <img src={txn.receiverId.profileurl} className="object-cover rounded-full w-15 h-15"/>
                      <div className="flex justify-center items-center">
                        {txn.receiverId.firstName} {txn.receiverId.lastName}
                        </div>
                      
                    </div>
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
                
                  </>
                )})
              }
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

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border 
            bg-teal-500
            text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 rounded-lg border bg-teal-500
            text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
      {/* Transaction Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent
         bg-opacity-80">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Transaction Details</h3>
            <p><b>ID:</b> {selectedTxn._id}</p>
            <p><b>Amount:</b> ${selectedTxn.amount}</p>
            <p><b>Status:</b> {selectedTxn.status}</p>
            <p><b>Sender:</b> {selectedTxn.senderId.firstName} {selectedTxn.senderId.lastName}</p>
            <p><b>Receiver:</b> {selectedTxn.receiverId.firstName} {selectedTxn.receiverId.lastName}</p>
            <p><b>Date:</b> {new Date(selectedTxn.createdAt).toLocaleString()}</p>
            <button
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg"
              onClick={() => setselectedTxn(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
