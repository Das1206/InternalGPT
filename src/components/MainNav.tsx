import { useContext, useState } from "react";

import UserContext from "../Contexts/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AdminRoutes, Routes } from "../constants";
import toast from "react-hot-toast";

import './MainNav.scss'
import Dialog from "./Dialog";

export default function MainNav() {
    const context = useContext(UserContext);
    const user = context?.user;
    const router = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const handleLogOut = () => {
        localStorage.clear();
        toast.success("Logged Out Successfully!");
        window.location.href = "/";
    };
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    return (
        <>
            <nav id="main_navbar" className="flex flex-col items-center h-full">
                <div className="flex pt-2 pb-4 pb">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                </div>
                <button
                    title="Open chats"
                    className={`nav-item ${pathname.includes('chats') ? 'nav-item--active' : ''} flex rounded cursor-pointer`}
                    onClick={() => router("/app/" + Routes.CHATS)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                    <span className="nav-item__title">
                        Chats
                    </span>
                </button>
                <div className="divider--horizontal"></div>
                <Link
                    to={Routes.MODELS}
                    className={`nav-item ${pathname.includes('app/models') ? 'nav-item--active' : ''} flex py-3 px-3 items-center gap-3 rounded`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                    <span className="nav-item__title">
                        Models
                    </span>
                </Link>
                <div className="divider--horizontal"></div>
                {user?.role === "admin" && (
                    <Link
                        to={AdminRoutes.ASSISTANTS}
                        title="Open admin page"
                        className={`nav-item ${pathname.includes('admin') ? 'nav-item--active' : ''} flex py-3 px-3 items-center gap-3 rounded`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sliders"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" /></svg>
                        <span className="nav-item__title">
                            Manage
                        </span>
                    </Link>
                )}
                <div className="h-full"></div>
                <button title="User options"
                    className="nav-item flex rounded cursor-pointe"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <span className="nav-item__title">
                        {/* {user?.name || "User"} */}
                        You
                    </span>
                </button>
                <div className="divider--horizontal"></div>
                <button title="Sign Out"
                    onClick={() => setIsLogoutDialogOpen(true)}
                    className="nav-item flex rounded cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    <span className="nav-item__title">
                        Sign Out
                    </span>
                </button>
            </nav>
            <Dialog
                isOpen={isLogoutDialogOpen}
                title="You are about to sign out!"
                description="Confirm to sign out from the application."
                confirmText="Sign Out"
                onConfirm={handleLogOut}
                closeDialog={() => setIsLogoutDialogOpen(false)}
                isDanger={true}
            />
        </>
    )
}