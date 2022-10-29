/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Layout } from "../../layouts";

import { useSelector } from "react-redux";

const User: NextPage = () => {
  const [tabActive, setTabActive] = useState("grant");
  const [cantidad] = useState(120);
  const [tabActiveClient, settabActiveClient] = useState("exchange");
  const { blockchain, data } = useSelector((state) => state);
  const [isLoading, setisLoading] = useState(false);
  const [successTransaction, setSuccessTransaction] = useState(false);

  //-----------------------------------Boton Tx----------------------------------------

  //Boton TRANSFERENCIA
  const handleButtonTx = async () => {
    setSuccessTransaction(false);
    setisLoading(true);
    const accountUser = blockchain.accountUser;

    const TxTokes = await blockchain.smartContract.transferTokens(
      accountUser,
      cantidad
    );
    console.log(
      "🚀 ~ file: user.tsx ~ line 29 ~ handleButtonTx ~ TxTokes",
      TxTokes
    );
    setisLoading(false);
    setSuccessTransaction(true);
    // await TxTokes;

    // dispatch(fetchData());
  };

  return (
    <Layout title="Home Page">
      <div className="flex flex-col items-center ">
        <div className="flex w-full justify-center mt-5 mb-5">
          <div>
            <p className="font-bold text-xl">CAJERO: ADOLFO LLANOS</p>
            <p className="text-xs text-center">
              ID: {blockchain.accountCajero}
            </p>
          </div>
        </div>
        <button className="flex items-center border-2 border-primary text-primary font-semibold p-2 rounded-md hover:bg-primary hover:text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
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
        <div className="w-full flex justify-center pt-5 mt-5">
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
          <div>
            <div className="flex flex-col items-center pt-11 pb-6 rounded-lg mt-10 mb-20 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              <figure>
                <Image
                  src="/images/Bronze-CertCard.png"
                  width={80}
                  height={80}
                  alt="medalla"
                />
              </figure>
              <h2 className="text-2xl font-bold">Gustavo Medrano</h2>
              <p className="text-sm font-normal">
                ID: {blockchain.accountUser}
              </p>
              <p className="text-gold rounded-xl bg-gold/10 px-4 py-2 mt-3 font-semibold ">
                Cliente Oro
              </p>
              <p className="font-bold text-base mt-4">Fecha de alta</p>
              <p className="font-normal text-sm">10 Mayo 2022</p>
              <div className="h-px w-72 bg-black/10 mt-10 mb-10" />
              <p className="font-bold text-xl">
                Puntos Disponibles a distribuir
              </p>
              <div className="flex  items-center ">
                <figure>
                  <Image
                    src="/images/Medals-gold.svg"
                    width={70}
                    height={70}
                    alt="point"
                  />
                </figure>
                <p className="font-semibold text-lg">
                  {parseInt(Number(data.tokensCajero)) / 100} Pts
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center pt-11 rounded-lg mt-10 mb-20 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
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
                  <button
                    className={`flex items-center ${
                      !isLoading
                        ? " bg-primary text-white"
                        : "bg-gray-400 text-black"
                    } font-semibold px-1 rounded-md h-10 mt-1`}
                    disabled={isLoading}
                    onClick={handleButtonTx}
                  >
                    Otorgar Puntos
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {tabActive === "reward" && (
          <>
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
            </div>
            <div className="w-full flex justify-center pt-5">
              <div
                className={`px-2 text-md font-medium ${
                  tabActiveClient === "exchange" ? "text-primary" : ""
                }`}
                onClick={() => settabActiveClient("exchange")}
              >
                CANJEAR PUNTOS
              </div>
              <div
                className={`px-2 text-md font-medium ${
                  tabActiveClient === "promotion" ? "text-primary" : ""
                }`}
                onClick={() => settabActiveClient("promotion")}
              >
                PROMOCIONES
              </div>
            </div>
            {tabActiveClient === "exchange" && (
              <div className="flex flex-col items-center font-bold text-lg mt-10">
                <p className="px-14 text-center">
                  Canjeo de la compra del cliente en puntos
                </p>
                <div className="h-px w-72 bg-black/10 mt-10" />
                <ul className="w-80">
                  <li className="flex  justify-between">
                    <div className="flex">
                      <figure>
                        <Image
                          src={"/images/Medals-gold.svg"}
                          width={60}
                          height={60}
                          alt="icon point"
                        />
                      </figure>
                      <div>
                        <p className="font-semibold">Aceite primor</p>
                        <p className="font-normal text-xs">S/12.00</p>
                      </div>
                    </div>
                    <p>12 ptos</p>
                  </li>
                  <li className="flex justify-between">
                    <div className="flex">
                      <figure>
                        <Image
                          src={"/images/Medals-gold.svg"}
                          width={60}
                          height={60}
                          alt="icon point"
                        />
                      </figure>
                      <div>
                        <p className="font-semibold">Paneton Donofrio</p>
                        <p className="font-normal text-xs">S/36.00</p>
                      </div>
                    </div>
                    <p>36 ptos</p>
                  </li>
                  <li className="flex justify-between">
                    <div className="flex">
                      <figure>
                        <Image
                          src={"/images/Medals-gold.svg"}
                          width={60}
                          height={60}
                          alt="icon point"
                        />
                      </figure>
                      <div>
                        <p className="font-semibold">Mancuerna</p>
                        <p className="font-normal text-xs">S/56.00</p>
                      </div>
                    </div>
                    <p>56 ptos</p>
                  </li>
                </ul>

                <div className="flex justify-between w-10/12 bg-black/10 px-4 py-4  rounded-3xl">
                  <div>
                    <p className="font-semibold text-normal">Canjealo por</p>
                    <p className="font-normal text-sm text-black/60">
                      Corresponde a s/104.00
                    </p>
                  </div>
                  <p className="font-semibold text-normal">104 Ptos</p>
                </div>
                <button className="flex items-center bg-primary text-white font-semibold px-7 py-3 rounded-md my-10">
                  Canjear puntos
                </button>
                <div className="flex flex-col items-center">
                  <figure>
                    <Image
                      src="/images/sending-message.svg"
                      width={150}
                      height={126}
                      alt="icon loading"
                    />
                  </figure>
                  <p className="text-base font-semibold text-center">
                    !Enhorabuena!
                  </p>
                  <p className="px-10 pt-3 pb-10 text-center font-normal">
                    Fueron gastados <b>120 puntos</b> de la billetera de Gustavo
                  </p>
                </div>
              </div>
            )}
            {tabActiveClient === "promotion" && (
              <div className="flex flex-col items-center font-bold text-lg mt-10">
                <p className="px-14 text-center text-2xl">
                  Promociones vigentes
                </p>
                <p className="font-normal text-center px-16 mt-5 mb-10">
                  <b>Gustavo</b> por ser cliente Oro, llévate este pack
                  canjeandolo con <b>500 Ptos</b>
                </p>
                {/* <div>
                  <Image />
                </div> */}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default User;
