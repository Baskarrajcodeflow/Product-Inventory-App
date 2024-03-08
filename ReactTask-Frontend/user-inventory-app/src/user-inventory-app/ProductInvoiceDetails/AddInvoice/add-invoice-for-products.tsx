import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ApiService from "../../ApiService/api-service.tsx";

//-------------------------------------------------------------------------------------------------------//
const AddInvoiceForProducts = () => {
  //Navigate to Another Component
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState([]);
  //--------------------------------Get Inventory Products-----------------------------//
  useEffect(() => {
    const fetchData = async () => {
      ApiService.GetAllInventoryProducts().then((res) => {
        let productDetails: any = res?.data["responseData"];
        setProductDetails(productDetails);
      });
    };
    fetchData();
  }, []);
  //------------------------------------------Select Table Row Function---------------------------//
  const array = [];
  const handleRowClick = (index) => {
    array.push(productDetails[index]);
  };
  //--------------------------------------------Add Invoice  For Selected Product ----------------------//
  return (
    <>
      <div className="mt-[2%]">
        <div className="ml-[25%]">
          <Button
            variant="contained"
            onClick={() => navigate("/generateInvoice", { state: array })}
          >
            Add Invoice
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            onClick={() => navigate("/products")}
          >
            Go To Products
          </Button>
        </div>
        <table className="w-[50%] mx-auto mt-[10px]">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          {productDetails.map((res: any, index) => {
            return (
              <>
                <tr key={index}>
                  <td>
                    <Checkbox onClick={() => handleRowClick(index)} />

                    {res.product_name}
                  </td>
                  <td>{res.product_description}</td>
                  <td>{res.product_quantity}</td>
                  <td>{res.product_price}/Unit</td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default AddInvoiceForProducts;
//-------------------------------------------------------------------------------------------------------//
