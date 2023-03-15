import { useTheme } from "next-themes";
import { HiSun, HiMoon } from "react-icons/hi";

export default function NavBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-0 z-50 w-full bg-violet-600">
      <div className="flex transform-gpu flex-col items-center border-b border-b-transparent transition-all">
        <div className="container mx-auto flex w-full max-w-[80rem] flex-row py-4 px-6 text-2xl font-bold text-white lg:px-16 xl:px-20">
          <a href="/">Waifulist</a>
          <div className="ml-auto">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center rounded-full bg-white py-1.5 px-3.5 text-sm font-medium text-violet-600 text-2xl"
            >
              {theme === "dark" ? (
                <HiSun className="w-5 h-5" />
              ) : (
                <HiMoon className="w-5 h-5" />
              )}
              <span className="ml-2 text-xs">Change Theme</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
