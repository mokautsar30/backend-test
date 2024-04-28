const { Product, User, sequelize } = require("../models");
const { Op } = require("sequelize");
class ProductController {
  static async addProduct(req, res, next) {
    try {
      const product = req.body;
      product.userId = req.user.id;
      const data = await Product.create(product);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async viewProduct(req, res, next) {
    try {
      const { search } = req.query;
      const options = {};
      if (search) {
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }
      const data = await Product.findAll(options);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async editProduct(req, res, next) {
    try {
      const foundProduct = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!foundProduct) {
        throw { name: "ErrorNotFound" };
      }

      const product = await Product.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json({
        message: `Success update product by id ${req.params.id}`,
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await Product.findOne({
        where: {
          id: productId,
        },
      });
      if (!product) {
        throw { name: "ErrorNotFound" };
      }

      await product.destroy();
      res.status(200).json({
        message: `Success delete product by id ${req.params.id}`,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
