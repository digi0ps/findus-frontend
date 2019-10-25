import React, { useEffect, useRef } from "react";

export default function Webcam({ savePicture, closeWebcam }) {
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

  const capturePicture = e => {
    e.preventDefault();

    const canvas = document.createElement("canvas");
    canvas.width = video.current.videoWidth;
    canvas.height = video.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video.current, 0, 0);

    canvas.toBlob(blob => {
      const file = new File([blob], `webcam-${new Date().getTime()}.png`);
      savePicture(file);
    });
  };

  return (
    <div className="Webcam">
      <video width="500" height="0" ref={video}>
        Fetching the video
      </video>
      <div className="Webcam-buttons">
        <button className="Webcam-snap" onClick={capturePicture}>
          Snap
        </button>
        <button className="Webcam-close" onClick={closeWebcam}>
          Close
        </button>
      </div>
    </div>
  );
}
