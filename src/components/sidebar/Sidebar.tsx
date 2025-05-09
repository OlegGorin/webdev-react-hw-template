import Image from "next/image";
import styles from "./Sidebar.module.css";
import { SidebarPersonal } from "./sidebarPersonal/SidebarPersonal";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className={styles.mainSidebar}>
      <SidebarPersonal />
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/selection/1">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/selection/2">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="100 dance hits"
                width={250}
                height={150}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/selection/3">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="indi-charge"
                width={250}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
