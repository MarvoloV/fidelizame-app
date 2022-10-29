import { useState } from "react";
import { Layout } from "../layouts";
import { useZxing } from "react-zxing";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../redux/blockchain/blockchainActions";
import { useRouter } from "next/router";

export default function Cajero() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [result, setResult] = useState("Escaneando el código QR del cliente...");
  const [isViewScan, setisViewScan] = useState(true);
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
      setisViewScan(false);
      dispatch(saveUser(result.getText()));
      router.push("/cliente/user");
    },
  });
  const { blockchain } = useSelector((state) => state);
  console.log("🚀 ~ file: qr.tsx ~ line 23 ~ Cajero ~ blockchain", blockchain);

  return (
    <div className="bg-primary min-h-screen">
      <Layout title="Home Page">
        <div className="flex flex-col items-center bg-primary">
          <p className="pt-12 text-lg font-bold text-blue-800">
            <span>{result}</span>
          </p>
          {isViewScan && <video ref={ref} className="p-10" />}
        </div>
      </Layout>
    </div>
  );
}
