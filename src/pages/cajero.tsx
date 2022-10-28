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
          <div className="flex w-full justify-center mt-20 mb-32">
            <figure className="flex items-center">
              <Image
                src="/images/fidelizame.svg"
                alt="logo"
                width={32}
                height={25}
              />
            </figure>
            <div className="pl-5">
              <p className="font-bold text-xl">CAJERO: ADOLFO LLANOS</p>
              <p className="text-base">ID: 123456</p>
            </div>
          </div>
          {/* 
          <figure className="flex justify-center">
            <Image
              src="/images/Portrait.png"
              width={210}
              height={241}
              alt="user"
            />
          </figure>
          */}
        </div>
        <div className="flex flex-col items-center pb-20">
          <p className="font-bold text-4xl mt-7 mb-12">Busca un cliente</p>
          <p className="text-base px-12 text-center mb-16">
            Escanea el QR del cliente para otorgarle puntos e informarle de sus
            recomenpensas
          </p>

          <figure className="flex justify-center mb-12">
            <Image
              src="/images/hand-holding-phone.svg"
              width={145}
              height={200}
              alt="user"
            />
          </figure>

          <Link href={"/qr"} className="flex items-center border-2 border-primary text-primary font-semibold p-2 rounded-md hover:bg-primary hover:text-white">          
            <figure className="pr-2">
              <Image
                src="/images/ion_qr-code-sharp.svg"
                width={18}
                height={18}
                alt="qr icon"
              />
            </figure>
            Escanear Cliente
          </Link>
        </div>

        {/* <video ref={ref} />
        <p>
          <span>Last result:</span>
          <span>{result}</span>
        </p> */}
      </Layout>
      <footer></footer>
    </div>
  );
}
