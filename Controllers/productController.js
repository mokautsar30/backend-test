
class ProductController {
    static async addProduct(req, res) {
        try {
            res.send("postAdd")
        } catch (error) {
            res.send(error)
        }
    }
    static async viewProduct(req, res) {
        try {
            res.send("postview")
        } catch (error) {
            res.send(error)
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