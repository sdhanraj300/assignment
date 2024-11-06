"use client";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </>
    );
}

export default ToastProvider;
