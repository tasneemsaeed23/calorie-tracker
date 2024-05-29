import { Link } from "react-router-dom";
import styles from "./SideNav.module.css";

function SideNav() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>Calorie Tracker</h1>
      <Link to="/">Home</Link>
      <Link to="/track">Track</Link>
    </nav>
  );
}

export default SideNav;
