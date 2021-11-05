import { useDailyVolume } from "../hooks/useDailyVolume";
import VolumeChart from "components/home/VolumeChart";
import Overview from "components/home/Overview";
import Assets from "components/home/Assets";
import Layout from "components/common/Layout";
import PlatformTokens from "components/home/PlatformTokens";
import VolumeChartFilter from "components/home/VolumeChartFilter";
import { useState } from "react";
import useGMXInfo from "hooks/useGMXInfo.js";

export default function Example() {
  let [activeFilter, setActiveFilter] = useState("daily");
  let [dailyVolume, isLoading] = useDailyVolume(activeFilter);

  return (
    <Layout>
      <main className="flex-1 relative overflow-y-auto focus:outline-none max-w-7xl px-4 sm:px-6 md:px-8 py-6 mx-auto">
        <Overview />
        <h2 className="text-lg leading-6 font-medium text-gray-900 mt-6">
          Daily Volume
        </h2>
        <div className="py-4">
          <div
            className="shadow px-2 pt-6 pb-2 border rounded-lg bg-white"
            style={{ height: "530px" }}
          >
            {dailyVolume ? (
              <>
                <div className="flex w-full flex-wrap justify-end px-4 pt-2 pb-4">
                  <VolumeChartFilter
                    setActiveFilter={setActiveFilter}
                    activeFilter={activeFilter}
                  />
                </div>
                <div style={{ height: "450px" }}>
                  <VolumeChart
                    dailyVolume={dailyVolume}
                    isLoading={isLoading}
                  />
                </div>
              </>
            ) : (
              <div className="flex w-full h-full justify-center items-center">
                <div
                  style={{ borderTopColor: "transparent" }}
                  className="w-16 h-16 border-8 border-indigo-600 border-solid rounded-full animate-spin"
                ></div>
              </div>
            )}
          </div>
        </div>
        <Assets />
        <PlatformTokens />
      </main>
    </Layout>
  );
}
