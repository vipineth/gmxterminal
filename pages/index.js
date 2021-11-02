import { useDailyVolume } from "../hooks/useDailyVolume";
import VolumeChart from "components/home/VolumeChart";
import Overview from "components/home/Overview";
import Assets from "components/home/Assets";
import Layout from "components/common/Layout";
import useTotalData from "hooks/useTotalData";

export default function Example() {
  let [dailyVolume, isLoading] = useDailyVolume();
  useTotalData();

  return (
    <Layout>
      <main className="flex-1 relative overflow-y-auto focus:outline-none max-w-7xl px-4 sm:px-6 md:px-8 py-6 mx-auto">
        <Overview />
        <h2 className="text-lg leading-6 font-medium text-gray-900 mt-6">
          Daily Volume
        </h2>
        <div className="py-4">
          <div className="shadow px-4 border rounded-lg h-96 bg-white">
            <VolumeChart dailyVolume={dailyVolume} isLoading={isLoading} />
          </div>
        </div>
        <Assets />
      </main>
    </Layout>
  );
}
