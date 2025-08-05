import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import DecryptedText from "../animations/Text";

export default function Home() {
  // Placeholder data for demonstration
  const files = [
    { name: "whitepaper.pdf", size: 234567, url: "#" },
    { name: "logo.png", size: 45678, url: "#" },
    // Add more files as needed
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-0">
      {/* Fullscreen Hero Section with DecryptedText animation */}
      <section className="w-full  gap-4 min-h-[80vh] flex flex-col items-center justify-center">
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
      {/* Components Below */}
      <div className="w-full max-w-4xl mb-10 mt-24">
        <FileUpload />
      </div>
      <div className="w-full max-w-4xl flex flex-col gap-8 items-center">
        <FileList files={files} />
      </div>
    </div>
  );
}
