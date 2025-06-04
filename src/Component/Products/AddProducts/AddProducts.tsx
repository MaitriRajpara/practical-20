import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../Api/ProductApi";
import "./Add.css";

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const navigate = useNavigate();

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price)
      return alert("Please fill all fields");
    if (!imageFile) return alert("Please select an image");

    try {
      const base64Image = await toBase64(imageFile);
      await addProduct({ title, description, price, image: base64Image });
      alert("Product added successfully");
      navigate("/products");
    } catch (error) {
      alert("Error adding product");
      console.error(error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
