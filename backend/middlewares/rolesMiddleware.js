const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

module.exports = (rolesArr) => {
  return async function (req, res, next) {
    try {
      const { authorization = "" } = req.headers;
      const [Bearer, token] = authorization.split(" ");

      if (!token || Bearer !== "Bearer") {
        res.status(401);
        throw new Error("Not authorized");
      }

      const { data: id } = jwt.verify(token, "pizza");
      const user = await usersModel.findById(id);
      let hasRole = false;
      user.rolesArr.forEach((role) => {
        if (rolesArr.includes(role)) {
          hasRole = true;
        }

        if (!hasRole) {
          return res.status(403).json({
            message: "Forbidden",
            code: 403,
          });
        }

        next();
      });
    } catch (error) {
      return res.status(403).json({
        message: "Forbidden",
        code: 403,
      });
    }
  };
};
