import { EditingHome } from "./../../../app/editingpage/page";
import React, { useContext, useState } from "react";
import {
  BsTypeBold,
  BsTypeUnderline,
  BsTypeItalic,
  BsPlus,
  BsDash,
} from "react-icons/bs";
import { RiOverline } from "react-icons/ri";
import "./style.scss";

const TextStyle = () => {
  const { textStyles } = useContext(EditingHome);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial");

  const handleTextColorChange = (color) => {
    setTextColor(color);
    textStyles({ id: "color", value: color });
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    textStyles({ id: "fontSize", value: parseInt(size) });
  };

  const handleFontFamilyChange = (selectedFontFamily) => {
    setFontFamily(selectedFontFamily);
    textStyles({ id: "fontFamily", value: selectedFontFamily });
  };

  const increaseFontSize = () => {
    const newSize = fontSize + 1;
    setFontSize(newSize);
    handleFontSizeChange(newSize); // Update the input field value
  };
  
  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 1, 1);
    setFontSize(newSize);
    handleFontSizeChange(newSize); // Update the input field value
  };
  

  return (
    <div className="text-style-container">
      <div className="top-buttons">
        <button
          className="btn-bold"
          id="bold-text"
          onClick={() => textStyles({ id: "bold-text" })}
        >
          <BsTypeBold />
        </button>

        <br />
        <button
          className="btn-italic"
          id="italic-text"
          onClick={() => textStyles({ id: "italic-text" })}
        >
          <BsTypeItalic />
        </button>
        <br />
        <button
          className="btn-underline"
          id="underline-text"
          onClick={() => textStyles({ id: "underline-text" })}
        >
          <BsTypeUnderline />
        </button>
        <br />
        {/* <button
          className="btn-overline"
          id="overline-text"
          onClick={() => textStyles({ id: "overline-text" })}
        >
          <RiOverline />
        </button> */}
        <br />
        <input
          type="color"
          value={textColor}
          className="color"
          onChange={(e) => handleTextColorChange(e.target.value)}
        />
      </div>

      <div className="down-buttons">
        <select
          value={fontFamily}
          onChange={(e) => handleFontFamilyChange(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <button onClick={increaseFontSize}>
          <BsPlus />
        </button>
        <input
          className="number"
          type="tex"
          placeholder="Font Size"
          value={fontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)}
        />
        <button onClick={decreaseFontSize}>
          <BsDash />
        </button>
      </div>
    </div>
  );
};

export default TextStyle;
