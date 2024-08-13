import Navigation from "@/components/navigation/Navigation";
import Playerbar from "@/components/playerbar/Playerbar";
import Sidebar from "@/components/sidebar/Sidebar";
import styles from "./layout.module.css";
import { Search } from "@/components/centerblock/search/Search";
import CN from "classnames";

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
        <Playerbar />
        <footer className={styles.footer}></footer>
      </div>
    </div>
  );
}
