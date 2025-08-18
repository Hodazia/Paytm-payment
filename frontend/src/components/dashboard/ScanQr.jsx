

// src/pages/ScanQrPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  { QrReader } from "react-qr-reader";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../Card";
import { Upload } from "lucide-react";
import axios from "axios"
import { toast } from "sonner";
import { BACKEND_URL } from "../../assets/backurl"

export const ScanQr = () => {
  const [scanned, setScanned] = useState(false);
  const navigate = useNavigate();

  // ✅ handle live scan
  const handleScan = (data) => {
    if (data && !scanned) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.qrCodeId) {
          setScanned(true);
          toast.success("QR scanned successfully!");
          navigate(`/sendmoney?qr=${parsed.qrCodeId}`);
        }
      } catch {
        toast.error("Invalid QR code");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    toast.error("Camera not accessible");
  };

  // ✅ upload QR image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {

       // remove base64 prefix if backend requires only raw base64
      const base64Data = reader.result;

        const res = await axios.post(`${BACKEND_URL}/qr/decode`,
             { imageSource: base64Data });
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
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="flex flex-col items-center p-6 space-y-6">
          <h2 className="text-xl font-semibold">Scan QR to Pay</h2>

          {/* QR Camera Scanner */}
          <div className="w-64 h-64 overflow-hidden rounded-xl border-4 border-blue-500">
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <p className="text-sm text-gray-500">Align the QR code inside the frame</p>

          {/* Upload QR */}
          {/* ✅ Upload QR */}
          <input
            id="qr-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="qr-upload"
            className="w-full flex items-center justify-center gap-2 border rounded-lg p-2 cursor-pointer"
          >
            <Upload size={18} /> Upload QR from Gallery
          </label>
        </CardContent>
      </Card>
    </div>
  );
}
