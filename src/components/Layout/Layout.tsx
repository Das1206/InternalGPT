import Sidebar from "../Sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import MobileSiderbar from "../MobileSidebar";
import { useState, useEffect } from "react";
import MainNav from "../MainNav";

export default function Layout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  // watch for media query change
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  mediaQuery.addEventListener("change", (e) => setIsMobileView(e.matches))
  useEffect(() => {
    setIsMobileView(mediaQuery.matches)
  }, [])
  return (
    <>
      {isMobileView && (
        <aside>
          {isSideBarOpen && (
            <MobileSiderbar
              isSideBarOpen={isSideBarOpen}
              toggleSideBar={() => setIsSideBarOpen(!isSideBarOpen)}
              closeSideBar={() => setIsSideBarOpen(false)}
            />
          )}
        </aside>
      )}
      <main className=" w-full h-screen relative flex ">
        <aside
          className="dark hidden md:flex"
        >
          <MainNav />
          <Sidebar />
        </aside>
        <div
          className="flex max-w-full flex-1 flex-col bg-white md:my-2 md:mr-2 overflow-hidden md:rounded-tr-lg md:rounded-br-lg"
        >
          <div className="sticky top-0 z-10 flex items-center backdrop-blur bg-opacity-80  sm:pl-3 md:hidden">
            <button
              type="button"
              onClick={() => setIsSideBarOpen(true)}
              className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
            >
              <span className="sr-only">Open sidebar</span>
              <RxHamburgerMenu className="h-6 w-6" />
            </button>
            { }
          </div>
          <Outlet />
        </div>
      </main>
      <Toaster />
    </>
  );
}
