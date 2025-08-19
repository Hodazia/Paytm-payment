// src/pages/ScanQrPage.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Card, CardContent } from "../Card";
import { Upload, Camera } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { BACKEND_URL } from "../../assets/backurl";

export const ScanQr = () => {
  const [locked, setLocked] = useState(false);     // prevent multiple navigations
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Accept both JSON and plain text
  const extractQrCodeId = (value) => {
    if (!value) return null;
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === "object" && parsed.qrCodeId) {
        return parsed.qrCodeId;
      }
    } catch {
      /* not JSON – fall through */
    }
    // if it’s a plain string, treat it as the id
    return typeof value === "string" && value.trim() ? value.trim() : null;
  };

  const handleDecoded = (text) => {
    if (locked) return;
    console.log("what is the text ", text);
    
    const qrCodeId = extractQrCodeId(text);
    console.log("Decoded qr code is ", qrCodeId );
    if (!qrCodeId) {
      // allow another attempt
      return;
    }
    setLocked(true);
    toast.success("QR scanned successfully!");
    // ⬇️ pick the route your app actually uses
    navigate(`/dashboard/sendmoney?qr=${encodeURIComponent(qrCodeId)}`);
  };

  // Optional: show camera errors (permission, https, etc.)
  const handleCameraError = (err) => {
    console.error(err);
    toast.error(err?.message || "Camera error");
  };

  // Gallery upload → backend decode (keep this if you want server-side decode)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result; // data:image/...;base64,xxxx
        const { data } = await axios.post(
          `${BACKEND_URL}/qr/decode`,
          { imageSource: base64 },
          { maxBodyLength: Infinity } // axios side
        );

        const qrCodeId = data?.qrCodeId || null;
        if (!qrCodeId) {
          toast.error("Invalid QR image");
          return;
        }
        toast.success("QR decoded successfully!");
        navigate(`/dashboard/sendmoney?qr=${encodeURIComponent(qrCodeId)}`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to decode QR image");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200">
        <CardContent className="flex flex-col items-center p-8 space-y-8">
          <h2 className="text-2xl p-2 font-bold text-gray-800 tracking-tight flex items-center gap-2">
            <Camera className="w-6 h-6 text-indigo-600" />
            Scan QR to Pay
          </h2>

          {/* Live Scanner */}
          <div className="w-64 h-64 overflow-hidden rounded-2xl border-4 border-blue-500">
            <Scanner
              onDecode={handleDecoded}              // ✅ correct prop
              onError={handleCameraError}
              constraints={{ facingMode: "environment" }}
              components={{                       // hide default finder if desired
                finder: true,
                torch: true,                       // adds a torch toggle when supported
                zoom: true,
              }}
              scanDelay={150}                       // throttle decodes
              containerStyle={{ width: "100%", height: "100%" }}
              videoStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <p className="text-sm text-gray-500 text-center">
            Align the QR code inside the frame
          </p>

          {/* Upload from Gallery */}
          <input
            ref={inputRef}
            id="qr-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="qr-upload"
            className="w-full flex items-center justify-center gap-2
                       px-4 py-3 bg-teal-600 text-white font-medium rounded-xl
                       shadow-md hover:bg-teal-700 transition-all cursor-pointer"
          >
            <Upload size={18} /> Upload QR from Gallery
          </label>
        </CardContent>
      </Card>
    </div>
  );
};
