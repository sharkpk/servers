
const catch_validation_errors = (res, err) => {
  if (err.name === "ValidationError") {
    let errors = {};
    err.inner.map((e) => {
      errors[e.path] = e.errors[0];
    });
    return res.status(400).json({
      status: 400,
      error: errors,
      messages: "Validation Error",
    });
  }

  res.status(500).json({
    message:err.message
  });
};

module.exports = catch_validation_errors;
