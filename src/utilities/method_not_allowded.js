const status_code_list =require('./status_code')
module.exports.METHOD_NOT_ALLOWDED = (req, res) => {
    res.status(405).json(status_code_list[405]);
  };