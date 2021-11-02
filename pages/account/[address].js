import Hero from "components/account/Hero";
import Transactions from "components/account/Transactions";
import Layout from "components/common/Layout";
import Overview from "components/account/Overview";
import { useRouter } from "next/router";

function Account(props) {
  let router = useRouter();

  return (
    <Layout shadow={false}>
      <Hero address={router.query?.address} />
      <main className="flex-1 relative overflow-y-auto focus:outline-none max-w-7xl px-4 sm:px-6 md:px-10 py-4 mx-auto">
        <Overview />
        <Transactions />
      </main>
    </Layout>
  );
}

export default Account;
