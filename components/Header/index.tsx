import React from "react";
import Logo from "svg/logo";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <Logo />
    </div>
  );
};

export default Header;
