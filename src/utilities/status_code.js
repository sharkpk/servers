const status_code_list = {
  400: {
    status: 400,
    message: "Somthing went wrong.",
  },
  401: { status: 401, message: "Unauthorized" },
  402: {
    status: 402,
    message: "Payment is required to access this resource.",
  },
  403: {
    status: 403,
    message: "You do not have permission to perform this action.",
  },
  404: { status: 404, message: "Not Found" },
  405: {
    status: 405,
    message: "Http Method not allowed",
  },
  500: {
    status: 501,
    message: "An unexpected error occurred on the server.",
  },
};

module.exports = status_code_list;
