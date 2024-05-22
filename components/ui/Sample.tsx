/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6k4S7xhb9Ve
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import "leaflet/dist/leaflet.css";
import styles from './Sample.module.css'; // Import the CSS module
import axios from "axios";

const Map1 = dynamic(() => import('@/components/ui/Map1'), {
  ssr: false, // Disable server-side rendering
});

export default function Sample() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [nestedMenu, setNestedMenu] = useState("");
  const [status, setStatus] = useState("disconnect");

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };

  const toggleNestedMenu = (menu: any) => {
    setNestedMenu(nestedMenu === menu ? "" : menu);
  };

  const handleConnectButtonClick = async () => {
    try {
      let newStatus = status === 'disconnect' ? 'connect' : 'disconnect';
      let response = await axios.post('https://missionplanner-api.onrender.com/connect', { status});
      setStatus(newStatus);
      console.log('Request sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending request:', error);
    }
};

  return (
    <div className="flex h-screen flex-col">
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-gray-900 px-4 py-3 text-white shadow-md dark:bg-gray-950 z-10">
        <Button className="rounded-full" size="icon" variant="ghost" onClick={toggleSideNav}>
          <PlaneIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
        <Button aria-label="Disconnect" className="rounded-full" size="icon" variant="ghost" onClick={handleConnectButtonClick}>
          {status === 'disconnect' ? <DisconnectIcon className="h-6 w-6" /> : <ConnectIcon className="h-6 w-6" />}
          <span className="sr-only">{status === 'disconnect' ? 'Connect' : 'Disconnect'}</span>
        </Button>
      </header>
      <div className="flex flex-1 pt-16 relative">
        <aside className={`${styles.sidebar} ${sideNavOpen ? styles.sidebarOpen : ""}`}>
          <div className="p-4">
            <Button className="w-full text-left text-white" variant="ghost" onClick={() => toggleNestedMenu("flight")}>
              <PlaneIcon className="mr-2 h-4 w-4" />
              Flight
            </Button>
            {nestedMenu === "flight" && (
              <div className="mt-2 ml-4 space-y-2">
                <Button className="w-full text-left text-white" variant="ghost">
                  <PowerIcon className="mr-2 h-4 w-4" />
                  Arm/Disarm
                </Button>
                <Select>
                  <SelectTrigger className="w-full text-left text-white">
                    <SelectValue placeholder="Flight Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stabilize">Stabilize</SelectItem>
                    <SelectItem value="altitude_hold">Altitude Hold</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button className="w-full text-left text-white mt-4" variant="ghost" onClick={() => toggleNestedMenu("plan")}>
              <MapIcon className="mr-2 h-4 w-4" />
              Plan
            </Button>
            {nestedMenu === "plan" && (
              <div className="mt-2 ml-4 space-y-2">
                <Button className="w-full text-left text-white" variant="ghost">
                  Load
                </Button>
                <Button className="w-full text-left text-white" variant="ghost">
                  Save
                </Button>
                <Button className="w-full text-left text-white" variant="ghost">
                  Write
                </Button>
              </div>
            )}
          </div>
        </aside>
        <main className={`${styles.main} ${sideNavOpen ? styles.mainWithSidebar : ""}`}>
          <Map1 />
        </main>
      </div>
    </div>
  );
}





function MapIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}

function PlaneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function PowerIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </svg>
  );
}

function ConnectIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14l4-4 4 4M16 10v4" />
    </svg>
  );
}

function DisconnectIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
