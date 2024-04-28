const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username) {
        throw { name: "UsernameIsRequired" };
      }
      if (!password) {
        throw { name: "PasswordIsRequired" };
      }

      const user = await User.findOne({
        where: { username },
      });
      if (!user) {
        throw { name: "UserNotExist" };
      }

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "PasswordInvalid" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token, id: user.id });
      // console.log(user.id);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server Error", error: error.name });
    }
  }

  static async register(req, res) {
    try {
      const { username, email, role, password } = req.body;

      const user = await User.create({
        username,
        email,
        role,
        password,
      });

      res.status(201).json({
        id: user.id,
        username: user.username,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server Error" });
    }
  }
}

module.exports = UserController;
