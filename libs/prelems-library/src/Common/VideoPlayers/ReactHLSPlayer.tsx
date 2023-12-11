import ReactHlsPlayer from "react-hls-player";
import React from "react";

const ReactHLSPlayer = ({ playerRef, streamingUrl }: any) => {
  return (
    <ReactHlsPlayer
      playerRef={playerRef}
      src={streamingUrl}
      autoPlay={false}
      controls={true}
      disablePictureInPicture
      controlsList='nodownload'
      width='100%'
      height='100%'
    />
  );
};

export default ReactHLSPlayer;
