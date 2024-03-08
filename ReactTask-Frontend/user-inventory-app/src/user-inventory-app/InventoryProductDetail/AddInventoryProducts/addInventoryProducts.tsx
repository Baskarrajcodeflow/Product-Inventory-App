import React from "react";
import Textfield from "@mui/material/TextField";
import "./addInventoryProducts.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService/api-service.tsx";

//---------------------------------------|| ADD INVENTORY PRODUCTS COMPONENT ||---------------------------------------//
const AddInventoryProducts = () => {
  //Navigate to Another Component
  const navigate = useNavigate();
  // State for the input fields and button
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  //--------------------------------Add Inventory Products-----------------------------//
  const handleAddProduct = () => {
    let productData = {
      product_name: productName,
      product_description: productDescription,
      product_quantity: parseInt(productQuantity),
      product_price: parseFloat(productPrice),
    };
    ApiService.addInventoryProductDetails(productData).then((res) => {
      if (res?.["data"].statusCode === 200) {
        navigate("/products");
      } else {
      }
    });
  };
  //-----------------------------------------Add Inventory Form-----------------------//
  return (
    <>
      <div className="mt-[15px] formAlign" style={{ alignItems: "center" }}>
        <div>
          <Textfield
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            label="Product Name"
            className="form1"
            variant="outlined"
          ></Textfield>
        </div>
        <div className="margin mt-[10px]">
          <Textfield
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            label="Product Description"
            className="form1"
            variant="outlined"
          ></Textfield>
        </div>
        <div className="mt-[10px]">
          <Textfield
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            required
            label="Product Quantity"
            className="form1"
            variant="outlined"
            type="number"
          ></Textfield>
        </div>
        <div className="margin mt-[10px]">
          <Textfield
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            label="Product Price"
            className="form1"
            variant="outlined"
            type="number"
          ></Textfield>
        </div>
        <div className="mt-[10px]">
          <Button
            disabled={
              !productDescription ||
              !productName ||
              !productQuantity ||
              !productPrice
            }
            onClick={handleAddProduct}
            className="button w-[12%]"
            variant="outlined"
            style={
              productDescription &&
              productName &&
              productQuantity &&
              productPrice
                ? { backgroundColor: "green", color: "white" }
                : { backgroundColor: "lightgray", color: "white" }
            }
          >
            ADD PRODUCTS
          </Button>
          <Button
            onClick={() => navigate("/products")}
            className="button w-[12%] "
            variant="outlined"
            style={{
              backgroundColor: "red",
              color: "white",
              marginLeft: "4%",
            }}
          >
            GO BACK
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddInventoryProducts;
//-----------------------------------------------------------------------------------------------//
