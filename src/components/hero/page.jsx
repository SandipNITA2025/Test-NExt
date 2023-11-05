import React from "react";
import "./style.scss";
import { IoIosCheckmarkCircle } from "react-icons/io";
import image1 from "public/Mask group.png";
import image2 from "public/Mask group2.png";
import image3 from "public/Group 7013.png";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-wrapper container">
        <div className="left">
          <div className="short-banner">
            <div className="facility">
              <IoIosCheckmarkCircle color="#186F65" size={25} />
              <span>Free Register</span>
            </div>
            <div className="facility">
              <IoIosCheckmarkCircle color="#186F65" size={25} />
              <span>Great Service</span>
            </div>
            <div className="facility">
              <IoIosCheckmarkCircle color="#186F65" size={25} />
              <span>Easy payment</span>
            </div>
          </div>

          <div className="light-text">
            Getting the best and latest style has never
          </div>
          <div className="bold-text">been easier!</div>
          <div className="title-text">
            <span>PALETTE</span> is a platform that helps to make fashion
            accessible to all. It brings fashion to your doorstep!
          </div>
          <Link href={'/editingpage'} className="btn">Start Designing</Link>
        </div>
        <div className="right">
          <div className="imgs">
            <Image className="image1" src={image1} alt="image1" />
            <Image className="image2" src={image2} alt="image2" />
            
          </div>
          <div className="carousel">
          <Image className="image3" src={image3} alt="image3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
