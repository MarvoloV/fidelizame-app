import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { Layout } from "../../layouts";

const User: NextPage = () => {
  const [tabActive, setTabActive] = useState("grant");
  return (
    <Layout title="Home Page">
      <div className="flex flex-col items-center ">
        <div className="flex w-full justify-center mt-5 mb-5">
          <div>
            <p className="font-bold text-xl">CAJERO: ADOLFO LLANOS</p>
            <p className="text-xs text-center">ID: 123456</p>
          </div>
        </div>
        <button className="flex items-center border-2 border-primary text-primary font-semibold p-2 rounded-md hover:bg-primary hover:text-white">
          <figure className="pr-2">
            <Image
              src="/images/ion_qr-code-sharp.svg"
              width={18}
              height={18}
              alt="qr icon"
            />
          </figure>
          Escanear Cliente
        </button>
        <div className="w-full flex justify-center pt-5">
          <div
            className={`px-2 text-md font-medium ${
              tabActive === "grant" ? "text-primary" : ""
            }`}
            onClick={() => setTabActive("grant")}
          >
            OTORGAR PUNTOS
          </div>
          <div
            className={`px-2 text-md font-medium ${
              tabActive === "reward" ? "text-primary" : ""
            }`}
            onClick={() => setTabActive("reward")}
          >
            RECOMPENSAS CLIENTE
          </div>
        </div>
        {tabActive === "grant" && (
          <div className="flex flex-col items-center pt-11 ">
            <figure>
              <Image
                src="/images/Bronze-CertCard.png"
                width={80}
                height={80}
                alt="medalla"
              />
            </figure>
            <h2 className="text-2xl font-bold">Gustavo Medrano</h2>
            <p className="text-sm font-normal">ID 123-4556</p>
            <p className="text-gold rounded-xl bg-gold/10 px-4 py-2 mt-3 font-semibold ">
              Cliente Oro
            </p>
            <p className="font-bold text-base mt-4">Fecha de alta</p>
            <p className="font-normal text-sm">10 Mayo 2022</p>
            <div className="h-px w-72 bg-black/10 mt-10 mb-10" />
            <p className="font-bold text-xl">Puntos acumulados</p>
            <div className="flex mt-5">
              <figure>
                <Image
                  src="/images/Medals-gold.svg"
                  width={70}
                  height={70}
                  alt="point"
                />
              </figure>
              <div>
                <p className="font-semibold text-lg">1000 Pts</p>
                <p className="font-normal text-sm text-black/50">
                  Hasta 23/10/2022
                </p>
              </div>
            </div>
            <p className="font-bold text-xl mt-5">Puntos utilizados</p>
            <div className="flex mt-5">
              <figure>
                <Image
                  src="/images/Medals-gold.svg"
                  width={70}
                  height={70}
                  alt="point"
                />
              </figure>
              <div>
                <p className="font-semibold text-lg">1 Pts</p>
                <p className="font-normal text-sm text-black/50">
                  el 23/10/2022
                </p>
              </div>
            </div>
            <div>
              <p className="text-center text-xl font-bold">
                Compra de hoy 29/10/22
              </p>
              <div className="flex mt-5 w-96 justify-around">
                <div className="flex">
                  <figure>
                    <Image
                      src="/images/Medals-gold.svg"
                      width={70}
                      height={70}
                      alt="point"
                    />
                  </figure>
                  <div>
                    <p className="font-semibold text-lg">120 Soles</p>
                    <p className="font-normal text-sm text-black/50">
                      120 Puntos
                    </p>
                  </div>
                </div>

                <button className="flex items-center bg-primary text-white font-semibold px-1 rounded-md h-10 mt-1">
                  Otorgar Puntos
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default User;
