import generateVideoToken from "core/Mutation/generateVideoToken";
import React, { useState, useCallback, useEffect } from "react";
import Video from "twilio-video";
import Lobby from "../Lobby";
import Room from "../Room";

const VideoChat = ({ id }: { id: string }) => {
  const { generateTokenRoom } = generateVideoToken();
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setConnecting(true);
      const { data } = await generateTokenRoom({
        variables: {
          input: {
            appointment: id,
            isDoctor: false,
          },
        },
      });

      Video.connect(data.createRoomVideoCall.token, {
        name: roomName,
      })
        .then((room) => {
          setConnecting(false);
          setRoom(room);
        })
        .catch((err) => {
          console.error(err);
          setConnecting(false);
        });
    },
    [generateTokenRoom, id, roomName]
  );

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogout={handleLogout} />
    );
  } else {
    render = <Lobby handleSubmit={handleSubmit} connecting={connecting} />;
  }
  return render;
};

export default VideoChat;
