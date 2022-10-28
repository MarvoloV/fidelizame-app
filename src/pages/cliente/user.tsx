// @ts-ignore
import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Layout } from "../../layouts";

import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/data/dataActions";



const User: NextPage = () => {
  const [tabActive, setTabActive] = useState("grant");
  const [cantidad, setCantidad] = useState(120);

  const dispatch = useDispatch();
  const { blockchain, data } = useSelector((state) => state);
  console.log({ blockchain, data });

  //-----------------------------------Boton Tx----------------------------------------

  //Boton TRANSFERENCIA
  const handleButtonTx = async () => {
    const accountCajero = await blockchain.accountCajero;
    const accountUser = await blockchain.accountUser;
    
    // console.log(blockchain.web3.utils)
    const TxTokes = await blockchain.smartContract.methods
      .transfer(accountUser, cantidad)
      .send({ from: accountCajero });
    await TxTokes;

    dispatch(fetchData());
    setCantidad("");
  };

  return (
    <Layout title="Home Page">
      <div className="flex flex-col items-center ">
        <div className="flex w-full justify-center mt-5 mb-5">
          <div>
            <p className="font-bold text-xl">CAJERO: ADOLFO LLANOS</p>
            <p className="text-xs text-center">ID: {blockchain.accountCajero}</p>
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
            <p className="text-sm font-normal">ID: {blockchain.accountUser}</p> 
            <p className="text-gold rounded-xl bg-gold/10 px-4 py-2 mt-3 font-semibold ">
              Cliente Oro
            </p>
            <p className="font-bold text-base mt-4">Fecha de alta</p>
            <p className="font-normal text-sm">10 Mayo 2022</p>
            <div className="h-px w-72 bg-black/10 mt-10 mb-10" />
            <p className="font-bold text-xl">Puntos Disponibles a Distruir</p>
            <div className="flex  items-center ">
              <figure>
                <Image
                  src="/images/Medals-gold.svg"
                  width={70}
                  height={70}
                  alt="point"
                />
              </figure>
              <p className="font-semibold text-lg">{data.tokensCajero} Pts</p>
              <div className="flex items-center">
                {/* <p className="font-normal text-sm text-black/50">
                  Hasta 23/10/2022
                </p> */}
              </div>
            </div>
            {/* <p className="font-bold text-xl mt-5">Puntos utilizados</p>
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
            </div> */}
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
                  className="flex items-center bg-primary text-white font-semibold px-1 rounded-md h-10 mt-1"
                  disabled={false}
                  onClick={handleButtonTx}
                >
                  Otorgar Puntos
                </button>
              </div>
            </div>
            <div className="m-5">
              <RotatingLines
                strokeColor="Teal"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
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
              <p className="px-10 pt-3 pb-10 text-center">
                Fueron otorgados <b>120 puntos</b> a la billetera de Gustavo
              </p>
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
              <div className="h-px w-72 bg-black/10 mt-10 mb-10" />
            </div>
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default User;
