import Sidebar from "./Sidebar";
import MainNav from "./MainNav";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MobileSiderbar = (props: any) => {
  const { isSideBarOpen, closeSideBar } = props;
  const pathname = window.location.pathname;
  return (
    <>
      <Transition appear show={isSideBarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeSideBar}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur" />
          </Transition.Child>

          <div className="flex justify-center items-center fixed inset-0 overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-4"
            >
              <Dialog.Panel
                className={` flex max-w-md h-full mr-auto transform md:rounded-xl rounded-tl-xl rounded-tr-xl bg-white text-left align-middle shadow-xl transition-all `}
              >
                <MainNav />
                {!pathname.includes("admin") &&
                  <Sidebar closeSideBar={closeSideBar} />
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
};

export default MobileSiderbar;
