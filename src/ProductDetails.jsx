import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchProduct();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details">
      <img
        src={product.thumbnail}
        alt={product.title}
      />

      <h1>{product.title}</h1>

      <p>₹{product.price}</p>

      <p>{product.category}</p>

      <p>{product.description}</p>

      <p>Rating: {product.rating}</p>

      <button
      className={added ? "added-button" : "add-button"}
      onClick={() => {
        addToCart(product);
        setAdded(true);

        setTimeout(() => {
        setAdded(false);
        }, 800);
        }}
      >
      {added ? "✓ Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductDetails;


  