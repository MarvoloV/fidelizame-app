import Head from "next/head";
import { useState } from "react";
import { Layout } from "../layouts";
import { useZxing } from "react-zxing";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Cajero() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [result, setResult] = useState("No result");
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <div>
      <Layout title="Home Page">
        <div className="flex flex-col items-center">
          <video ref={ref} className="p-10" />

          <p>
            <span>Last result:</span>
            <span>{result}</span>
          </p>
          <Link
            href={"/cliente/user"}
            className="w-48 flex items-center justify-center border-2 border-primary text-primary font-semibold p-2 rounded-md hover:bg-primary hover:text-white"
          >
            <figure className="pr-2">
              <Image
                src="/images/ion_qr-code-sharp.svg"
                width={18}
                height={18}
                alt="qr icon"
              />
            </figure>
            <p> Simular QR</p>
          </Link>
        </div>
      </Layout>
      <footer></footer>
    </div>
  );
}