import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 
"../Card"


import { User, Mail, Phone, MapPin, Calendar, Shield, CreditCard, Bell } from "lucide-react"
import { useState,useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../assets/backurl"


import QRCode from "react-qr-code"


function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  )
}


export function ProfileSection() {
  const [profile, setProfile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [firstName,setfirstName] = useState('');
  const [lastName,setlastName] = useState('');
  const [userName,setuserName] = useState('');
  const [profileurl,setprofileurl] = useState('');
  const [loading, setLoading] = useState(true);




  /*
  now fetch the  data from the api and get  the results and store it,

  
  */
   // Check if user is authenticated
   const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // In a real app, you'd navigate here, e.g., navigate('/');
      console.log('No token found, user not authenticated.');
      return false;
    }
    return true;
  };

  useEffect(() => {


    const fetchProfile = async () => {
      if(!checkAuth()) {
        return;
      }

      try {
        const options = {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
        const res = await axios.get(`${BACKEND_URL}/user/me`,options)
        setProfile(res.data)
        setfirstName(res.data.firstName);
        setlastName(res.data.lastName);
        setuserName(res.data.userName);
        setprofileurl(res.data.profileurl);

      } catch (err) {
        console.error("Error fetching profile:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(
      `${BACKEND_URL}/user/`,
      {
        firstName:firstName,
        lastName:lastName,
        userName:userName
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );

    // setProfile(prev => ({ ...prev, {
    //   firstName:firstName,
    //   lastName:lastName,
    //   userName:userName
    // } })); // update UI instantly
    setProfile((prev) => ({ ...prev, firstName, lastName, userName }));
    setIsModalOpen(false); // close modal
    } catch (error) {
      console.error("Profile update failed:", error)
    }
  }

  if (loading) {
    return <p className="text-slate-600">Loading profile...</p>
  }

  return (

    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile Settings</h1>
        <p className="text-slate-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="bg-white border-slate-200 shadow-sm lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {profile?.profileurl ? (
                <img
                  src={profile.profileurl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-slate-200">
                  <User className="w-10 h-10 text-slate-500" />
                </div>
              )}
            </div>
            <CardTitle className="text-slate-900">
              {profile?.firstName} {profile?.lastName}
            </CardTitle>
            <div className="flex items-center justify-center mt-2 text-teal-700 text-sm font-medium">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-slate-700">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{profile.username || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm">Balance ${Math.round(profile?.balance?.toFixed(2),2)}</span> {/* Placeholder, no phone in backend yet */}
            </div>
            {/* QR Code */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Your QR Code</h3>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                profile.qrData
              )}&size=150x150`}
              alt="QR Code"
              className="mx-auto mt-2 border-4 border-white rounded-xl"
            />
          </div>

          {/* Update Profile Button */}
          <div className="mt-6 text-center">
            <button
              className="px-6 py-2 bg-teal-700 text-white text-white rounded-full font-semibold hover:scale-105 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Update Profile
            </button>
          </div>
          </CardContent>
        </Card>

        {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 border rounded"
            value={firstName}
            onChange={e => setfirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border rounded"
            value={lastName}
            onChange={e => setlastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Username (Email)"
            className="w-full p-2 border rounded"
            value={userName}
            onChange={e => setuserName(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
        </div>
      </Modal>
      </div>
    </div>

  )
}