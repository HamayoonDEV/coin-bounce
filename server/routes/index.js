const express = require("express");

const blogController = require("../controller/blogContoller");
const controller = require("../controller/authcontroller");
const commentController = require("../controller/commentController");
const auth = require("../middleware/auth");

const router = express.Router();

//user
//register
router.post("/register", controller.register);

//login
router.post("/login", controller.login);

//logout
router.post("/logout", auth, controller.logout);

//refresh
router.get("/refresh", controller.refresh);

//blog
//CRUD
//create post
router.post("/blog", auth, blogController.create);
//get All
router.get("/blog/all", auth, blogController.getAll);
//get blog by id
router.get("/blog/:id", auth, blogController.getById);
//update post
router.put("/blog", auth, blogController.update);
//delete post
router.delete("/blog/:id", auth, blogController.delete);
//Read post by id

//comment
//create comment
router.post("/comment", auth, commentController.create);
//get comment
router.get("/comment/:id", auth, commentController.getById);

module.exports = router;
