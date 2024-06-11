"use client";
import "@/styles/globals.css"
import { useState } from "react";
import Loader from "@/components/admin/Loader.jsx";
export const dynamic = 'force-dynamic'
export default function RootLayout({children}) {
  const [loading, setLoading] = useState(true);
  const time = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  time();
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? <Loader /> : children}
    </div>
  );
}
