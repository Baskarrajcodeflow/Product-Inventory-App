import React from "react";
import Textfield from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./update-product-quantity.css";
import ApiService from "../../ApiService/api-service.tsx";

//------------------------------------Update Product Quantity Component----------------------------------//
const UpdateInventoryProductsQuantity = () => {
  //- ----------------------------Navigation Method-------------------------------------------------//
  const navigate = useNavigate();
  const location = useLocation();
  //-----------------------------User Input Fields State And Function Management--------------//
  const [productQuantity, setProductQuantity] = useState("");
  useEffect(() => {
    if (location.state && location.state.product_quantity) {
      setProductQuantity(location.state.product_quantity);
    }
  }, [location.state]);
  //-----------------------------Update Product Quantity API Function Management--------------//
  const updateProductQuantity = () => {
    let UpdatedQuantityData = {
      product_quantity: productQuantity,
      id: location.state.id,
    };

    ApiService.UpdateProductQuantity(UpdatedQuantityData).then((res) => {
      if (res?.status === 200) {
        navigate("/products");
      }
    });
  };

  return (
    <div className="boxAlign">
      <div>
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
      <div className="mt-[10px]">
        <Button
          disabled={!productQuantity}
          onClick={updateProductQuantity}
          className="button w-[28%]"
          variant="contained"
        >
          UPDATE PRODUCT QUANTITY
        </Button>
      </div>
    </div>
  );
};

export default UpdateInventoryProductsQuantity;
//--------------------------------------------------------------------------------------------------------------//
