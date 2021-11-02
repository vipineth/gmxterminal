import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children, shadow }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative h-screen flex overflow-hidden bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 overflow-auto focus:outline-none">
        <Header />
        <div className="mb-8">{children}</div>
      </div>
    </div>
  );
}
