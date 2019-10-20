import React, { useState, useEffect, useRef } from "react";

export default function Webcam({ closeWebcam }) {
  const video = useRef(null);

  useEffect(() => {
    const cons = {
      video: {
        width: 500,
        height: 500,
      },
    };

    let videoStream = null;

    navigator.getUserMedia(
      cons,
      stream => {
        console.log(stream);
        videoStream = stream;
        video.current.srcObject = stream;
        video.current.height = 500;
        video.current.play();
      },
      err => {
        console.log(err);
      },
    );

    return () => {
      // Kill web camfeed
      videoStream.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="Webcam">
      <video width="500" height="0" ref={video}>
        Fetching the video
      </video>
      <div className="Webcam-buttons">
        <button className="Webcam-snap">Snap</button>
        <button className="Webcam-close" onClick={closeWebcam}>
          Close
        </button>
      </div>
    </div>
  );
}
