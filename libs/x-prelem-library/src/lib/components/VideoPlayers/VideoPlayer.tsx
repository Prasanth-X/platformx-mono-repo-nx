import ReactPlayer from "react-player";
import { PlayIcon } from "@platformx/utilities";

const VideoPlayer = ({ playerProp }: VideoPlayerProp) => {
  const {
    muted = true,
    playing = true,
    height = "100%",
    width = "100%",
    volume = 1,
    controls = true,
    classname = "reactPlayer",
    posterImg = "",
    videoUrl = "",
  } = playerProp;
  return (
    <ReactPlayer
      className={classname}
      light={posterImg}
      url={videoUrl}
      height={height}
      width={width}
      volume={volume}
      config={{
        youtube: { playerVars: { disablekb: 1 } },
        file: { attributes: { controlsList: "nodownload" } },
      }}
      muted={muted}
      playing={playing}
      controls={controls}
      loop={playerProp.loop}
      playsinline={true}
      playIcon={
        <img alt='play' height='44px' width='44px' className='smallPlayIcon' src={PlayIcon} />
      }
      css={{
        objectFit: "cover",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};
interface VideoPlayerProp {
  playerProp: {
    videoUrl: string;
    posterImg: string;
    width?: string;
    height?: string;
    controls?: boolean;
    loop?: boolean;
    playsinline?: boolean;
    classname?: string;
    playing?: boolean;
    muted?: boolean;
    volume?: number;
  };
}

export default VideoPlayer;
