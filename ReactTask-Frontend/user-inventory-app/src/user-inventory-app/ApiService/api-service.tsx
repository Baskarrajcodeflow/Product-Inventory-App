import axios from "axios";
//BaseUrl
const BaseURL = `http://localhost:3001/`;
const getAuthToken = sessionStorage.getItem("jwt_token");

const header = `Authorization: Bearer ${getAuthToken}`;
const ApiService = {
  //------------------------------------Check User Credential Api Url--------------------------------------//
  checkUserCredentialsMethod: function (username, password): Promise<any> {
    return axios.get(
      `${BaseURL}UserRegistrationDetailApi/checkUserLoginCredentials?user_name=${username}&user_password=${password}`,
      { headers: { header } }
    );
  },
  //------------------------------------Register User Credential Api Url--------------------------------------//
  RegisterUserDataApiURL: function (registerUserData): Promise<any> {
    return axios.post(
      `${BaseURL}UserRegistrationDetailApi/addUser`,
      registerUserData
    );
  },
  //------------------------------------Add User Inventory Products Api Url--------------------------------------//
  addInventoryProductDetails: function (productData): Promise<any> {
    return axios.post(
      `${BaseURL}inventory-products-details/addInventoryProductDetails`,
      productData,
      { headers: { header } }
    );
  },
  //------------------------------------Get User Inventory Products Api Url--------------------------------------//
  GetAllInventoryProducts: function (): Promise<any> {
    return axios.get(
      `${BaseURL}inventory-products-details/getInventoryProductDetails`,
      { headers: { header } }
    );
  },
  //------------------------------------Update User Inventory Products Api Url--------------------------------------//
  UpdateProductQuantity: function (UpdatedQuantityData): Promise<any> {
    return axios.put(
      `${BaseURL}inventory-products-details/updateInventoryProductDetails`,
      UpdatedQuantityData,
      { headers: { header } }
    );
  },
  //------------------------------------Generated Invoice Get Api Url--------------------------------------//
  GenerateInvoiceApi: function (generatedInvoiceData): Promise<any> {
    return axios.post(
      `${BaseURL}generate-invoice/GeneratedProductDetails`,
      generatedInvoiceData,
      { headers: { header } }
    );
  },
  //------------------------------------Get Generated Invoice Get Api Url--------------------------------------//
  GetGenerateInvoiceDetailRecords: function (): Promise<any> {
    return axios.get(
      `${BaseURL}generate-invoice/GetGenerateInvoiceDetailRecords`,
      { headers: { header } }
    );
  },
};

export default ApiService;
