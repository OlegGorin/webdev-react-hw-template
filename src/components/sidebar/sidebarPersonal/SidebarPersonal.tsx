"use client";

import { useInitLikedTracks } from "@/hooks/useInitLikedTracks";
import styles from "./SidebarPersonal.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Link from "next/link";

export const SidebarPersonal = () => {
  useInitLikedTracks();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logout());
    router.push("/");
  }, [dispatch, router]);

  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{user?.username}</p>
      {user ? (
        <Link title={"Выйти из аккаунта"} href="/signin">
          <div className={styles.sidebarIconAuth} onClick={onLogout}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        </Link>
      ) : (
        <div className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      )}
    </div>
  );
};
