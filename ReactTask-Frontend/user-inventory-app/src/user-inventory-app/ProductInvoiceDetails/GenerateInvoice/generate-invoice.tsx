import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import ApiService from "../../ApiService/api-service.tsx";

//---------------------------------Generate Invoice Component-----------------------//
const GenerateInvoice = () => {
  //Navigate Hook to Navigate to Another Component
  const location = useLocation();
  const navigate = useNavigate();
  // State for the Quantity
  const [productDetails] = useState(1);
  //-------------------------Handle Product Quantity -------------------//
  let queryProductPrice = location.state.map((price: any) => {
    return price?.product_price;
  });

  let sumProductPrice = queryProductPrice.reduce(
    (accumulator, initialValue) => {
      return accumulator + initialValue;
    }
  );

  //-----------------------------Generate Invoice  Functionality-------------------//
  let generateInvoice = () => {
    for (let i = 0; i < location?.state.length; i++) {
      if (location && location.state) {
        location.state[i]["total_product_quantity"] = Number(productDetails);
        location.state[i]["total_price"] = sumProductPrice;
        location.state[i]["updated_Quantity"] =
          location.state[i]["product_quantity"] - productDetails;
      }
    }

    ApiService.GenerateInvoiceApi(location?.state).then((res: any) => {
      if (res?.data.statusCode === 200) {
        navigate(`/products`);
      }
    });
  };

  return (
    <>
      <table className="w-[50%] mx-auto mt-[10px]">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        {location.state.map((res: any, index) => {
          return (
            <>
              <>
                <tr key={index}>
                  <td>{res.product_name}</td>
                  <td>{res.product_description}</td>
                  <td>{productDetails}</td>
                  <td>{res.product_price}</td>
                </tr>
              </>
            </>
          );
        })}
        <tr>
          <td colSpan={3}>Total</td>
          <td>{sumProductPrice}</td>
        </tr>
      </table>
      <div className="mt-[10px] text-center">
        <Button
          onClick={generateInvoice}
          variant="outlined"
          style={{ color: "white", backgroundColor: "green" }}
        >
          GENERATE INVOICE
        </Button>
      </div>
    </>
  );
};

export default GenerateInvoice;
