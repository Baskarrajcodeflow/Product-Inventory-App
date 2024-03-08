import * as React from "react";
import { useEffect, useState } from "react";
import "./productDetails.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiService from "../../ApiService/api-service.tsx";

//--------------------------------------------------------------------------------------------------------------//
let ProductTable = () => {
  const navigate = useNavigate();
  //------ State for product details --------------------------//
  const [productDetails, setProductDetails] = useState([]);
  //----------------------------Api Function To Get  Product Details -----------------//
  useEffect(() => {
    const fetchData = async () => {
      ApiService.GetAllInventoryProducts().then((res) => {
        let productDetails: any = res?.data["responseData"];
        setProductDetails(productDetails);
      });
    };
    fetchData();
    toast.success("Data Fetched Successfully!");

    return () => {
      // Clean up function
      setProductDetails([]); // Clear product details when component unmounts
    };
  }, []);

  //---------- Functions related to Send Product Data and Navigation To Update Product Quantity Component-------------//
  const handleRowClick = (index) => {
    console.log(productDetails[index]);
    navigate("/updateProducts", { state: productDetails[index] });
  };
  //-------------------------Log Out Event-----------------//
  const logOutEvent = () => {
    let result = window.confirm("Are You Sure You Want To Log Out");
    if (result === true) {
      // Run your event here
      navigate("/login");
      setProductDetails([]);
    }
  };
  return (
    <>
      <div className="text-end mr-[5%] mt-[1%]">
        <button onClick={logOutEvent} className="buttonclass">
          Log Out
        </button>
      </div>
      <div className="mt-[2%]">
        <div className="flex gap-2">
          <div className="ml-[25%]">
            <button
              className="buttonclass"
              onClick={() => navigate("/addProducts")}
            >
              Add Products
            </button>
          </div>
          <div className="">
            <button
              className="buttonclass"
              onClick={() => navigate("/addInvoice")}
            >
              Add Invoice
            </button>
          </div>
          <div className="">
            <button
              className="buttonclass"
              onClick={() => navigate("/generatedInvoiceRecord")}
            >
              Invoice Records
            </button>
          </div>
        </div>
        <table className="w-[50%] mx-auto mt-[10px]">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>
                Update<br></br>Quantity
              </th>
            </tr>
          </thead>
          {productDetails.map((res: any, index) => {
            return (
              <>
                <tr key={index}>
                  <td>{res.product_name}</td>
                  <td>{res.product_description}</td>
                  <td>{res.product_quantity}</td>
                  <td>{res.product_price}/Unit</td>
                  <td onClick={() => handleRowClick(index)}>
                    <img
                      className="cursor-pointer"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAYFBMVEX///8AAACHh4ff399kZGQ6OjrDw8Ps7OyoqKgmJibGxsYdHR36+vojIyMpKSkZGRl7e3vMzMzy8vLZ2dlzc3MuLi5HR0dXV1eSkpJPT09eXl4SEhK3t7ednZ3S0tKvr69qNgmiAAAC+0lEQVRoge2Z25aCMAxFi4ooggIyXgZ1/v8vB2nLpW1KTuXRvKhhuck6TdKbEItZVa4ueXS83s7ZclBp2e4UaYsfy7LX+2hs92pBdhoZdlgvxt6a7Ja+VOwOdqvM8Dwp/3Y8+0todv5bXxv9Q4/q4+J6N2VPgt10uGync6bLyOqOoFt7jdn9WDZ6DEvlOLff1yB6GnrPPg0jqGK/tXHnMHzn0GQ/GopM1tNViAJmR4kj7skw/3a+Y4Ao8cuOO5+m0Ep6tT7R87zm2Qjj1ORtG+kVV/m4FLilRNxCyEZz7z9xozRpy0b6b0J+rj5gH012ctBqhMKJPGktU+w28QPhfdxW99Nxv6shDE7miaiO6smPCIS7at6Iu6u0EDidJ0k/26UiDE5rkmhNoq0Ig3Pilmwc7mHnBhuGe2rnaLJROF07VZ8nae/D4IMmVg7mNhuD93HTtTNoAsI5tZOO3QDck99mDsJwfu3gcHbNB8CBuoThUO2AcKx2MDinduy4eXBab3ftIHC4dgB4QH6z4R+wZ+FB+c2E4/2ED/9Ekzl4YO2w4MMa2cpBV6+yzxM8cHr9XTnY5/v+wu+KVa8Jp3bk9sfYQ9BwvRPj9UG5Ddow4VlOaOLOE7kNipnwlMpBd35jcKWKuROj8huCq83HycgvsnYg+Es+KKZeunYguFMVTz+B4C5VKk+vQuClQxXvvIPAC5vi74MAXJ2YjFWZ6d8AXKlSD28rZ/o3AJ/mSlYWw1kqMTfw4Xr73n1PR2R63uHDh1wp6zHZM+/w4UqVp3X+Rc9pbHh2MKGzbD68dJLzwnf2y4bXNvlQpP7zfDa8scjl7E0BFz49amzmYg6Gz6oBw8WPdJ4YauDw9ZteA2QE3i6f4LsebPb/wr/wL5wHl+21dv8DMHn3cZk64865/5StNlDGtkXNwYX7P1zL5LXT+8ZsbHqPvK9X4bbR64+X8U7VvBcx60bosSD8ZcJDbv4Ie1rs5eg3B7tVZgndY+p6L9sWsblYQayJV64Z9x+qXSUg8qwZtQAAAABJRU5ErkJggg=="
                      alt=""
                      width={"20px"}
                    />
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
      {/* Toast To Display Message */}
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ProductTable;
//--------------------------------------------------------------------------------------------------------------//
