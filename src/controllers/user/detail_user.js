const {  detailUser } = require("../../services/user");

const detail_user = async (req, res) => {
  try {
      const { error, message, data } = await detailUser(req.params);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
        });
      }

      res.status(200).json({
        code: 200,
        message: "User Detail",
        data
      });
    
  } catch (error) {
    res.status(400).send({status:400,message:error.message});
  }
};

module.exports = detail_user;
