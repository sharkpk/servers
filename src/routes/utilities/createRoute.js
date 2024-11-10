const { authenticate } = require("../../middlewares/authentication");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const create_route = ({
  router = undefined,
  route = undefined,
  auth_enable = false,
  get_method = undefined,
  post_method = undefined,
  put_method = undefined,
  delete_method = undefined,
} = {}) => {
  if (router !== undefined || route !== undefined) {
    let args = [route];
    if (auth_enable) {
      args.push(authenticate);
    }
    args.push(upload.single("image"));
    if (get_method) {
      return router.get(...args, get_method);
    }

    if (post_method) {
      return router.post(...args, post_method);
    }

    if (put_method) {
      return router.put(...args, put_method);
    }

    if (delete_method) {
      return router.delete(...args, delete_method);
    }
  }
};

module.exports = {
  create_route,
};
