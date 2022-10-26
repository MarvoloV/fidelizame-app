import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Layout } from "../layouts";

export const ChangePoints: NextPage = () => {
  return (
    <Layout title="Canjear Puntos">
      <div>
        <Link href={"/otorgar-puntos"} className="text-title">
          Otorgar Puntos
        </Link>
        <Link href={"/canjear-puntos"}>Canjear Puntos</Link>
      </div>
    </Layout>
  );
};
export default ChangePoints;
