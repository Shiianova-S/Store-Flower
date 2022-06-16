import React, {memo} from "react";
import "./Slider.css";
import { useState } from "react";

import Slide1 from './../../img/Slide1.webp'; 
import Slide2 from "./../../img/Slide2.webp";
import Slide3 from "./../../img/Slide3.webp";
import Slide4 from "./../../img/Slide4.webp";
import { useEffect } from "react";


function Slider() {
  const [currentSlideId, setSlideStateID] = useState(0)

  const images = [Slide1, Slide2, Slide3, Slide4];

  useEffect(()=> {
    let timeoutId = setTimeout(() => {
      if(currentSlideId < 3) {
        setSlideStateID((prev) => prev + 1)
      } else {
        setSlideStateID(0)
      }
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }

  }, [currentSlideId])

  return (
    <>
      <div className="container-slider">
      {images.map((image, id) => <div onClick={() => setSlideStateID(id)} key={id} className={`${(currentSlideId === id ) ? "active" : ''} slide`} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}></div>)}
      </div>
    </>
  );
}

export default memo(Slider);

