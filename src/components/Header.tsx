import Image from "next/image";
import React from "react";

export const Header = () => {
  return (
    <header className="flex w-full justify-between px-5 py-3 pr-20 bg-white">
      <div className="flex items-center">
        <Image src="/images/fidelizame.svg" alt="logo" width={32} height={25} />
        <h1 className="pl-4">Fidelizame</h1>
      </div>
      <button className="text-white bg-primary rounded-md p-2">
        Conectar a Wallet
      </button>
    </header>
  );
};
