const bcrypt = require("bcrypt");

const { find_employee_with_user_id } = require("../DAL/employee");
const { find_user_by_email } = require("../DAL/user");
const { create_jwt_token, verify_jwt_token } = require("../libs/jsonwebtoken");
const {
  add_to_session,
  delete_from_session_by_user_id,
} = require("../DAL/session");

//********************************************{login user}********************************************************/
const _login = async (body, resp) => {
  let user = await find_user_by_email(body.email);
  //   check email
  if (!user) {
    resp.error = "Invalid Email";
    resp.message = "Invalid email";
    return resp;
  }

  //   check password

  const isValidPassword = await bcrypt.compare(body.password, user.password);
  if (!isValidPassword) {
    resp.error = "Invalid Password";
    resp.message = "Invalid Password";
    return resp;
  }

  //   create token

  let employee = await find_employee_with_user_id(user._id);
  if (!employee) {
    resp.error = "Somthing Went Wrong";
    resp.message = "Somthing Went Wrong";
    return resp;
  }

  //   user to object and delete password
  user = user.toObject();
  delete user.password;

  //   employee to object
  employee = employee.toObject();

  employee = { ...employee, user };
  const token = create_jwt_token({ data: employee });
  await add_to_session(token, user._id);

  //   return response
  resp.data = { user: employee, token };
  return resp;
};
const login = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _login(body, resp);
  return resp;
};

//********************************************{logout user}********************************************************/
const _logout = async (token, resp) => {
  const decoded = verify_jwt_token({ data: token });
  if (decoded?.data?.user._id) {
    let session = await delete_from_session_by_user_id(
      decoded?.data?.user._id
    );

    if (session?.acknowledged) {
      //   return response
      resp.message = "Successfully Logout";
      return resp;
    }
  }

  resp.error = "Somthing Went Wrong";
  resp.message = "Somthing Went Wrong";
  return resp;
};
const logout = async (token) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _logout(token, resp);
  return resp;
};

module.exports = { login, logout };
