const {Product, User} = require("../models")
class ProductController {
    static async addProduct(req, res) {
        try {
            const product = req.body;
            product.userId = req.user.id
            const data = await Product.create(product);
            // console.log(product);
            res.status(201).json(data)
        } catch (error) {
            console.log(error);
            res.status(403).json({message: "Forbidden Access", error: error.message})
        }
    }
    static async viewProduct(req, res) {
        try {
            const data = await Product.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }
    static async editProduct(req, res) {
        try {
            res.send("postedit")
        } catch (error) {
            res.send(error)
        }
    }
    static async deleteProduct(req, res) {
        try {
            res.send("postdelete")
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = ProductController