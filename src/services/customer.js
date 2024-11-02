const {
  find_customer_by_id,
  add_customer,
  find_all_customer,
  find_and_delete_customer,
  find_customer,
} = require("../DAL/customer");
const {
  find_user_by_email,
  add_user_password,
  find_and_delete_user,
} = require("../DAL/user");
const {
  get_params_data,
  get_query_data,
} = require("../utilities/get_request_data");

//********************************************{Add Customer}********************************************************/
const _addCustomer = async (body, resp) => {
  let user = await find_user_by_email(body.email);
  if (user) {
    if (!user) {
      resp.error = "Somthing Went Wrong";
      resp.message = "Somthing Went Wrong";
      return resp;
    }
    if (user.is_registered) {
      resp.error = "Email Alreay axist";
      resp.message = "Email Alreay axist";
      return resp;
    }
    user.password = body.password;
    user = await add_user_password(user);
  }
  let customer = await add_customer({ ...body, user_id: user._id });

  if (!customer) {
    resp.error = "Somthing Went Wrong";
    resp.message = "Somthing Went Wrong";
    return resp;
  }

  user = user.toObject();
  customer = customer.toObject();
  delete user.password;
  resp.data = { ...customer, user };
  return resp;
};
const addCustomer = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _addCustomer(body, resp);
  return resp;
};

//********************************************{Detail Customer}********************************************************/
const _editCustomer = async (body, params, resp) => {
  const { _id } = get_params_data(params);

  let customer = await find_customer(_id);

  if (customer) {
    customer.first_name = body.first_name;
    customer.last_name = body.last_name;
    customer.save();
    resp.data = customer;

    return resp;
  }
  resp.error = "Customer Not Found";
  resp.message = "Customer Not Found";
  return resp;
};
const editCustomer = async (body, params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _editCustomer(body, params, resp);
  return resp;
};
//********************************************{Detail Customer}********************************************************/
const _detailCustomer = async (params, resp) => {
  const { _id } = get_params_data(params);

  let customer = await find_customer_by_id(_id);

  if (customer?.length > 0) {
    resp.data = customer?.[0];
    return resp;
  }
  resp.error = "Customer Not Found";
  resp.message = "Customer Not Found";
  return resp;
};
const detailCustomer = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _detailCustomer(params, resp);
  return resp;
};

//********************************************{List Customer}********************************************************/
const _listCustomer = async (query, resp) => {
  let customer = await find_all_customer(get_query_data(query));

  if (!customer) {
    resp.error = "Customer Not Found";
    resp.message = "Customer Not Found";
    return resp;
  }
  resp.data = customer;
  return resp;
};
const listCustomer = async (query) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _listCustomer(query, resp);
  return resp;
};

//********************************************{Delete Customer}********************************************************/
const _deleteCustomer = async (params, resp) => {
  const { _id } = get_params_data(params);

  let customer = await find_and_delete_customer(_id);

  if (!customer) {
    resp.error = "Customer Not Found";
    resp.message = "Customer Not Found";
    return resp;
  }

  let user = await find_and_delete_user(customer.user_id);
  if (!user) {
    resp.error = "Customer Not Found";
    resp.message = "Customer Not Found";
    return resp;
  }
  resp.data = customer;
  return resp;
};
const deleteCustomer = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _deleteCustomer(params, resp);
  return resp;
};

module.exports = {
  addCustomer,
  editCustomer,
  detailCustomer,
  listCustomer,
  deleteCustomer,
};
