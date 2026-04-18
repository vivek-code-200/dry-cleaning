"use client";

import { useState } from "react";
import SidebarContent from "./SidebarContent";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden text-xl font-black  top-5 left-1 p-1 text-black"
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 h-screen bg-black/60 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed  top-0 left-0 h-screen w-72 bg-[#020617] z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onNavigate={() => setOpen(false)} />
      </div>
    </>
  );
}