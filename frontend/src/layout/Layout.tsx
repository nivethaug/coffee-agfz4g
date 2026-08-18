import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#16100c] text-stone-200">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <footer className="border-t border-amber-900/30 bg-[#120d09] py-6 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} NOIR ROAST ATELIER — Specialty coffee, roasted to order in Copenhagen.
      </footer>
    </div>
  );
};

export default Layout;
