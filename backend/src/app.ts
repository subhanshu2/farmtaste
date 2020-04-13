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
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

// Global Middleware(s)

/**
 * Primary app routes.
 */

// AUTH
app.post("/generate-otp", errorHandler(UserController.generateOtp));
app.post("/signup", errorHandler(UserController.signup));
app.post("/login", errorHandler(UserController.authenticate));


// LEADER
app.get("/me", [userMiddleware], errorHandler(UserController.me));
app.put("/me", [userMiddleware], errorHandler(UserController.updateMe));
app.delete("/me", [userMiddleware], errorHandler(UserController.deleteMe));


// ADDRESSES
app.post("/address", upload.single("image"), errorHandler(AddressController.addAddresses));
app.get("/cities", errorHandler(AddressController.listCities));
app.get("/locations", errorHandler(AddressController.listLocations));
app.get("/areas", errorHandler(AddressController.listAreas));

// // MEMBERS
// app.put("/members/:memberId([0-9]+)", [userMiddleware], errorHandler(UserController.updateMember));
// app.delete("/members/:memberId([0-9]+)", [userMiddleware], errorHandler(UserController.deleteMember));
//
// // TEAM
// app.post("/teams", [userMiddleware], errorHandler(TeamController.showTeam));
// app.put("/teams", [userMiddleware], errorHandler(TeamController.updateMyTeam));
// app.put("/teams/:teamId([0-9]+)", [userMiddleware], errorHandler(TeamController.updateTeam));
// app.get("/teams", [userMiddleware], errorHandler(TeamController.listTeams));
//
// // ATTACHMENT
// app.post("/attachments", [userMiddleware], errorHandler(AttachmentController.createAttachment));
// app.delete("/attachments/:attachmentId([0-9]+)", [userMiddleware], errorHandler(AttachmentController.deleteAttachment));

app.get("*", (req, res) => {
  res.send({ data: "Works" });
});


export default app;
