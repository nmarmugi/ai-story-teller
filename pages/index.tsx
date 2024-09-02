import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/Organisms/Header/Header";
import WindowBox from "@/components/Organisms/WindowBox/WindowBox";

export default function Home() {
  return (
    <>
      <Head>
        <title>ai Story Teller</title>
        <meta name="description" content="Story generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header title="ai Story Teller"/>
        <WindowBox title="Story Params" />
      </main>
    </>
  );
}
