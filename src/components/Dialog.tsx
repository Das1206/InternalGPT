import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import './Dialog.scss';

interface DialogProps {
    isOpen: boolean;
    closeDialog: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
    style?: React.CSSProperties;
    dialogPanelStyle?: React.CSSProperties;
}
export default function styledDialog(props: DialogProps) {
    const {
        isOpen,
        closeDialog,
        title,
        description,
        children,
        onConfirm,
        confirmText = "Confirm",
        cancelText = "Cancel",
        isDanger = false,
        style,
        dialogPanelStyle
    } = props;
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeDialog} style={style}>
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
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`
                                    dialog__panel flex flex-col w-full transform overflow-hidden md:rounded-xl rounded-tl-xl rounded-tr-xl bg-white text-left align-middle shadow-xl transition-all
                                    ${dialogPanelStyle?.width ? "" : "max-w-md"}    
                                `}
                                style={{ ...dialogPanelStyle, maxHeight: "90vh" }}
                            >
                                {(title || description) &&
                                    <div className="flex justify-between items-center p-6">
                                        <div className="flex flex-col gap-2">
                                            {title &&
                                                <Dialog.Title
                                                    as="h2"
                                                    className="text-xl font-bold leading-6 text-gray-900"
                                                >
                                                    {title}
                                                </Dialog.Title>
                                            }
                                            {
                                                description &&
                                                <Dialog.Description className="text-gray-600 text-base">
                                                    {description}
                                                </Dialog.Description>
                                            }
                                        </div>
                                        {children &&
                                            <button
                                                className="aspect-square p-4 active:scale-95 duration-200 ease-in-out transition-transform focus-ring-0 bg-gray-100 rounded-lg"
                                                onClick={closeDialog}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                            </button>
                                        }
                                    </div>
                                }
                                {
                                    children ?
                                        <div className="flex flex-col overflow-y-auto h-full">
                                            {children}
                                        </div>
                                        :
                                        <div className="p-6 flex items-center gap-2 justify-end">
                                            <button
                                                type="button"
                                                className="button bg-gray-100 text-gray-800"
                                                onClick={closeDialog}
                                                autoFocus
                                            >
                                                {cancelText}
                                            </button>
                                            <button
                                                type="button"
                                                className={`
                                                button
                                                ${isDanger ? "bg-red-100 text-red-800" : "bg-black text-white"}
                                            `}
                                                onClick={() => {
                                                    onConfirm && onConfirm();
                                                    closeDialog();
                                                }}
                                            >
                                                {confirmText}
                                            </button>
                                        </div>
                                }
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}