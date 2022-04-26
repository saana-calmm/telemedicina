import VideoChat from "@app/VideoChat";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;

  return (
    <div>
      <Head>
        <title>TELEMEDICINA SAAANA</title>
        <meta
          name="description"
          content="En este espacio podrás asistir a tu cita de telemedicinas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <VideoChat id={id as string} />
      </main>
    </div>
  );
};

export default Home;
