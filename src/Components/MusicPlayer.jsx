import { useState, useRef, useEffect } from "react";
import { Vector } from "../icons/Vector";
import { Backbtn } from "../icons/Backbtn";
import { Play } from "../icons/Play";
import { Next } from "../icons/Next";
import { Volume } from "../icons/Volume";
import { Rectangle6 } from "../icons/Rectangle 6";
import { Rectangle7 } from "../icons/Rectangle 7";
import { HiVolumeOff } from "react-icons/hi";
import { FaCirclePause } from "react-icons/fa6";

export const MusicPlayer = ({
  selectedObj,
  setSelectedObj,
  songIndex,
  setSongIndex,
  selectedfilter,
}) => {
  console.log(selectedObj);

  const [playAudio, setPlayAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef?.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleProgressBarClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = clickX / rect.width;
    audioRef.current.currentTime = progress * audioRef.current.duration;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      audioRef.current.volume = 1;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleSongChange = (newIndex) => {
    setSongIndex(newIndex);
    setSelectedObj(selectedfilter[newIndex]);
    audioRef.current.src = selectedfilter[newIndex].url;

    audioRef.current.addEventListener(
      "loadedmetadata",
      () => {
        audioRef.current.play();
      },
      { once: true }
    );
    setPlayAudio(true);
  };

  const handlePlay = () => {
    if (audioRef.current.readyState >= 3) {
      playAudio ? audioRef.current.pause() : audioRef.current.play();
      setPlayAudio((prev) => !prev);
      console.log("clicked");
    } else {
      audioRef.current.addEventListener(
        "canplaythrough",
        () => {
          playAudio ? audioRef.current.pause() : audioRef.current.play();
          setPlayAudio((prev) => !prev);
          console.log("clicked");
        },
        { once: true }
      );
    }
  };

  const handleBackBtn = () => {
    const newIndex = songIndex > 0 ? songIndex - 1 : selectedfilter.length - 1;
    handleSongChange(newIndex);
  };

  const handleNextBtn = () => {
    const newIndex = (songIndex + 1) % selectedfilter.length;
    handleSongChange(newIndex);
  };

  return (
    <div className="lg:absolute lg:left-[874px] lg:top-[101px] lg:w-[480px] lg:h-[692.24px] ml-[60px]">
      <div className="lg:mb-[32px]">
        <p className="text-white text-[32px] leading-9	font-bold	">
          {selectedObj.name}
        </p>
        <p className="text-white opacity-[60%] font-normal text-[16px] leading-6	">
          {selectedObj.artist}
        </p>
      </div>
      <img
        src={`https://cms.samespace.com/assets/${selectedObj.cover}`}
        alt="Songbgcover"
        className="lg:h-[480px] lg:w-[480px] w-[860px] h-full lg:rounded-lg	 rounded-lg"
      />
      <div
        className="lg:mt-[24px] relative mt-[30px]"
        ref={progressBarRef}
        onClick={handleProgressBarClick}
        style={{ cursor: "pointer" }}
      >
        <div className=" absolute w-[860px] h-[20px] lg:w-[480px] lg:h-[6px] opacity-[20%] rounded-2xl	text-white lg:border border-2 border-white">
          <Rectangle6 />
        </div>
        <div
          className=" absolute w-[200px] h-[20px] lg:w-[200px] lg:h-[6px] rounded-2xl text-white bg-white"
          style={{
            width: `${(currentTime / audioRef.current?.duration) * 100}%`,
          }}
        >
          <Rectangle7 />
        </div>
      </div>
      <div className="lg:flex lg:flex-row flex flex-row lg:max-w-[480px] max-w-[600px] mt-[100px] lg:mt-[50px] lg:h-[50.24px] ">
        {/* flex flex-row */}
        {/* justify-between */}
        {/* gap-[100px] */}
        <div className="rounded-full relative  lg:h-[48px] lg:w-[48px] bg-white/10 ">
          <div className="absolute top-[45%] left-[30%]">
            <Vector />
          </div>
        </div>
        <div className="lg:flex lg:flex-row lg:justify-between lg:mx-[120px] flex flex-row justify-between  ml-[160px] mr-[100px]">
          {/* flex flex-row gap-[80px] */}
          <div
            className="lg:mr-[32px] lg:mt-[15px] mt-[40px] mr-[32px]"
            onClick={() => {
              handleBackBtn();
              setPlayAudio(true);
            }}
          >
            <Backbtn />
          </div>
          <div className="" onClick={handlePlay}>
            {playAudio ? (
              <FaCirclePause className="w-[48px] h-[49px] text-white" />
            ) : (
              <Play />
            )}
          </div>
          <div
            className="lg:ml-[32px] lg:mt-[15px] mt-[40px] ml-[32px]"
            onClick={() => {
              handleNextBtn();
              setPlayAudio(false);
            }}
          >
            <Next className="opacity-[60%]" />
          </div>
        </div>
        <div className="lg:mt-[15px] mt-[40px]" onClick={handleVolumeToggle}>
          {isMuted ? (
            <HiVolumeOff className="w-[20px] h-[16px] text-white" />
          ) : (
            <Volume />
          )}
        </div>
      </div>
      <div>
        <audio
          controls
          src={selectedObj.url}
          ref={audioRef}
          className="hidden"
          // autoPlay={true}
        ></audio>
      </div>
    </div>
  );
};
