const UserModel = require("../model/user");
const BidModel=require("../model/userbid")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static userinsert = async (req, res) => {
    try {
      // console.log(req.body)
      const { name, email, password, confirmpassword } = req.body;
      const user = await UserModel.findOne({ email: email });
      // console.log(user)

      if (user) {
        res
          .status(401)
          .json({ status: "failed", message: "EMAIL ALREADY EXISTS" });
      } else {
        if (name && email && password && confirmpassword) {
          if (password == confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashpassword,
              confirmpassword: confirmpassword,
            });
            await result.save();
            const token = jwt.sign(
              { ID: result._id ,email:result.email },
              "anuragkushwah9669907552asdfghjkzxcvbnm"
            );
            // console.log(token);
            res.cookie("token", token);

            res.status(201).json({
              status: "success",
              message: "Login OK Report",
              token: token
            });

            res.status(201).json({
              status: "success",
              message: "Registaration successfull plz login",
            });
          } else {
            res.status(401).json({
              status: "failed",
              message: "password and confirmpassword dosenot same",
            });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "All fields are required" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (isMatched) {
            // token gen.
            const token = jwt.sign(
              { ID: user._id },
              "anuragkushwah9669907552asdfghjkzxcvbnm"
            );
            // console.log(token);
            res.cookie("token", token);

            res.status(201).json({
              status: "success",
              message: "Login OK Report",
              token: token,
              user,
            });
          } else {
            res.status(401).json({
              status: "failed",
              message: "Email pr password are not same",
            });
          }
        } else {
          res
            .status(401)
            .json({ status: "failed", message: "you are not a regis user" });
        }
      } else {
        res
          .status(401)
          .json({ status: "failed", message: "All field require" });
      }
    } catch (error) {
      console.log("error");
    }
  };
  static getDisplay = async (req, res) => {
    try {
      const data = await UserModel.find();
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
    }
  };
  static userbid = async (req, res) => {
    try {
        // console.log(myimage)
        const { companyName, bidCost,bidTime } = req.body
        const result = new BidModel({
          companyName: companyName,
          bidCost: bidCost,
          bidTime:bidTime,
        })
        await result.save()
        res.status(201)
            .json({ status: "SUCCESS", message: "Bid INSERTED SUCCESSFULL " })

    } catch (error) {
        console.error();
    }
}
  static bidDisplay = async (req, res) => {
    try {
      const getAllBid = await BidModel.find().sort({"bidCost":1});

      res.status(200).json({
        status: true,
        getAllBid,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static bidDetail = async (req, res) => {
    try {
      const BidDetail = await BidModel.findById(req.params.id);

      res.status(201).json({
        status: true,
        BidDetail,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = UserController;
