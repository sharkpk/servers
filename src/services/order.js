const {
  add_order,
  find_order_by_id,
  find_and_delete_order,
  find_all_order,
} = require("../DAL/order");
const {
  get_params_data,
  get_query_data,
} = require("../utilities/get_request_data");
const { find_customer_by_id } = require("../DAL/customer");
const { find_product_by_id } = require("../DAL/product");

//********************************************{Add Order}********************************************************/
const _addOrder = async (body, resp) => {
  let customer = body.customer;

  // check customers
  try {
    customer = await find_customer_by_id(customer);
    if (!customer) {
      resp.error = true;
      resp.message = "Invalid Customer Id";
      return resp;
    }
  } catch (error) {
    resp.error = true;
    resp.message = "Invalid Customer Id";
    return resp;
  }

  //check products and quantity
  let total = 0;
  let quantity = 0;
  try {
    let products = body.products;
    if (products.length == 0) {
      resp.error = true;
      resp.message = "Order must contain atleast 1 product";
      return resp;
    }

    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      quantity = product.quantity;
      if (product.quantity <= 0) {
        resp.error = true;
        resp.message = "some products in the order have 0 quantity";
        return resp;
      }
      product = await find_product_by_id(product.product);
      total += Number(product[0].price) * Number(quantity);
    }
  } catch (error) {
    resp.error = true;
    resp.message = "Invalid Product Id";
    return resp;
  }


  order = await add_order({ ...body, total });
  if (!order) {
    resp.error = true;
    resp.message = "Somthing Went Wrong";
    return resp;
  }

  order = order.toObject();
  resp.data = order;
  return resp;
};
const addOrder = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _addOrder(body, resp);
  return resp;
};

//********************************************{Detail Order}**w******************************************************/
const _detailOrder = async (params, resp) => {
  const { _id } = get_params_data(params);

  let order = await find_order_by_id(_id);

  if (order?.length > 0) {
    resp.data = order;
    return resp;
  }
  resp.error = true;
  resp.message = "Order Not Found";
  return resp;
};
const detailOrder = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _detailOrder(params, resp);
  return resp;
};

//********************************************{List Order}********************************************************/
const _listOrder = async (query, resp) => {
  let order = await find_all_order(get_query_data(query));
  if (!order) {
    resp.error = true;
    resp.message = "Order Not Found";
    return resp;
  }
  resp.data = order;
  return resp;
};
const listOrder = async (query) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _listOrder(query, resp);
  return resp;
};
//********************************************{Delete Order}********************************************************/
const _deleteOrder = async (query, resp) => {
  const { _id } = get_params_data(query);

  let order = await find_and_delete_order(_id);

  if (!order) {
    resp.error = true;
    resp.message = "Order Not Found";
    return resp;
  }
  resp.data = {};
  return resp;
};

const deleteOrder = async (query) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _deleteOrder(query, resp);
  return resp;
};

module.exports = {
  addOrder,
  deleteOrder,
  listOrder,
  detailOrder,
};
