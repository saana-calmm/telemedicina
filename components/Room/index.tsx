import ParticipantSecondary from "@app/ParticipantSecondary";
import React, { useEffect, useState } from "react";
import Participant from "../Participant";
import styles from "./styles.module.css";

const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  const trackpubsToTracks = (trackMap) => {
    const tracksArr = Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);
    console.log(tracksArr);
    return tracksArr;
  };

  const handleVideoToggle = () => {
    const videoTracks = trackpubsToTracks(room.localParticipant.videoTracks);
    const track = videoTracks[0];
    if (track.isEnabled) {
      track.disable();
      setVideoMuted(true);
    } else {
      track.enable();
      setVideoMuted(false);
    }
  };

  const handleAudioToggle = () => {
    const audioTracks = trackpubsToTracks(room.localParticipant.audioTracks);
    const track = audioTracks[0];
    if (track.isEnabled) {
      track.disable();
      setAudioMuted(true);
    } else {
      track.enable();
      setAudioMuted(false);
    }
  };

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  return (
    <div className={styles.container}>
      <div className={styles.remoteParticipants}>
        {room && (
          <ParticipantSecondary
            audioMuted={audioMuted}
            videoMuted={videoMuted}
            participant={room.localParticipant}
          />
        )}
      </div>

      {participants &&
        participants.length > 0 &&
        participants.map((participant) => {
          return (
            <Participant
              audioMuted={audioMuted}
              videoMuted={videoMuted}
              key={participant.sid}
              handleLogout={handleLogout}
              participant={participant}
              handleMutedVideo={handleVideoToggle}
              handleMuted={handleAudioToggle}
            />
          );
        })}
    </div>
  );
};

export default Room;
