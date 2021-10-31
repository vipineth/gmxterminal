import { useState } from "react";

import { useDailyVolume } from "../hooks/useDailyVolume";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import VolumeChart from "components/home/VolumeChart";
import Overview from "components/home/Overview";
import Assets from "components/home/Assets";
import Layout from "components/common/layout";

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let [dailyVolume, isLoading] = useDailyVolume();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <Layout>
              <Overview />
              <h2 className="text-lg leading-6 font-medium text-gray-900 mt-6">
                Daily Volume
              </h2>
              <div className="py-4">
                <div className="shadow px-4 border rounded-lg h-96 bg-white">
                  <VolumeChart
                    dailyVolume={dailyVolume}
                    isLoading={isLoading}
                  />
                </div>
              </div>
              <Assets />
            </Layout>
          </div>
        </main>
      </div>
    </div>
  );
}
