import { useContext, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../AdminSideBar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserContext from "../../Contexts/UserContext";
import MainNav from "../MainNav";
import MobileSiderbar from "../MobileSidebar";

export default function AdminLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const context = useContext(UserContext);
  const user = context?.user;
  // watch for media query change
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  mediaQuery.addEventListener("change", (e) => setIsMobileView(e.matches))
  useEffect(() => {
    setIsMobileView(mediaQuery.matches)
  }, [])
  if (user?.role != "admin") return null;

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
      <main className="w-full h-screen relative flex">
        <div
          className="dark hidden md:flex h-full"
        >
          <MainNav />
        </div>
        <div
          className="flex max-w-full flex-1 flex-col overflow-hidden rounded-lg bg-white md:m-2"
        >
          <div className="sticky top-0 z-10 flex items-center pl-1 pt-1 bg-white bg-opacity-80 backdrop-blur sm:pl-3 md:hidden">
            <button
              title="Open sidebar"
              onClick={() => setIsSideBarOpen(true)}
              className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AdminSideBar />
            <Outlet />
          </LocalizationProvider>
        </div>
      </main>
      <Toaster />
    </>
  );
}
