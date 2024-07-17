const {
  find_employee_by_id,
  add_employee,
  find_all_employee,
  find_and_delete_employee,
  find_employee,
} = require("../DAL/employee");
const { find_user_by_email, add_user, find_and_delete_user } = require("../DAL/user");
const {
  get_params_data,
  get_query_data,
} = require("../utilities/get_request_data");

//********************************************{Add Employee}********************************************************/
const _addEmployee = async (body, resp) => {
  let user = await find_user_by_email(body.email);
  if (user) {
    resp.error = "Email Alreay axist";
    resp.message = "Email Alreay axist";
    return resp;
  }
  user = await add_user(body);
  if (!user) {
    resp.error = "Somthing Went Wrong";
    resp.message = "Somthing Went Wrong";
    return resp;
  }

  let employee = await add_employee({ ...body, user_id: user._id });

  if (!employee) {
    resp.error = "Somthing Went Wrong";
    resp.message = "Somthing Went Wrong";
    return resp;
  }

  user = user.toObject();
  employee = employee.toObject();
  delete user.password;
  resp.data = { ...employee, user };
  return resp;
};
const addEmployee = async (body) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _addEmployee(body, resp);
  return resp;
};

//********************************************{Detail Employee}********************************************************/
const _editEmployee = async (body,params, resp) => {
  const { _id } = get_params_data(params);
  
  let employee = await find_employee(_id);

  if (employee ) {
    employee.first_name=body.first_name
    employee.last_name=body.last_name
    employee.save()
    resp.data = employee;

    return resp;
  }
  resp.error = "Employee Not Found";
  resp.message = "Employee Not Found";
  return resp;
};
const editEmployee = async (body,params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _editEmployee(body,params, resp);
  return resp;
};
//********************************************{Detail Employee}********************************************************/
const _detailEmployee = async (params, resp) => {
  const { _id } = get_params_data(params);
  
  let employee = await find_employee_by_id(_id);

  if (employee?.length > 0) {
    resp.data = employee?.[0];
    return resp;
  }
  resp.error = "Employee Not Found";
  resp.message = "Employee Not Found";
  return resp;
};
const detailEmployee = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _detailEmployee(params, resp);
  return resp;
};

//********************************************{List Employee}********************************************************/
const _listEmployee = async (query, resp) => {

  let employee = await find_all_employee(get_query_data(query));

  if (!employee) {
    resp.error = "Employee Not Found";
    resp.message = "Employee Not Found";
    return resp;
  }
  resp.data = employee;
  return resp;
};
const listEmployee = async (query) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _listEmployee(query, resp);
  return resp;
};

//********************************************{Delete Employee}********************************************************/
const _deleteEmployee = async (params, resp) => {
  const { _id } = get_params_data(params);
  
  let employee = await find_and_delete_employee(_id);

  if (!employee) {
    resp.error = "Employee Not Found";
    resp.message = "Employee Not Found";
    return resp;
  }

  let user = await find_and_delete_user(employee.user_id);
  if (!user) {
    resp.error = "Employee Not Found";
    resp.message = "Employee Not Found";
    return resp;
  }
  resp.data = employee;
  return resp;
};
const deleteEmployee = async (params) => {
  let resp = {
    error: false,
    message: "",
    data: {},
  };

  resp = await _deleteEmployee(params, resp);
  return resp;
};

module.exports = { addEmployee,editEmployee, detailEmployee, listEmployee ,deleteEmployee};
