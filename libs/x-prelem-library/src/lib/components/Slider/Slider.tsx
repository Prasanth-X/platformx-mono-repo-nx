// import "./Slider.css";
import React, { useState, useEffect } from "react";
import { useCustomStyle } from "./Slider.style";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

type SliderProps = {
  speed?: number;
  children?: any[];
  autoplay?: boolean;
  infinite?: boolean;
  arrows?: boolean;
  dots?: boolean;
  dotSize?: string;
  dotPosition?: string;
  sliderName?: string;
  thumbImg?: any;
  showThumb?: boolean;
  initialIndex?: number;
};
const Slider = (props: SliderProps) => {
  const {
    children = [],
    autoplay = false,
    infinite = true,
    speed = 5000,
    arrows = true,
    dots = true,
    dotSize = "15px",
    dotPosition = "inside", // inside, outside
    sliderName = "", //add unique class name
    thumbImg = [], //thumb image array if need to show thumb
    showThumb = false, //to showThumb it should be true and thumbImg should have Img of array
    initialIndex = 0, //Active slide of slider
  } = props;
  const [slide, setSlide] = useState(initialIndex > 0 ? initialIndex : 0);
  const delay = autoplay ? speed : 900000000;
  const classes = useCustomStyle();
  // const width = window.innerWidth;
  // let dotSize = (width - width * 0.2) / (children.length - 1);
  // if (dotSize > 30) {
  //   dotSize = 10;
  // }

  const goForward = () => {
    setSlide(slide + 1);
    if (slide === children.length - 1) {
      if (infinite) {
        setSlide(0);
      } else {
        setSlide(children.length - 1);
      }
    }
  };

  const goBack = () => {
    setSlide(slide - 1);
    if (slide === 0) {
      setSlide(children.length - 1);
    }
  };

  const dotNext = (numb: number) => {
    setSlide(numb);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goForward();
    }, delay);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div
        className={`${classes.sliderPrelemWrapper} ${sliderName} prelem prelemType2 slideshow-container`}>
        <>
          {children.map((slider, i) => {
            return (
              <div key={i} className={slide === i ? "fade" : "mySlides"}>
                {slider}
              </div>
            );
          })}
        </>

        {dots ? (
          <div style={{ textAlign: "center" }} className={`${dotPosition} dots`}>
            {children.length > 1
              ? children.map((_, i) => (
                  <div
                    key={i}
                    style={{ width: dotSize, height: dotSize }}
                    onClick={() => dotNext(i)}
                    className={slide === i ? "active dot" : "dot"}></div>
                ))
              : null}
          </div>
        ) : null}

        {arrows ? (
          <>
            <button type='button' className='prev' onClick={goBack}>
              <KeyboardArrowLeftIcon />
            </button>
            <button type='button' className='next' onClick={goForward}>
              <KeyboardArrowRightIcon />
            </button>
          </>
        ) : null}
        <>
          {showThumb && (
            <div className='thumbnails'>
              <div className='thumbCenter'>
                {thumbImg.map((slider: any, i: number) => {
                  return (
                    <div
                      className={slide === i ? "active thumb" : "thumb"}
                      key={i}
                      onClick={() => dotNext(i)}>
                      <img src={slider} alt={`thumb-${i}`} className='thumbImage' />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default Slider;
