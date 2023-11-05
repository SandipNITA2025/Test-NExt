import React, { useContext } from "react";
import { EditingHome } from "./../../app/editingpage/page";

function DeleteObject() {
  const { tshirtFrontCanvas, tshirtBackCanvas, side } = useContext(EditingHome);

  const handleDelete = () => {
    const canvas = side === "front" ? tshirtFrontCanvas : tshirtBackCanvas;

    if (canvas) {
      const selectedObject = canvas.getActiveObject();
      if (selectedObject) {
        canvas.remove(selectedObject);
        canvas.renderAll();
      }
    }
  };

  return (
    <button className="" onClick={handleDelete}>
      Delete Object
    </button>
  );
}

export default DeleteObject;
