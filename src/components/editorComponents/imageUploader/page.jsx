import React, { useContext, useState } from "react";
import { EditingHome } from "./../../../app/editingpage/page";
import "./style.scss";
import {HiOutlineUpload} from 'react-icons/hi'

function ImageUploader() {
  const { handleImageUpload, ObjectSelected } = useContext(EditingHome);
  const [scale, setScale] = useState(1); // State for scale
  const [transparency, setTransparency] = useState(1); // State for transparency

  return (
    <div className="upload-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        id="imageUploadInput"
      />
      <button className="uploadButton">
        <HiOutlineUpload/>
        <label htmlFor="imageUploadInput" className="">
          Upload Image
        </label>
      </button>
    </div>
  );
}

export default ImageUploader;
