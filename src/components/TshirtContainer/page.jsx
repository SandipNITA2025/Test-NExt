"use client"
import { Home } from "@/app/editingpage/page";
import React, { useContext, useRef, useState, useEffect } from "react";
import "./style.scss";

const productImages = {
  tshirt: {
    front: "https://i.postimg.cc/G2c95YgT/product-image_(2).png",
    back: "https://i.postimg.cc/G2c95YgT/product-image_(2).png",
  },
  hoodie: {
    front: "https://i.postimg.cc/G2c95YgT/product-image_(2).png",
    back: "https://i.postimg.cc/G2c95YgT/product-image_(2).png",
  },
  longSleeve: {
    front: "https://i.postimg.cc/G2c95YgT/product-image_(2).png",
    back: "https://i.postimg.cc/G2c95YgT/product-image_(2).png",
  },
};
function TshirtContainer() {
  const {
    saveProductImage,
    tshirtFrontProps,
    tshirtBackProps,
    productType,
    side,
  } = useContext(Home);
  const canvasRef = useRef(null);
  const [productImage, setProductImage] = useState(new Image());

  useEffect(() => {
    const img = new Image();
    img.src = productImages[productType][side];

    img.onload = () => {
      setProductImage(img);
    };
  }, [productType, side]);

  
  const downloadTshirtDesign = () => {
    const container = document.querySelector(".img-container");
    const scale = 4; // Increase the scale factor for higher resolution and sharper quality (adjust as needed)
    const canvasOptions = {
      height: container.offsetHeight * scale,
      width: container.offsetWidth * scale,
      style: {
        transform: `scale(${scale})`, // Apply scale transform
        transformOrigin: "top left",
      },
    };
  
    domtoimage
      .toPng(container, canvasOptions)
      .then((dataUrl) => {
        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = dataUrl;
        downloadLink.download = "tshirt-design.png";
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
  
        // Trigger a click event on the anchor element to start the download
        downloadLink.click();
  
        // Clean up by removing the anchor element
        document.body.removeChild(downloadLink);
      })
      .catch((error) => {
        console.error("Error downloading T-shirt design:", error);
      });
  };
  

  return (
    <div className="tshirtContainer border border-gray-700">
      <div
        className="img-container"
        style={{ backgroundColor: tshirtFrontProps }}
      >
        <img className="tshirt-img w-fit" src={productImage.src} alt="" />
        <div
          className="drawingArea"
          style={{
            position: "absolute",
            top: "95px",
            left: "150px",
            zIndex: 10,
            width: "235px",
            height: "400px",
          }}
        >
          <canvas ref={canvasRef} id="tcanvas" width={400} height={400} />
        </div>
      </div>
      <button onClick={downloadTshirtDesign}>Save T-shirt Design</button>
    </div>
  );
}

export default TshirtContainer;
