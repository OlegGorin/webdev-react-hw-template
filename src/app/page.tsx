import Image from "next/image";
import styles from "./page.module.css";
import classNames from "classnames";
import Navigation from "@/components/navigation/Navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import Playerbar from "@/components/playerbar/Playerbar";
import Search from "@/components/centerblock/search/Search";
import Playlist from "@/components/centerblock/playlist/Playlist";

export default function Home() {
  const CN = require("classnames");
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <div className={CN(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            <Playlist />
          </div>
          <Sidebar />
        </main>
        <Playerbar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
