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
        <div className="flex flex-row justify-center gap-x-4 py-12 md:py-0 text-center md:text-left text-xl">
          It's so early, we're still building our landing page
        </div>
        <div>Contract Address</div>
        <nav className="flex flex-row item-center justify-center gap-x-3">
          <div>Telegram</div>
          <div>Twitter</div>
        </nav>
      </div>
      {/* <section className="flex flex-col justify-center items-center bg-black w-full flex-1"></section> */}
    </>
  );
}

export default App;
