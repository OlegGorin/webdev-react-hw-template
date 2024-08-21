"use client";

import Image from "next/image";
import styles from "./Navigation.module.css";
import Link from "next/link";
import CN from "classnames";
import { useState } from "react";
import { useAppSelector } from "@/store/store";

export default function Navigation() {
  const { user } = useAppSelector((state) => state.user);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [isFavoriteUrl, setIsFavoriteUrl] = useState(false);

  const handleFavOn = () => {
    setIsFavoriteUrl(true);
  }

  const handleFavOff = () => {
    setIsFavoriteUrl(false);
  }

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
            <li className={styles.menuItem} onClick={handleFavOff}>
              <Link href="/tracks" className={styles.menuLink}>
                Главное
              </Link>
            </li>
            {(user && !isFavoriteUrl) ? (
              <li className={styles.menuItem} onClick={handleFavOn}>
                <Link href="/tracks/favorite" className={styles.menuLink}>
                  Мой плейлист
                </Link>
              </li>
            ) : (
              <li className={styles.menuItem}>
                <div className={styles.menuLinkGray}>
                  Мой плейлист
                </div>
              </li>
            )
            }
            <li className={styles.menuItem}>
              {!user ? (
                <Link href="/signin" className={styles.menuLink}>
                  Войти
                </Link>
              ) : (
                <div className={styles.menuLinkGray}>
                  Войти
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
