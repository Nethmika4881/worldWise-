import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./SideBar.module.css";
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default SideBar;

function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} WorldWise. All rights reserved.
    </footer>
  );
}
