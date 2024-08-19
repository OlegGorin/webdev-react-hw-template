import Navigation from "@/components/navigation/Navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./layout.module.css";
import { Search } from "@/components/centerblock/search/Search";
import CN from "classnames";
import Playbar from "@/components/playbar/Playbar";

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          <div className={CN(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            {children}
          </div>
          <Sidebar />
        </main>
        <Playbar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
