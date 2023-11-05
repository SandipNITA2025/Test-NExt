"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import { FaTshirt } from "react-icons/fa";
import { RiText, RiListSettingsFill } from "react-icons/ri";
import { MdFileUpload, MdInsertPhoto } from "react-icons/md";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { EditingHome } from "./../../../app/editingpage/page";
import Image from "next/image";
import ImageUploader from "./../imageUploader/page";
import "./style.scss";
import axios from "axios";
import { BASE_URL } from "./../../../api/BASE_URL";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import TextStyle from "./../textStyle/page";

const icon_tshirt = "https://i.postimg.cc/x8WQhJRV/mens-tshirt-front.png";
const icon_hoodie = "https://i.postimg.cc/dtnWnkqh/mens-hoodie-front.png";

const Settings = () => {
  const {
    handleClothTypeChange,
    handleStickerClick,
    handleAddText,
    textValue,
    setTextValue,
  } = useContext(EditingHome);

  const [activeControl, setActiveControl] = useState("product");
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [data, setData] = useState([]);
  const [text, settext] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://ai-image-generator3.p.rapidapi.com/generate",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "4bccd671cbmsh5d6f77e7e31c19ep16a769jsndec5982b5e49",
          "X-RapidAPI-Host": "ai-image-generator3.p.rapidapi.com",
        },
        data: {
          prompt: searchQuery,
          page: 1,
        },
      });
      setSearchResults(response.data?.results?.images);
      console.log(response.data?.results?.images);
    } catch (error) {
      console.error("Error fetching AI images:", error);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/design/inhome/`);
        setData(response.data?.message);
        console.log(response.data?.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // return () => {

    // };
  }, []);

  const handleControlClick = (control) => {
    setActiveControl(control);

    // If "Product" control is clicked, show the model
    if (control === "product") {
      setIsModelVisible(!isModelVisible);
    } else {
      // Hide the model for other controls
      setIsModelVisible(!isModelVisible);
    }
  };
  return (
    <>
      <div className="controlles">
        <div
          className={`controll ${activeControl === "product" ? "active" : ""}`}
          onClick={() => handleControlClick("product")}
        >
          <FaTshirt />
          <span>Product</span>
        </div>
        <div
          className={`controll ${activeControl === "text" ? "active" : ""}`}
          onClick={() => handleControlClick("text")}
        >
          <RiText />
          <span>Text</span>
        </div>
        <div
          className={`controll ${activeControl === "upload" ? "active" : ""}`}
          onClick={() => handleControlClick("upload")}
        >
          <MdFileUpload />
          <span>Upload</span>
        </div>
        <div
          className={`controll ${
            activeControl === "home-design" ? "active" : ""
          } `}
          onClick={() => handleControlClick("home-design")}
        >
          <MdInsertPhoto />
          <span>
            Home <br /> design
          </span>
        </div>
        <div className="controll clipart">
          <BsFillEmojiSmileFill />
          <span>Clipart</span>
        </div>
        <div
          className={`controll ${
            activeControl === "ai-image" ? "active" : ""
          } `}
          onClick={() => handleControlClick("ai-image")}
        >
          <AiFillMessage />
          <span>
            Ai <br /> Image
          </span>
        </div>
        <div className="controll setting">
          <RiListSettingsFill />
          <span>Settings</span>
        </div>
      </div>

      {isModelVisible && (
        <div className="model">
          {activeControl === "product" && (
            <div className="contain">
              <div
                className="box"
                onClick={() => handleClothTypeChange("tshirt")}
              >
                <Image
                  src={icon_tshirt}
                  alt="hoodie"
                  width={"80"}
                  height={"80"}
                />
                <span>T-Shirt</span>
              </div>
              <div
                onClick={() => handleClothTypeChange("hoodie")}
                className="box"
              >
                <Image
                  src={icon_hoodie}
                  alt="hoodie"
                  width={"80"}
                  height={"80"}
                />
                <span>Hoodie</span>
              </div>
            </div>
          )}

          {activeControl === "text" && (
            <div className="text-content">
              <h3>Text</h3>
              <input
                type="text"
                value={text}
                onChange={(e) => {
                  settext(e.target.value);
                }}
                placeholder="Enter your text here"
              />
              <button
                className="addText"
                onClick={() => {
                  handleAddText(text);
                  settext("");
                }}
              >
                <AiOutlinePlus />
                Add Text
              </button>
              <TextStyle />
            </div>
          )}

          {activeControl === "upload" && (
            <div className="upload-content">
              <ImageUploader />
            </div>
          )}

          {activeControl === "home-design" && (
            <div className="home-content">
              <h3>In House Designs</h3>
              <div className="wrapper">
                {data.map((i, indx) => (
                  <div
                    className="img-container"
                    onClick={() =>
                      handleStickerClick(
                        `https://res.cloudinary.com/df27hqjfd/${i?.designImg}`
                      )
                    }
                    key={indx}
                  >
                    <img
                      src={`https://res.cloudinary.com/df27hqjfd/${i?.designImg}`}
                      alt={"ok"}
                      fill={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeControl === "ai-image" && (
            <div className="ai-image">
              <h3>Generate AI Image</h3>
              <div className="search">
                <AiOutlineSearch size={25} />
                <input
                  type="search"
                  placeholder="Enter your keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                {/* <button onClick={handleSearch}>Search</button> */}
              </div>
              <div className="wrapper">
                {searchResults?.map((image, index) => (
                  <div
                    className="img-container"
                    onClick={() => handleStickerClick(image)}
                    key={index}
                    
                  >
                    <img key={index} src={image} alt={`AI Image ${index}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Settings;
