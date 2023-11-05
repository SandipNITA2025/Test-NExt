"use client";

import React, {
  useRef,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { fabric } from "fabric";
import "./style.scss";
import { IoIosStar } from "react-icons/io";
import { FaTshirt } from "react-icons/fa";
import { RiText, RiListSettingsFill } from "react-icons/ri";
import { MdFileUpload, MdInsertPhoto } from "react-icons/md";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import icon_tshirt from "/public/icon-tshirt.png";
import icon_hoodie from "/public/icon-hoodie.png";
import Settings from "./../../components/editorComponents/settings/page";
import domtoimage from "dom-to-image";
import Navbar from './../../components/navbar/page';

export const EditingHome = createContext();

const productImage = "https://i.postimg.cc/G2c95YgT/product-image_(2).png";

const tshirtFrontImage = "https://i.postimg.cc/x8WQhJRV/mens-tshirt-front.png";
const tshirtBackImage =
  "https://i.postimg.cc/vBSQGqLf/Black_T_Shirt_-_1280x1257.png";
const hoodieFrontImage = "https://i.postimg.cc/dtnWnkqh/mens-hoodie-front.png";
const hoodieBackImage =
  "https://i.postimg.cc/G3VcNfp1/White_Tshirt_-_1280x1257.png";

const data = [
  {
    id: 1,
    url: "https://i.postimg.cc/XYh9q03Y/design-2.png",
  },
  {
    id: 2,
    url: "https://i.postimg.cc/ydhRLgRD/design-3.png",
  },
  // Add more sticker objects as needed
];

const EditingPage = () => {
  const [canvas, setCanvas] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [clothType, setClothType] = useState("tshirt");
  const [selectedSide, setSelectedSide] = useState("front");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color: black
  const canvasRef = useRef(null);
  const [ObjectSelected, setObjectSelected] = useState(false);
  const [selectedObjectProps, setSelectedObjectProps] = useState({});

  const handleClothTypeChange = (type) => {
    setClothType(type);
  };

  const handleSideChange = (side) => {
    setSelectedSide(side);
  };

  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvas.on("selection:created", (e) => {
      setObjectSelected(true);
      if (
        canvas.getActiveObject() &&
        canvas.getActiveObject().type === "i-text"
      ) {
        setSelectedObjectProps(canvas.getActiveObject().toObject());
      }
    });

    canvas.on("selection:cleared", () => {
      setObjectSelected(false);
      setSelectedObjectProps({}); // Clear selectedObjectProps when selection is cleared
    });
  }, [canvas]);

  const handleAddText = (text) => {
    const addText = new fabric.IText(text, {
      left: 10,
      top: 10,
      fontSize: 25,
    });
    canvas.add(addText);
    canvas.renderAll();
  };

  const handleAddText2 = () => {
    const text = new fabric.IText(textValue, {
      left: 10,
      top: 10,
      fontSize: 25,
    });

    canvas.add(text);
    setTextValue("");
  };

  const textStyles = ({ id, value }) => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== "i-text") {
      return;
    }

    switch (id) {
      case "bold-text":
        activeObject.set(
          "fontWeight",
          activeObject.fontWeight === "normal" ? "bold" : "normal"
        );
        break;
      case "italic-text":
        activeObject.set(
          "fontStyle",
          activeObject.fontStyle === "normal" ? "italic" : "normal"
        );
        break;
      case "underline-text":
        activeObject.set("underline", !activeObject.underline);
        break;
      case "overline-text":
        // Handle overline style here
        break;
      case "color":
        activeObject.set("fill", value);
        break;
      case "fontSize":
        activeObject.set("fontSize", parseInt(value));
        break;
      case "fontFamily":
        activeObject.set("fontFamily", value);
        break;
      default:
      // Handle other styles if needed
    }

    canvas.renderAll();
  };

  // const textStyles = (whichStyle) => {
  //   const activeObject = canvas.getActiveObject();
  //   if (!activeObject || !activeObject.type === "i-text") {
  //     return;
  //   }

  //   switch (whichStyle.target.id) {
  //     case "bold-text":
  //         activeObject.set(
  //           "fontWeight",
  //           activeObject.fontWeight === "normal" ? "bold" : "normal"
  //         );
  //         break;
  //       case "italic-text":
  //         activeObject.set(
  //           "fontStyle",
  //           activeObject.fontStyle === "normal" ? "italic" : "normal"
  //         );
  //         break;
  //       case "underline-text":
  //         activeObject.set("underline", !activeObject.underline);
  //         break;
  //       case "color":
  //         activeObject.set("fill", style.value);
  //         break;
  //       case "fontSize":
  //         activeObject.set("fontSize", parseInt(style.value));
  //         break;
  //       case "fontFamily":
  //         activeObject.set("fontFamily", style.value);
  //         break;
  //       default:
  //         return null;
  //   }
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      (img.onload = () => {
        const fabricImage = new fabric.Image(img, {
          left: 10,
          top: 10,
        });

        // Set default dimensions
        fabricImage.scaleToHeight(150);
        fabricImage.scaleToWidth(150);

        canvas.add(fabricImage);
      }),
        { crossOrigin: "anonymous" };
      img.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleStickerClick = (stickerUrl) => {
    fabric.Image.fromURL(stickerUrl, (img) => {
      img.scaleToHeight(150);
      img.scaleToWidth(150);
      img.set({
        // left: 10,
        // top: 10,
        // scaleX: 0.5,
        // scaleY: 0.5,
      });

      canvas.add(img);
    });
  };

  const handleDeleteObject = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const downloadTshirtDesign = () => {
    const container = document.querySelector(".img-container");
    const scale = 4;

    const canvasOptions = {
      height: container.offsetHeight * scale,
      width: container.offsetWidth * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      },
    };

    domtoimage
      .toPng(container, canvasOptions)
      .then((dataUrl) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = dataUrl;
        downloadLink.download = "tshirt-design.png";
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
      })
      .catch((error) => {
        console.error("Error downloading T-shirt design:", error);
      });
  };

  useEffect(() => {
    const canvasInstance = new fabric.Canvas("tcanvas", {
      height: 550,
      width: 550,
    });

    // Set fabric.js customization options here
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#0c0732";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerStrokeColor = "#0e104d";
    fabric.Object.prototype.cornerSize = 8;
    setCanvas(canvasInstance);

    return () => {
      canvasInstance.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      const frontImage =
        clothType === "tshirt" ? tshirtFrontImage : hoodieFrontImage;
      const backImage =
        clothType === "tshirt" ? tshirtBackImage : hoodieBackImage;

      fabric.Image.fromURL(
        selectedSide === "front" ? frontImage : backImage,
        (img) => {
          // Calculate the scale factor to fit the image inside the canvas
          const scaleFactor = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          );

          // Set scaleX and scaleY to fit the image inside the canvas
          img.set({
            scaleX: scaleFactor,
            scaleY: scaleFactor,
            scaleX: scaleFactor,
            scaleY: scaleFactor,
            selectable: false, // Make the image non-selectable
            evented: false,
          });

          // Calculate new position to center the image within the canvas
          const offsetX = (canvas.width - img.width * scaleFactor) / 2;
          const offsetY = (canvas.height - img.height * scaleFactor) / 2;

          // Set the new position
          img.set({
            left: offsetX,
            top: offsetY,
          });

          canvas.clear();
          canvas.add(img);
          canvas.renderAll();
        },
        { crossOrigin: "anonymous" }
      );
    }
  }, [canvas, clothType, selectedSide]);

  // Array of predefined color options
  const colorOptions = ["red", "green", "yellow", "gray", "white", "black"];
  const handleColorButtonClick = (color) => {
    // Update the product color when a color button is clicked
    // changeColor(color);

    // Change the background color of the drawingArea
    const drawingArea = document.querySelector(".drawingArea");
    if (drawingArea) {
      drawingArea.style.backgroundColor = color;
    }
  };

  const [quantities, setQuantities] = useState({
    M: 0,
    L: 0,
    XL: 0,
  });

  const handleQuantityChange = (size, value) => {
    setQuantities({ ...quantities, [size]: value });
  };

  //cl
  // console.log(selectedObjectProps);


  return (
    <>
    <Navbar/>
    <div className=" editing-container container">
      <EditingHome.Provider
        value={{
          handleImageUpload,
          handleAddText,
          handleClothTypeChange,
          textValue,
          setTextValue,
          textStyles,
          handleStickerClick,
        }}
      >
        <Settings />

        <div className="wrapper">
          <div className="left">
            <div className="tshirt-container">
              <div className="img-container">
                {/* <button>Delete</button> */}
                <div
                  className="drawingArea"
                  style={{
                    background: "white",
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    className="fabric-canvas"
                    id="tcanvas"
                    style={
                      {
                        // border: "1px solid black",
                      }
                    }
                  />
                </div>
              </div>
            </div>
            <div className="btns">
              <div className="front">
                <button></button>
                <span>Front</span>
              </div>
              <div className="back">
                <button></button>
                <span>Back</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="top">
              <h2 className="heading">Unisex Softstyle T-Shirt</h2>
              <div className="rating">
                <IoIosStar color="#F39200" />
                <IoIosStar color="#F39200" />
                <IoIosStar color="#F39200" />
                <IoIosStar color="#F39200" />
                <span>4.8</span>
              </div>
              <div className="desc">
                <li>100% ring-spun cotton</li>
                <li>Sport Grey is 90% ring-spun cotton, 10% polyester</li>
                <li>
                  Dark Heather is 65% polyester, 35% cotton 4.5 oz/yd² (153
                  g/m²){" "}
                </li>
                <li>
                  Shoulder-to-shoulder taping Quarter-turned to avoid crease
                  down the center{" "}
                </li>
                <li>Quarter-turned to avoid crease down the center </li>
                <li>
                  Blank product sourced from Bangladesh, Nicaragua, Honduras,
                  Dominican Republic, Haiti or Guatemala{" "}
                </li>
              </div>
              <div className="colors">
                <h3>Choose Your Color</h3>
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: color,
                      width: "30px",
                      height: "30px",
                      margin: "5px",
                    }}
                    onClick={() => handleColorButtonClick(color)}
                  >
                    &nbsp;
                  </button>
                ))}
              </div>
              {/* <div className="sticker-section">
                <h3>Stickers</h3>
                {data.map((sticker) => (
                  <button
                    key={sticker.id}
                    onClick={() => handleStickerClick(sticker.url)}
                  >
                    <img
                      width={100}
                      height={100}
                      src={sticker.url}
                      alt={`Sticker ${sticker.id}`}
                    />
                  </button>
                ))}
              </div> */}
              <div className="quantity">
                <div className="heading">
                  <h3>Choose your quantity</h3>
                  <p>Size guide</p>
                </div>
                <div className="wrap">
                  <div className="size-input">
                    <label>
                      <input
                        type="number"
                        value={quantities.M}
                        onChange={(e) =>
                          handleQuantityChange(
                            "M",
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      <span>M</span>
                    </label>
                  </div>
                  <div className="size-input">
                    <label>
                      <input
                        type="number"
                        value={quantities.L}
                        onChange={(e) =>
                          handleQuantityChange(
                            "L",
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      <span>L</span>
                    </label>
                  </div>
                  <div className="size-input">
                    <label>
                      <input
                        type="number"
                        value={quantities.XL}
                        onChange={(e) =>
                          handleQuantityChange(
                            "XL",
                            parseInt(e.target.value, 10)
                          )
                        }
                      />
                      <span>XL</span>
                    </label>
                  </div>
                </div>
                {/* <div>
                  <h3>Selected Quantities:</h3>
                  <p>Size M: {quantities.M}</p>
                  <p>Size L: {quantities.L}</p>
                  <p>Size XL: {quantities.XL}</p>
                </div> */}
              </div>
              <div className="price">
                <h2>Price</h2>
                <p>600</p>
              </div>
              <div className="add-cart">
                {/* <div className="upload-section">
                  <h3>Upload Image</h3>
                  <input type="file" onChange={handleImageUpload} />
                </div> */}
                <button>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </EditingHome.Provider>
    </div>
    </>
  );
};

export default EditingPage;
