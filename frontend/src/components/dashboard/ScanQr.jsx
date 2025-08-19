// src/pages/ScanQrPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Card, CardContent } from "../Card";
import { Upload, Camera } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { BACKEND_URL } from "../../assets/backurl";

export const ScanQr = () => {
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();

  // ✅ handle live scan
  const handleScan = (result) => {
    if (result?.text && !scanned) {
      try {
        const parsed = JSON.parse(result.text);
        if (parsed.qrCodeId) {
          setScanned(true);
          toast.success("QR scanned successfully!");
          navigate(`/sendmoney?qr=${parsed.qrCodeId}`);
        } else {
          toast.error("Invalid QR code");
        }
      } catch {
        toast.error("Invalid QR data");
      }
    }
  };

  // ✅ upload QR image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Data = reader.result;
        const res = await axios.post(`${BACKEND_URL}/qr/decode`, {
          imageSource: base64Data,
        });
        if (res.data.qrCodeId) {
          toast.success("QR decoded successfully!");
          navigate(`/dashboard/sendmoney?qr=${res.data.qrCodeId}`);
        } else {
          toast.error("Invalid QR code");
        }
      } catch {
        toast.error("Failed to decode QR");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200">
        <CardContent className="flex flex-col items-center p-8 space-y-8">
          <h2 className="text-2xl p-2 font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Camera className="w-6 h-6 text-indigo-600" /> Scan QR to Pay
          </h2>

          {/* QR Camera Scanner */}
          <div className="w-64 h-64 overflow-hidden rounded-2xl border-4 border-blue-500">
            <Scanner
              onResult={handleScan}
              constraints={{ facingMode: "environment" }} // back camera on mobile
              containerStyle={{ width: "100%", height: "100%" }}
              videoStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <p className="text-sm text-gray-500 text-center">
            Align the QR code inside the frame
          </p>

          {/* Upload QR */}
          <input
            id="qr-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="qr-upload"
            className="w-full flex items-center justify-center gap-2 border rounded-lg
             px-4 py-3 bg-teal-600 text-white font-medium rounded-xl shadow-md 
             hover:bg-teal-700 transition-all cursor-pointer"
          >
            <Upload size={18} /> Upload QR from Gallery
          </label>
        </CardContent>
      </Card>
    </div>
  );
};
