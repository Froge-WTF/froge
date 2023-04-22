import frogeLogo from "/logo.png";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center gap-x-6 w-full flex-grow h-screen items-center px-12 py-4">
        <div>
          <div className="relative rounded-full w-44 h-44 overflow-hidden border-2 border-white">
            <div className="top-0 -left-[5%] w-44 h-44 absolute">
              <img
                src={frogeLogo}
                className="w-[calc(1152px/6)] h-[calc(1024px/6)]"
              />
            </div>
          </div>
          <div className=" text-white text-6xl pt-2 md:pt-0">FROGE</div>
        </div>
        <div className="text-center text-3xl text-red-500">
          ZERO FUCKING TAXES
        </div>
        <div className="flex flex-row justify-center gap-x-4 pt-12 text-center text-xl">
          It's so early, we're still building our landing page, but here's a{" "}
        </div>
        <div className="pb-12">
          <a
            href="https://medium.com/@frogethegod/froge-the-god-pure-meme-perfection-meh-why-not-5b1afca6da8f"
            target="_blank"
            rel="noopener"
            className="text-blue-300 underline hover:text-blue-500 text-2xl "
          >
            MEDIUM article
          </a>
        </div>
        <div>Contract Address</div>
        <a
          href="https://etherscan.io/token/0xa9fd5065a3b57a91bf2e8029406c64d3e27eb49a"
          target="_blank"
          rel="noreferrer"
          className="text-blue-300 underline hover:text-blue-500"
        >
          0xa9fd5065a3b57a91bf2e8029406c64d3e27eb49a
        </a>
        <nav className="flex flex-row item-center justify-center gap-x-3 pt-4">
          <a
            href="https://t.me/FrogeEth"
            rel="noopener"
            target="_blank"
            className="w-[100px] py-2 bg-blue-500 text-center rounded-md hover:bg-blue-700"
          >
            Telegram
          </a>
          <a
            href="https://twitter.com/frogethegod?s=20"
            rel="noopener"
            target="_blank"
            className="w-[100px] py-2 bg-blue-400 text-center rounded-md hover:bg-blue-500"
          >
            Twitter
          </a>
        </nav>
      </div>
      {/* <section className="flex flex-col justify-center items-center bg-black w-full flex-1"></section> */}
    </>
  );
}

export default App;
