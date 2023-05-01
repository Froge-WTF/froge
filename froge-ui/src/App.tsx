import { useRef } from "react";
import frogeLogo from "/logo.png";
import {
  AiFillTwitterCircle,
  AiFillMediumCircle,
  AiFillGithub,
} from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";

function App() {
  const footerRef = useRef<HTMLDivElement>(null);
  return (
    <main className="flex flex-col items-center min-h-screen">
      <header className="flex flex-row justify-center w-full py-6 bg-primary px-4">
        <div className="flex flex-row justify-between items-center container">
          <div className="flex flex-row items-center">
            <div className="relative rounded-full w-20 h-20 overflow-hidden border-2 border-white">
              <div className="top-0 -left-[5%] w-20 h-20 absolute">
                <img
                  src={frogeLogo}
                  className="w-[calc(1152px/14)] h-[calc(1024px/14)]"
                />
              </div>
            </div>
            <div className="text-white text-4xl pl-6">Froge</div>
          </div>
          <nav className="text-xl flex flex-row gap-x-6">
            <button
              className="text-black bg-white p-2 rounded-xl hover:text-white hover:bg-black"
              aria-label="Scroll to socials"
              onClick={() =>
                footerRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Socials
            </button>
          </nav>
        </div>
      </header>
      <div className="flex flex-col justify-center gap-x-6 w-full flex-grow items-center px-12 py-8">
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
        <div className="flex flex-row justify-center gap-x-4 pt-4 text-center text-xl font-sans">
          Froge the God is here. Do you need it? Probably not. But you want it
          because you know you love this shit! You like Dog and Frog shitcoins,
          well here&apos;s the God of them all!
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
      <section className="mario-bg w-full min-h-36 py-12 flex flex-col items-center">
        <h2 className="text-center text-black text-6xl pb-6">Highlights</h2>
        <div className="grid grid-flow-row container grid-cols-2 font-sans font-bold px-4 gap-x-4 gap-y-6">
          <ul className="highlight">No Pre-sale</ul>
          <ul className="highlight">No Tax</ul>
          <ul className="highlight">No Team Tokens</ul>
          <ul className="highlight">Burned Liquidity</ul>
          <ul className="highlight">Renounced Token</ul>
          <ul className="highlight col-span-2 md:col-span-1">
            90% of tokens added to Liquidity
          </ul>
          <ul className="highlight col-span-2 md:col-span-1">
            12.5% of the supply already bought and burned
          </ul>
          <ul className="highlight col-span-2 md:col-span-1">
            Audit (in progress, link will be posted here when final)
          </ul>
          <ul className="highlight col-span-2 md:col-span-1">
            Road map includes creating more safety for investors and projects,
            building with other like-minded projects, and much more
          </ul>
        </div>
      </section>
      <footer
        className="flex flex-col items-center bg-primary w-full py-6"
        ref={footerRef}
      >
        <nav className="flex flex-row justify-center gap-x-4">
          <a
            className="rounded-full overflow-hidden hover:text-blue-500 hover:bg-white"
            href="https://t.me/FrogeEth"
            target="_blank"
            rel="noopenner"
          >
            <BsTelegram className="text-4xl " />
          </a>
          <a
            className="rounded-full overflow-hidden hover:text-blue-500 hover:bg-white"
            href="https://twitter.com/frogethegod?s=20"
            target="_blank"
            rel="noopenner"
          >
            <AiFillTwitterCircle className="text-4xl " />
          </a>
          <a
            className="rounded-full overflow-hidden hover:text-black hover:bg-white"
            href="https://medium.com/@frogethegod"
            target="_blank"
            rel="noopenner"
          >
            <AiFillMediumCircle className="text-4xl " />
          </a>
          <a
            className="rounded-full overflow-hidden hover:text-black hover:bg-white"
            href="https://github.com/Froge-WTF/froge"
            target="_blank"
            rel="noopenner"
          >
            <AiFillGithub className="text-4xl " />
          </a>
        </nav>
        <p className="font-sans pt-5 text-sm">Copyright Froge The God 2023©️</p>
      </footer>
    </main>
  );
}

export default App;
