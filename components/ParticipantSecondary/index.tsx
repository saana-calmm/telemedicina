import React, { useState, useEffect, useRef } from "react";
import MicroCallMuted from "svg/microCallMuted";
import VideoCallMuted from "svg/videoCallMuted";
import styles from "./styles.module.css";

const ParticipantSecondary = ({ participant, audioMuted, videoMuted }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);

  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className={styles.container}>
      <div className={styles.video}>
        <video ref={videoRef} autoPlay />
        <audio ref={audioRef} autoPlay muted />
        <div className={styles.me}>{"TU"}</div>
        <div className={styles.contentName}>
          <div className={styles.containerController}>
            {audioMuted && (
              <div className={styles.icon}>
                <MicroCallMuted />
              </div>
            )}
            {videoMuted && (
              <div className={styles.icon}>
                <VideoCallMuted />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantSecondary;
