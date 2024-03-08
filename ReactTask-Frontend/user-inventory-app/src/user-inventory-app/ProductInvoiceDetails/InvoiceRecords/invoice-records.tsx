import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService/api-service.tsx";
//----------------------------------------------------------------------------------------------------------------//
const GeneratedInvoiceDetailRecords = () => {
  //Navigate to Another Component
  const navigate = useNavigate();
  //-----------------------------State And Function Management---------------------------------------//
  const [productDetails, setProductDetails] = useState([]);
  //-----------------------------Get Generated Invoice Data From Database---------------------------//
  useEffect(() => {
    ApiService.GetGenerateInvoiceDetailRecords().then((res: any) => {
      setProductDetails(res?.data.data);
    });
  }, []);

  return (
    <>
      <div className="text-center text-green-600 font-bold">
        User Generated Invoice Records
      </div>

      {productDetails.map((table: any, tableIndex) => {
        // Access total price for the current table
        const totalPrice = table[0].total_price; // Assuming total price is the same for all rows in the table

        return (
          <>
            <table key={tableIndex} className="w-[50%] mx-auto mt-[10px]">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {table.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{row.product_name}</td>
                    <td>{row.product_description}</td>
                    <td>{row.product_quantity}</td>
                    <td>{row.product_price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}>Total</td>
                  <td>{totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </>
        );
      })}
      <div className="text-center mt-[10px]">
        <Button
          style={{
            marginLeft: "10px",
            color: "white",
            backgroundColor: "green",
          }}
          variant="outlined"
          onClick={() => navigate("/products")}
        >
          Go To Products
        </Button>
      </div>
    </>
  );
};

export default GeneratedInvoiceDetailRecords;
//---------------------------------------------------------------------------------------------------------------------//
