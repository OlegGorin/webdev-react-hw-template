"use client";

import Image from "next/image";
import styles from "./Navigation.module.css";
import CN from "classnames";
import { useState } from "react";

export default function Navigation() {

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <nav className={CN(styles.mainNav, styles.nav)}>
      <div className={CN(styles.navLogo, styles.logo)}>
        <Image
          className={styles.logoImage}
          src="/img/logo.png"
          alt="logo"
          width={113}
          height={17}
        />
      </div>
      <div
        className={CN(styles.navBurger, styles.burger)}
        onClick={() => setMenuIsOpen((prevState) => !prevState)}
      >
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      {menuIsOpen && (
        <div className={CN(styles.navMenu, styles.menu)}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Главное
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Мой плейлист
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="../signin.html" className={styles.menuLink}>
                Войти
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
