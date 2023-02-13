const { model, Schema } = require("mongoose");

const schemaUsers = Schema({
  name: {
    type: String,
    required: [true, "db: user name is required"],
  },
  password: {
    type: String,
    required: [true, "db: password is required"],
    default: "Garry",
  },
  email: {
    type: String,
    required: [true, "db: email is required"],
  },
  token: {
    type: String,
    default: null,
  },
  roles: {
    type: Array,
    default: "USER",
    ref: "roles",
  },
});

module.exports = model("users", schemaUsers);

// ["ADMIN", "MODERATOR", "USER", "CUSTOMER", "EDITOR"]
