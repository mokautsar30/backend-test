const { Product, User } = require("../models");
class ProductController {
  static async addProduct(req, res) {
    try {
      const product = req.body;
      product.userId = req.user.id;
      const data = await Product.create(product);
      // console.log(product);
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res
        .status(403)
        .json({ message: "Forbidden Access", error: error.message });
    }
  }
  static async viewProduct(req, res) {
    try {
      const data = await Product.findAll();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async editProduct(req, res) {
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
      console.log(error);
    }
  }
  static async deleteProduct(req, res) {
    try {
      res.send("postdelete");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ProductController;
