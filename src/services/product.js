const {
  find_product_by_name,
  add_product,
  find_product_by_id,
  find_all_product,
  find_and_delete_product,
} = require("../DAL/product");
const {
  get_params_data,
  get_query_data,
} = require("../utilities/get_request_data");
const upload_image = require("../libs/cloudinary");

//********************************************{Add Product}********************************************************/
const _addProduct = async (body, resp, file) => {
  let product = await find_product_by_name(body.name);
  if (product.length > 0) {
    resp.error = true;
    resp.message = "Product with this name already exist";
    return resp;
  }
  let image = await upload_image(file, "image");
  if (!image.url) {
    resp.error = true;
    resp.message = "Failed to upload image";
    return resp;
  }

  product = await add_product({ ...body, image: image.url });
  if (!product) {
    resp.error = true;
    resp.message = "Somthing Went Wrong";
    return resp;
  }

  product = product.toObject();
  resp.data = product;
  return resp;
};
const addProduct = async (body, files) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _addProduct(body, resp, files);
  return resp;
};

//********************************************{Detail Product}********************************************************/
const _detailProduct = async (params, resp) => {
  const { _id } = get_params_data(params);

  let product = await find_product_by_id(_id);

  if (product?.length > 0) {
    resp.data = product?.[0];
    return resp;
  }
  resp.error = true;
  resp.message = "Product Not Found";
  return resp;
};
const detailProduct = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _detailProduct(params, resp);
  return resp;
};

//********************************************{List Product}********************************************************/
const _listProduct = async (query, resp) => {
  let product = await find_all_product(get_query_data(query));
  if (!product) {
    resp.error = true;
    resp.message = "Products Not Found";
    return resp;
  }
  resp.data = product;
  return resp;
};
const listProduct = async (query) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _listProduct(query, resp);
  return resp;
};
//********************************************{Delete Product}********************************************************/
const _deleteProduct = async (query, resp) => {
  const { _id } = get_params_data(query);

  let product = await find_and_delete_product(_id);

  if (!product) {
    resp.error = true;
    resp.message = "Product Not Found";
    return resp;
  }
  resp.data = {};
  return resp;
};

const deleteProduct = async (query) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _deleteProduct(query, resp);
  return resp;
};

module.exports = {
  addProduct,
  detailProduct,
  listProduct,
  deleteProduct,
};
