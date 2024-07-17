const { listUser } = require("../../services/user");

const list_user = async (req, res) => {
  try {
   
      const { error, message, data } = await listUser(req.query);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
        });
      }

      res.status(200).json({
        code: 200,
        message: "Users List",
        ...data
      });
    
  } catch (error) {
    res.status(400).send({status:400,message:error.message});
  }
};

module.exports = list_user;
