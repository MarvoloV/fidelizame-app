/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore
import { useState } from "react";
import { Layout } from "../layouts";
import { useZxing } from "react-zxing";

import { useDispatch } from "react-redux";
import { saveUser } from "../redux/blockchain/blockchainActions";
import { useRouter } from "next/router";

export default function Cajero() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [result, setResult] = useState("Escaneando QR...");
  const [isViewScan, setisViewScan] = useState(true);
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
      setisViewScan(false);
      const splitEtherium = result.getText().split(":");
      const accountUser = splitEtherium[1].split("@");
      dispatch(saveUser(accountUser[0]));
      router.push("/cliente/user");
    },
  });

  return (
    <div>
      <Layout title="Home Page">
        <div className="flex flex-col items-center">
          {isViewScan && <video ref={ref} className="p-10" />}
<<<<<<< HEAD
=======

          <p>
            <span></span>
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
>>>>>>> 1c4b3caea47759e9d5f39aa47c6595a17cf13491
        </div>
      </Layout>
      <footer></footer>
    </div>
  );
}
