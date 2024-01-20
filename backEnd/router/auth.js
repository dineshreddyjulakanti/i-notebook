const express = require("express");
const routers = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwt_sec = "dineshval";
var getuser = require('../middleware/getuser')

const { body, validationResult } = require("express-validator");
// posting the user data to the data base
routers.post(
  "/",
  [
    body("name", "enter a valid name").optional().isLength({ min: 6 }),
    body("password", "enter a valid password").optional().isLength({ min: 6 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    let success=false;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      success=false;
      return res.send({ errors: result.array() });
    }
    try {
      if (await User.findOne({ email: req.body.email })) {
        success=false;
        return res.send({ message: "email already existed " });
      } else {
        const salt = await bcrypt.genSalt(10);
        const sec_pass = await bcrypt.hash(req.body.password, salt);
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: sec_pass,
        }); 
      }
      const data = {
        user: {
          id: User.id,// this gives the users id
        },
      };
      success=true;
      const jwtdata = jwt.sign(data, jwt_sec);// this sign gives u the webtoken
      console.log(jwtdata);
      res.json({success,jwtdata});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occured");
    }

    // console.log(req.body)
  }
);



//  router 2 checking if the given email is exist in the data base or not
routers.post(
  "/login",// it is used to login 
  [
    body("password", "enter a valid password").exists(),
    body("email", "Enter a valid email").isEmail()
  ],
  async (req, res) => {
    let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false

        return res.send({ errors: "Enter a valid email or password" });
      }

      const comparepassword = await bcrypt.compare(password, user.password);// it compares the password of body ka password and user(database)ka password
      if (!comparepassword) {
        success=false
        return res.send({ success,errors: "Enter a valid email or password" });
      }
      const data = {
        user: {
          id: user.id,// this gives the users id
        },
      };
      const jwtdata = jwt.sign(data, jwt_sec);// this sign gives u the webtoken
      success=true;
      res.json({ success,jwtdata});



    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server occured");

    }
  })
// rotue 3 getting the login in details getuser
routers.post(
  "/getuser",
  getuser,

  async (req, res) => {

    try {
      userid = req.user.id;
      const user = await User.findById(userid).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server occured");


    }
  })
module.exports = routers;
