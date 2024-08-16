"use client";

import { useInitLikedTracks } from "@/hooks/useInitLikedTracks";
import styles from "./SidebarPersonal.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { logout } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";

export const SidebarPersonal = () => {
  useInitLikedTracks();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const onLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{user?.username}</p>
      {user ? (
        <a title={"Выйти из аккаунта"} href="#">
          <div className={styles.sidebarIconAuth} onClick={onLogout}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#logout"></use>
            </svg>
          </div>
        </a>
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
