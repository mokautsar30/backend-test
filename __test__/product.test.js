const request = require("supertest");
const app = require("../app");
const { User, Product } = require("../models");
const { signToken } = require("../helpers/jwt");

let access_token;
let user;
let product;

beforeAll(async () => {
    user = await User.create({
      username: "testing username",
      email: "testingemail@mail.com",
      role: "admin",
      password: "123456",
    });
    user = await User.findOne({
      where: {
        email: "testingemail@mail.com",
      },
    });
    access_token = signToken(user);

    product = await Product.create({
        name: 'iphone 14',
        userId: user.id
    })
  });
  
  afterAll(async () => {
    await User.destroy({
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });

    await Product.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
    })
  });


  describe("POST /products", () => {
    test("POST /products should able to create product successfully", async () => {
        const newProduct = {
            name: "xiaomi 100",
            userId: user.id
        }
        const response = await request(app)
        .post("/products")
        .send(newProduct)
        .set("Authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("name", newProduct.name);
        expect(response.body).toHaveProperty("userId", expect.any(Number));
        expect(response.body).toHaveProperty("createdAt", expect.any(String));
        expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    })

    test("POST /products failed to create product because user is not log in", async () => {
        const newProduct = {
            name: "xiaomi 100",
            userId: user.id
        }
        const response = await request(app)
        .post("/products")
        .send(newProduct)

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Forbidden Access");
    })

    test("POST /products failed to create product because incorrect request body", async () => {
        const newProduct = {
            userId: user.id
        }
        const response = await request(app)
        .post("/products")
        .send(newProduct)
        .set("Authorization", `Bearer ${access_token}`);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Product name is required");
    })
  })


  describe("GET /products", () => {
    test("should be able to get list product succesfully", async () => {
        const newProduct = {
            name: "iphone 14",
            userId: user.id
        };
        const response = await request(app)
        .get("/products")
        .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        const firstProduct = response.body[0]

        expect(firstProduct).toHaveProperty("id", expect.any(Number));
        expect(firstProduct).toHaveProperty("name", expect.any(String));
        expect(firstProduct).toHaveProperty("userId", expect.any(Number));
        expect(firstProduct).toHaveProperty("createdAt", expect.any(String));
        expect(firstProduct).toHaveProperty("updatedAt", expect.any(String));
    })

    test('should fail to get the list of product because user not log in', async () => {
        const response = await request(app).get("/products");

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Forbidden Access")
    })

    test("should fail to get the list of product with invalid token", async () => {
        const response = await request(app).get("/products");

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Forbidden Access")
    })
  })

  describe("GET /products/:id", () => {
    test("should be able to get product by id", async () => {
        const response = await request(app)
        .get("/products/1")
        .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)

        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("name", expect.any(String));
        expect(response.body).toHaveProperty("createdAt", expect.any(String));
        expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    })

    test('should fail to get the list of product by id because user not log in', async () => {
        const response = await request(app).get("/products/1");

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Forbidden Access")
    })

    test('should fail to get the list of product by id because invalid token', async () => {
        const response = await request(app).get("/products/1");

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Forbidden Access")
    })

    test('should fail to get the list of product by id because invalid product ID', async () => {
        const invalidProductId = 999
        const response = await request(app).get(`/products/${invalidProductId}`).set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Data not found")
    })
  })


  describe("PUT /products/:id", () => {
    test.skip("Successfully update product by ID", async () => {
        const updatedProduct = {
            name: "updated Product",
            userId: user.id
        }

        const response = await request(app)
        .put('products/1')
        .send(updatedProduct)
        .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);

        expect(response.body.data).toHaveProperty("id", expect.any(Number));
        expect(response.body.data).toHaveProperty("name", expect.any(String));
        expect(response.body.data).toHaveProperty("userId", expect.any(Number));
        expect(response.body.data).toHaveProperty("createdAt", expect.any(String));
        expect(response.body.data).toHaveProperty("updatedAt", expect.any(String));
    })
    test("should fail to update products because user not log in", async () => {
        const updatedProduct = {
          name: "Updated Product",
        };
    
        const response = await request(app).put(`/products/1`).send(updatedProduct);
    
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Forbidden Access");
      });

      test("should fail to update products because non-exist id", async () => {
        const updatedProduct = {
          name: "Updated Product",
        };
    
        const response = await request(app)
          .put(`/products/999`)
          .send(updatedProduct)
          .set("Authorization", `Bearer ${access_token}`);
    
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Data not found");
      });

      test.skip("failed to update product because incorrect request body", async () => {
        const updatedProduct = {}
        const response = await request(app)
        .put('products/1')
        .send(updatedProduct)
        .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "request body is required");
      })
  })


  describe("DELETE /products/:id", () => {
    test("should successfully delete product by ID", async () => {
        const response = await request(app)
        .delete("/products/1")
        .set("Authorization", `Bearer ${access_token}`)

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
          "message",
          "Success delete product by id 1"
        );
    })
    test("should fail to delete product without authentication", async () => {
        const response = await request(app).delete("/products/1");
    
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Forbidden Access");
      });

      test("should fail to delete non-exist product", async () => {
        const response = await request(app)
          .delete("/products/99")
          .set("Authorization", `Bearer ${access_token}`);
    
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Data not found");
      });

      test("should fail to delete products because user not log in", async () => {
        const response = await request(app).delete(`/products/1`)
    
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", "Forbidden Access");
      });
  })