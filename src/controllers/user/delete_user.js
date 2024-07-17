const {  deleteUser } = require("../../services/user");

const delete_user = async (req, res) => {
  try {
      const { error, message, data } = await deleteUser(req.params);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
        });
      }

      res.status(204).json({
        code: 204,
        message: "User Delted Successfully",
        data
      });
    
  } catch (error) {
    res.status(400).send({status:400,message:error.message});

  }
};

module.exports = delete_user;
