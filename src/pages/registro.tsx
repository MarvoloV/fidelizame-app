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

  return (
    <div>
      <Layout title="Home Page">

        <p>
          <span>Formulario de registro</span>
        </p>

        <Link href={"/cajero"} className="text-title">
          Conectar Wallet
        </Link>

      </Layout>
      <footer></footer>
    </div>
  );
}
