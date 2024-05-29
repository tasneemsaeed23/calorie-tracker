import { Outlet } from "react-router-dom";
import SideNav from "./../components/Common/SideNav";
import styles from "./PageLayout.module.css";
export function PageLayout() {
  return (
    <div className={styles.layout}>
      <SideNav />
      <div className={styles["content-wrapper"]}>
        <Outlet />
      </div>
    </div>
  );
}
