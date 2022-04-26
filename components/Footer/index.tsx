import React from "react";
import EndCall from "svg/endCall";
import MicroCall from "svg/microCall";
import MicroCallMuted from "svg/microCallMuted";
import VideoCall from "svg/videoCall";
import VideoCallMuted from "svg/videoCallMuted";
import styles from "./styles.module.css";

const Footer = ({
  handleLogout,
  handleMuted,
  handleMutedVideo,
  videoMuted,
  audioMuted,
}: {
  handleLogout: () => void;
  handleMutedVideo: () => void;
  handleMuted: () => void;
  videoMuted: boolean;
  audioMuted: boolean;
}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.nav}>
        <button className={styles.button} onClick={() => handleMutedVideo()}>
          {videoMuted ? <VideoCallMuted /> : <VideoCall />}
        </button>
        <button className={styles.button} onClick={() => handleMuted()}>
          {audioMuted ? <MicroCallMuted /> : <MicroCall />}
        </button>
        <button onClick={() => handleLogout()} className={styles.endCall}>
          <EndCall />
        </button>
      </div>
    </footer>
  );
};
export default Footer;
