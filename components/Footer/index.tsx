import React from "react";
import EndCall from "svg/endCall";
import MicroCall from "svg/microCall";
import VideoCall from "svg/videoCall";
import styles from "./styles.module.css";

const Footer = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.nav}>
        <button className={styles.button}>
          <VideoCall />
        </button>
        <button className={styles.button}>
          <MicroCall />
        </button>
        <button onClick={() => handleLogout()} className={styles.endCall}>
          <EndCall />
        </button>
      </div>
    </footer>
  );
};
export default Footer;
