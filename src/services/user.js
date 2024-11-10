const { find_user_by_email, add_user, get_all_users, find_user_by_id, find_and_delete_user } = require("../DAL/user");
const {get_query_data, get_params_data} = require("../utilities/get_request_data");

//********************************************{Add User}********************************************************/
const _addUser = async (body, resp) => {
  let user = await find_user_by_email(body.email);
  if (user) {
    resp.error = true;
    resp.message = "Email Alreay axist";
    return resp;
  }
  // signup new user
  user = await add_user(body);
  if (!user) {
    resp.error = true;
    resp.message = "Something Went Wrong";
    return resp;
  }
  user = user.toObject();
  delete user.password;
  resp.data = user;
  return resp;
};
const addUser = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _addUser(body, resp);
  return resp;
};


//********************************************{List User}********************************************************/
const _listUser = async (query, resp) => {
  let data = await get_all_users(get_query_data(query));
  resp.data = data;
  return resp;
};
const listUser = async (query) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };
  resp = await _listUser(query, resp);
  return resp;
};

//********************************************{Detail User}********************************************************/
const _detailUser = async (params, resp) => {
  const {_id}=get_params_data(params)

  let data = await find_user_by_id(_id);
  if(!data)
  {
    resp.error=true
    resp.message="User Not Found"
    return resp
  }
  resp.data = data;
  return resp;
};
const detailUser = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };
  resp = await _detailUser(params, resp);
  return resp;
};

//********************************************{Delete User}********************************************************/
const _deleteUser = async (params, resp) => {
  const {_id}=get_params_data(params)

  let data = await find_and_delete_user(_id);
  if(!data)
  {
    resp.error=true
    resp.message="User Not Found"
    return resp
  }
  resp.data = data;
  return resp;
};
const deleteUser = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };
  resp = await _deleteUser(params, resp);
  return resp;
};


module.exports = {addUser,listUser,detailUser,deleteUser};
