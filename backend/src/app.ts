import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import * as _ from "lodash";
import { dbService } from "./services/db.service";
import { ENV_APP_PORT_REST } from "./util/secrets.util";
import { userService } from "./services/entities/user.service";
// import { cryptService } from "./services/factories/crypt.service";
// import { jwtService } from "./services/factories/jwt.service";
// import { validatorService } from "./services/factories/validator.service";
import { mattermostService } from "./services/mattermost.service";
// import { s3Service } from "./services/factories/s3.service";
// import { snsHeaderMiddleware } from "@devslane/sns-service-node";
// import { snsService } from "./services/factories/sns.service";
import { UserController } from "./controllers/user.controller";
import { userMiddleware } from "./middlewares/user.middleware";
import { User } from "./models/user.model";
import { errorHandler } from "./handlers/error-handler";
import { upload } from "./services/factories/multer.service";
import { AddressController } from "./controllers/address.controller";
import { ProductController } from "./controllers/product.controller";
import { RateController } from "./controllers/rate.controller";
// import { userMiddleware } from "./middlewares/user.middleware";


// Create Express server
const app = express();

// Entities
userService;

// Factories
// cryptService;
// jwtService;
// s3Service;
// validatorService;
// snsService;

// Others
dbService;
mattermostService;

// Express configuration
app.set("port", process.env.PORT || ENV_APP_PORT_REST);
// app.use(snsHeaderMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Setup
const allowedOrigins = [
  "D:/init20",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost:4200",
  "http://localhost:5000",
  "http://ec2-13-234-230-119.ap-south-1.compute.amazonaws.com:3000"
];

app.use(cors({
  origin : (origin, callback) => {
    if (!origin || _.includes(allowedOrigins, origin)) {
      callback(undefined, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: [
    "GET",
    "HEAD",
    "PUT",
    "PATCH",
    "POST",
    "DELETE"
  ]
}));
app.options("*");

// Static Public Content
app.use("/public", express.static("./public", { maxAge: 31557600000 }));

// Global Middleware(s)

/**
 * Primary app routes.
 */

// AUTH
app.post("/generate-otp", errorHandler(UserController.generateOtp));
app.post("/signup", errorHandler(UserController.signup));
app.post("/login", errorHandler(UserController.authenticate));


// USER
app.get("/me", [userMiddleware], errorHandler(UserController.me));
app.put("/me", [userMiddleware], errorHandler(UserController.updateMe));
app.delete("/me", [userMiddleware], errorHandler(UserController.deleteMe));


// ADDRESSES
app.post("/address", upload.single("image"), errorHandler(AddressController.addAddresses));
app.delete("/address/:addressId([0-9]+)", errorHandler(AddressController.deleteAddress));
app.get("/cities", errorHandler(AddressController.listCities));
app.get("/locations/:cityId([0-9]+)", errorHandler(AddressController.listLocations));
app.get("/areas/:locationId([0-9]+)", errorHandler(AddressController.listAreas));

// CATEGORY
app.get("/productCategories", errorHandler(ProductController.listProductCategories));
app.post("/productCategories", errorHandler(ProductController.createProductCategory));
app.put("/productCategory/:categoryId([0-9]+)", errorHandler(ProductController.updateProductCategory));
app.delete("/productCategory/:categoryId([0-9]+)", errorHandler(ProductController.deleteProductCategory));


// SUB CATEGORY
app.get("/productSubCategories/:categoryId([0-9]+)", errorHandler(ProductController.listProductSubCategories));
app.post("/productSubCategories", upload.single("image"), errorHandler(ProductController.createProductSubCategory));
app.put("/productSubCategory/:subCategoryId([0-9]+)", upload.single("image"), errorHandler(ProductController.updateProductSubCategory));
app.delete("/productSubCategory/:subCategoryId([0-9]+)", errorHandler(ProductController.deleteProductSubCategory));


// PRODUCT
app.get("/products/:subCategoryId([0-9]+)", [userMiddleware], errorHandler(ProductController.listProducts));
app.post("/products", upload.single("image"), errorHandler(ProductController.createProduct));
app.put("/product/:productId([0-9]+)", upload.single("image"), errorHandler(ProductController.updateProduct));
app.delete("/product/:productId([0-9]+)", errorHandler(ProductController.deleteProduct));

// RATE
app.post("/rates", errorHandler(RateController.addRate));

app.get("*", (req, res) => {
  res.send({ data: "Works" });
});


export default app;
