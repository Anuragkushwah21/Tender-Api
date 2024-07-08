const express = require("express");
const UserController = require("../controller/UserController");
const AdminController = require("../controller/AdminController");
// const CategoryController = require("../controller/CategoryController");
// const ProductController=require("../controller/ProductController")
// const checkUserAuth = require("../middleware/Auth");
const route = express.Router();


route.post("/userinsert", UserController.userinsert);
route.post("/verifylogin", UserController.verifylogin);
route.get("/getDisplay", UserController.getDisplay);
route.post("/userbid", UserController.userbid);
route.get("/bidDisplay", UserController.bidDisplay);
route.get("/bidDetail/:id", UserController.bidDetail);

//admin controller
route.post("/tenderinsert", AdminController.tenderinsert);
route.get("/tenderDisplay", AdminController.tenderDisplay);
route.post("/tenderDelete/:id", AdminController.tenderDelete);
route.get("/getSingleTender/:id", AdminController.getSingleTender);
route.post("/getTenderById/:id", AdminController.getSingleTender);
route.get("/tenderUpdate/:id", AdminController.tenderUpdate);


module.exports = route;
