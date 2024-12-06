"use client";

import { useState, useRef } from "react";
import { db } from "../../../config/firebase";
import { collection, addDoc, deleteDoc } from "firebase/firestore"; // Import Firestore functions

import { CloseOutlined } from "@mui/icons-material";

export default function AddProduct({ onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [description, setDescription] = useState("");
  const modelref = useRef();
  const addProductHandler = async () => {
    try {
      const product = {
        name,
        price,
        image,
        image1,
        image2,
        description,
      };

      // Add a new document to the "products" collection
      const docRef = await addDoc(collection(db, "products"), product);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
  };
  const CloseModel = (e) => {
    if (modelref.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modelref}
      onClick={CloseModel}
      className="fixed  inset-0 z-30 h-screen w-screen bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
      <div className="w-[90%] relative flex items-center flex-col justify-center p-4 py-12 rounded-[10px] bg-white">
        <CloseOutlined onClick={onClose} className="absolute top-4 right-4" />
        <input
          className="custom-input"
          value={name}
          type="text"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="custom-input"
          value={price}
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="custom-input"
          value={description}
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="custom-input"
          value={image}
          type="text"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          className="custom-input"
          value={image1}
          type="text"
          placeholder="2nd optional Image URL"
          onChange={(e) => setImage1(e.target.value)}
        />

        <input
          className="custom-input"
          value={image2}
          type="text"
          placeholder="3rd optional Image URL"
          onChange={(e) => setImage2(e.target.value)}
        />

        <button className="w-[80%] h-[40px] bg-[#212121] text-white font-medium mt-[20px]" onClick={addProductHandler}>Add Product</button>
      </div>
    </div>
  );
}
