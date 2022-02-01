import Head from "next/head";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className=" bg-[#000000f1]">
      <Head>
        <title>Insta-Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <Header />

      {/* Post section */}
      <div className="flex max-w-6xl relative m-auto">
        <Posts />
        <Sidebar />
      </div>
      {/* Modal section */}
      <Modal />
    </div>
  );
}
