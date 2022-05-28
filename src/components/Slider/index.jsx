import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./slider.module.css";
import { useEffect, useState } from "react";

function Slider(props) {
  if (!props["id"]) {
    throw new Error("Id prop is required for Slider");
  }
  const { count } = props;
  const [showArrow, setShowArrow] = useState(false);
  const [cardWidth, setCardWidth] = useState(300);

  const checkIfIconRequired = () => {
    let sliderContentWidth = document.getElementById(
      `sliderContent${props["id"]}`
    ).clientWidth;
    let sliderCardWidth = document.getElementById(`sliderContent${props["id"]}`)
      ?.firstChild?.clientWidth;
    setCardWidth(sliderCardWidth);
    if (sliderCardWidth * count > sliderContentWidth) {
      setShowArrow(true);
    }
  };

  useEffect(() => {
    checkIfIconRequired();
  }, [count]);

  const onLeftClick = () => {
    let sliderElement = document.getElementById(`sliderContent${props["id"]}`);
    sliderElement.scrollLeft = sliderElement.scrollLeft - cardWidth;
  };
  const onRightClick = () => {
    let sliderElement = document.getElementById(`sliderContent${props["id"]}`);
    sliderElement.scrollLeft = sliderElement.scrollLeft + cardWidth;
  };
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slideLeft}>
        {showArrow ? <ChevronLeftIcon onClick={onLeftClick} size={40} /> : null}
      </div>
      <div id={`sliderContent${props["id"]}`} className={styles.sliderContent}>
        {props.children}
      </div>
      <div className={styles.slideRight}>
        {showArrow ? (
          <ChevronRightIcon onClick={onRightClick} size={40} />
        ) : null}
      </div>
    </div>
  );
}

export default Slider;
