'use client';
import Drive from "../artifacts/contracts/Drive.sol/Drive.json";
import { BrowserProvider, Contract } from "ethers";
import { useState } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import DecryptedText from "../animations/Text";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function Home() {
  const files = [
    { name: "whitepaper.pdf", size: 234567, url: "#" },
    { name: "logo.png", size: 45678, url: "#" },
  ];

  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [ownerAddress, setOwnerAddress] = useState<string>("");

  // Only connect when button is clicked
  const handleConnect = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);

      window.ethereum.on("chainChanged", () => window.location.reload());
      window.ethereum.on("accountsChanged", () => window.location.reload());

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
      const contract = new Contract(contractAddress, Drive.abi, signer);
      setContract(contract);
      setProvider(provider);
    } else {
      alert("Metamask not detected");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-0">
      {/* Top right connect button */}
      <div className="fixed top-24 right-8 z-50">
        {account ? (
          <span className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-400 bg-clip-text text-transparent font-semibold text-base sm:text-lg px-4 py-2 rounded-lg shadow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-400 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all hover:brightness-110"
          >
            Connect Wallet
          </button>
        )}
      </div>
      <section className="w-full gap-4 min-h-[80vh] flex flex-col items-center justify-center">
        <DecryptedText
          text="Drive 3.0"
          animateOn="view"
          revealDirection="center"
          speed={120}
          className="bg-gradient-to-r from-white via-purple-500 to-emerald-400 bg-clip-text text-transparent font-extrabold text-5xl sm:text-7xl"
          parentClassName="w-full text-center"
          encryptedClassName="opacity-60"
        />
        <DecryptedText
          text={`Decentralized, Secure,and Effortless File Storage \nfor Web3.Own your data. Share with confidence.`}
          animateOn="view"
          revealDirection="center"
          speed={180}
          className="mt-6 bg-gradient-to-r from-white via-purple-400 to-emerald-400 bg-clip-text text-transparent font-semibold text-2xl sm:text-3xl whitespace-pre-line"
          parentClassName="w-full text-center"
          encryptedClassName="opacity-60"
        />
      </section>
      <div className="w-full max-w-4xl mb-10 mt-24">
        <FileUpload account={account} provider={provider} contract={contract}/>
      </div>
      <div className="w-full max-w-4xl flex flex-col gap-8 items-center mb-4">
        {/* Uploader address input for allowed users */}
        {/* <input
          type="text"
          placeholder="Enter uploader address to view shared files"
          value={ownerAddress}
          onChange={e => setOwnerAddress(e.target.value)}
          className="mb-2 px-3 py-2 rounded border w-full max-w-md"
        /> */}
        <FileList account={account} contract={contract} />
      </div>
    </div>
  );
}
