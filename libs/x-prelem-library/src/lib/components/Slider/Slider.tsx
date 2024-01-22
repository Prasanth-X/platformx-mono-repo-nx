// import "./Slider.css";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useCustomStyle } from "./Slider.style";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

type SliderProps = {
  speed?: number;
  children?: any[];
  autoplay?: boolean;
  infinite?: boolean;
  arrows?: boolean;
  arrowPosition?: string;
  dots?: boolean;
  dotSize?: string;
  bulletType?: string;
  dotPosition?: string;
  sliderName?: string;
  thumbImg?: any;
  showThumb?: boolean;
  initialIndex?: number;
  animationType?: string;
  animationSpeed?: number;
  cardGap?: number;
};
const Slider = (props: SliderProps) => {
  const {
    children = [],
    autoplay = false,
    infinite = true,
    speed = 5000,
    arrows = true,
    arrowPosition = "inside", // inside, outside,
    dots = true,
    dotSize = "15px",
    bulletType = "dots", //dots, lines
    dotPosition = "inside", // inside, outside, left, right
    sliderName = "", //add unique class name
    thumbImg = [], //thumb image array if need to show thumb
    showThumb = false, //to showThumb it should be true and thumbImg should have Img of array
    initialIndex = 0, //Active slide of slider
    animationType = "fadeIn", //fadeIn, slideIn
    cardGap = 8,
  } = props;
  const [slide, setSlide] = useState(initialIndex > 0 ? initialIndex : 0);
  const delay = autoplay ? speed : 900000000;
  const classes = useCustomStyle();

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
  const setStyleanimation = () => {
    if (animationType === "slideIn") {
      return {
        transform: `translateX(calc(-${slide * 100}% - ${cardGap * slide}px))`,
        display: "flex",
        transition: `transform 0.5s ease-in-out`,
        gap: `${cardGap}px`,
      };
    } else {
      return {};
    }
  };
  const setClassName = (index: number) => {
    if (slide === index) {
      if (animationType === "slideIn") {
        return "mySlides";
      } else {
        return "fade";
      }
    } else {
      return "mySlides";
    }
  };

  return (
    <div
      className={`${classes.sliderPrelemWrapper} ${sliderName} ${animationType} prelem prelemType2 slideshow-container`}>
      <Box
        style={{
          ...setStyleanimation(),
        }}>
        {children.map((slider, i) => {
          return (
            <Box
              key={i}
              className={setClassName(i)}
              sx={{ gap: animationType === "slideIn" ? `${cardGap}px` : 0 }}>
              {slider}
            </Box>
          );
        })}
      </Box>

      {dots ? (
        <div style={{ textAlign: "center" }} className={`indicator ${dotPosition} ${bulletType}`}>
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
          <button type='button' className={`${arrowPosition} prev`} onClick={goBack}>
            <KeyboardArrowLeftIcon />
          </button>
          <button type='button' className={`${arrowPosition} next`} onClick={goForward}>
            <KeyboardArrowRightIcon />
          </button>
        </>
      ) : null}
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
    </div>
  );
};

export default Slider;
