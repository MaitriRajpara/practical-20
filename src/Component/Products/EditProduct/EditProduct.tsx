import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../Api/ProductApi";
import "./Edit.css";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setImagePreview(data.image);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load product data");
        setLoading(false);
      });
  }, [id]);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      let updatedImage = imagePreview;

      if (imageFile) {
        updatedImage = await toBase64(imageFile);
      }

      const updatedProduct = {
        title,
        description,
        price,
        image: updatedImage,
      };

      await updateProduct(id as string, updatedProduct);

      alert("Product updated successfully");
      navigate("/products");
    } catch (error) {
      alert("Error updating product");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="edit-product-form">
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
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
