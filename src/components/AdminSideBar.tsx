import { useNavigate } from "react-router-dom";
import { AdminRoutes } from "../constants";
import { useEffect, useRef } from "react";

const AdminSideBar = () => {
  const adminButtons = [
    {
      route: AdminRoutes.ASSISTANTS,
      label: "Assistants",
    },
    {
      route: AdminRoutes.ASSIGNED_ASSISTANTS,
      label: "Assigned Assistants",
    },
    {
      route: AdminRoutes.USAGE,
      label: "Usage",
    },
    {
      route: AdminRoutes.USERS,
      label: "Users"
    },
    {
      route: AdminRoutes.DEPARTMENTS,
      label: "Departments"
    },
    {
      route: AdminRoutes.MODELS,
      label: "Models",
    },
    {
      route: AdminRoutes.ASSIGNED_MODELS,
      label: "Assigned Models",
    },
  ];
  const navigate = useNavigate();
  const activeButton = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (activeButton.current) {
      (activeButton.current as HTMLButtonElement).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  });
  return (
    <header className="flex flex-col w-full max-w-6xl mx-auto p-4 xl:px-0 lg:mt-8 gap-4">
      <h2 className="font-bold text-4xl w-full">Admin</h2>
      <nav
        className="flex gap-1 justify-start overflow-x-auto w-full flex-shrink-0"
        style={{ scrollbarWidth: "none" }}
      >
        {
          adminButtons.map((button, index) => {
            const isActive = window.location.pathname === button.route;
            return (
              <button
                key={index}
                className={`
                flex ${isActive ? "bg-black text-gray-200" : "bg-gray-100"} 
                cursor-pointer items-center gap-1 px-3 py-2 rounded-lg font-medium
                active:scale-95 transition duration-200  flex-shrink-0
                `}
                onClick={() => {
                  navigate(button.route)
                }}
                ref={isActive ? activeButton : null}
              >
                <div >
                  {button.label}
                </div>
              </button>
            );
          })
        }
      </nav >
    </header>
  );
};

export default AdminSideBar;
