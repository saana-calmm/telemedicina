import VideoChat from "@app/VideoChat";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  useEffect(() => {
    window.location.replace("https://www.saana.com.co/");
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <VideoChat id={id as string} />
      </main>
    </div>
  );
};

export default Home;
