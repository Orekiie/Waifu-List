export default function Loader() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-black flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-violet-200 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-white text-xl font-semibold">
        Getting Waifus...
      </h2>
      <p className="w-1/3 text-center text-white">
        Please Wait As This May Take A While
      </p>
    </div>
  );
}
