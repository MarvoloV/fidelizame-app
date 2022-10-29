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
  const [result, setResult] = useState("No result");
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
        </div>
      </Layout>
      <footer></footer>
    </div>
  );
}
