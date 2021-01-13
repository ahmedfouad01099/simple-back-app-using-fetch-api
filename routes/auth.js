const express = require("express");

const router = express.Router();

const { body } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");


router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("name").trim().not().isEmpty(),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.singup
);

router.post("/login", authController.login);


module.exports = router;
