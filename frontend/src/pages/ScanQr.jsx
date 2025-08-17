

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import QrReader from "react-qr-reader";

// import { Card, CardContent } from "../components/Card";
// import { Upload } from "lucide-react";
// import axios from "axios";
// import { toast } from "sonner";

// export const ScanQr = () =>  {
//   const [scanned, setScanned] = useState(false);
//   const navigate = useNavigate();

//   // ✅ handle live camera scan
//   const handleScan = (data) => {
//     if (data && !scanned) {
//       try {
//         const parsed = JSON.parse(data);
//         if (parsed.qrCodeId) {
//           setScanned(true);
//           toast.success("QR scanned successfully!");
//           navigate(`/sendmoney?qr=${parsed.qrCodeId}`);
//         }
//       } catch (err) {
//         toast.error("Invalid QR code");
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     toast.error("Unable to access camera");
//   };

//   // ✅ handle QR upload
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       try {
//         // call your backend decode API
//         const res = await axios.post("/qr/decode", { imageSource: reader.result });
//         const { qrCodeId } = res.data;
//         if (qrCodeId) {
//           toast.success("QR decoded successfully!");
//           navigate(`/sendmoney?qr=${qrCodeId}`);
//         }
//       } catch (err) {
//         toast.error("Failed to decode QR");
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50">
//       <Card className="w-full max-w-md shadow-lg rounded-2xl">
//         <CardContent className="flex flex-col items-center p-6 space-y-6">
//           <h2 className="text-xl font-semibold">Scan QR to Pay</h2>

//           {/* ✅ Camera scanner */}
//           <div className="w-64 h-64 overflow-hidden rounded-xl border-4 border-blue-500">
//             <QrReader
//               delay={300}
//               onError={handleError}
//               onScan={handleScan}
//               style={{ width: "100%", height: "100%" }}
//             />
//           </div>

//           <p className="text-sm text-gray-500">Align the QR code inside the frame</p>

//           {/* ✅ Upload QR option */}
//           <label className="w-full">
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFileUpload}
//             />
//             <Button
//               variant="outline"
//               className="w-full flex items-center justify-center gap-2"
//             >
//               <Upload size={18} /> Upload QR from Gallery
//             </Button>
//           </label>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export const ScanQr = () => {
    return (
        <div>
            Hello world
        </div>
    )
}