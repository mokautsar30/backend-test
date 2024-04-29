const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "EmailIsRequired" };
      }

      if (!password) {
        throw { name: "PasswordIsRequired" };
      }

      const user = await User.findOne({
        where: { email },
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
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, role, password } = req.body;

      if (!password) {
        throw { name: "PasswordIsRequired" };
      }

      if (!username) {
        throw { name: "UsernameIsRequired" };
      }

      const existEmail = await User.findOne({
        where: {
          email: {
            [Op.iLike]: email,
          },
        },
      });

      if (existEmail) {
        throw { name: "ExistingEmail" };
      }

      const user = await User.create({
        username,
        email,
        role,
        password,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
