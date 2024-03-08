import "./App.css";
import LoginPage from "./user-inventory-app/Authentication/Login/login-inventory.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./user-inventory-app/Authentication/Register/register.jsx";
import ProductTable from "./user-inventory-app/InventoryProductDetail/AllProductDetails/productDetails.tsx";
import AddInventoryProducts from "./user-inventory-app/InventoryProductDetail/AddInventoryProducts/addInventoryProducts.tsx";
import UpdateInventoryProductsQuantity from "./user-inventory-app/InventoryProductDetail/UpdateProductQuantity/update-product-quantity.jsx";
import AddInvoiceForProducts from "./user-inventory-app/ProductInvoiceDetails/AddInvoice/add-invoice-for-products.tsx";
import GenerateInvoice from "./user-inventory-app/ProductInvoiceDetails/GenerateInvoice/generate-invoice.tsx";
import GeneratedInvoiceDetailRecords from "./user-inventory-app/ProductInvoiceDetails/InvoiceRecords/invoice-records.tsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/addProducts" element={<AddInventoryProducts />} />
          <Route
            path="/updateProducts"
            element={<UpdateInventoryProductsQuantity />}
          />
          <Route path="/addInvoice" element={<AddInvoiceForProducts />} />
          <Route path="/generateInvoice" element={<GenerateInvoice />} />
          <Route
            path="/generatedInvoiceRecord"
            element={<GeneratedInvoiceDetailRecords />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
