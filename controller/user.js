const user = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const userCheck = await user.findOne({ email });
    if (userCheck) {
      return res.status(400).json({
        error: true,
        message: "User already exists with these email.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPass = await bcrypt.hash(password, salt);
    const userDetails = await user.create({
      userName,
      email,
      password: bcryptPass,
    });

    return res.status(200).json({
      error: false,
      data: userDetails,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(400).json({ error, success: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);
    const UserDetails = await user.findOne({ email });

    if (!UserDetails) {
      return res.status(400).json({
        error: true,
        message: "Incorrect credentials",
        success: false,
      });
    }

    const passwordCheck = await bcrypt.compare(password, UserDetails.password);

    if (passwordCheck) {
      const token = JWT.sign(
        { user_id: UserDetails._id, email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );

      delete UserDetails.password;

      return res.status(200).json({ token, UserDetails, success: true });
    }
    return res
      .status(400)
      .json({ error: true, message: "Incorrect credentials", success: false });
  } catch (error) {
    return res.status(400).json({ error, success: false });
  }
};

exports.updateuserbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const updateduser = await user.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({
      error: false,
      data: updateduser,
      message: "Details updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ error, success: false });
  }
};

exports.forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userforgot = await user.findOne({ email }).select("-password");

    if (!userforgot) {
      return res
        .status(400)
        .json({ error: true, message: "Incorrect Credentials." });
    }

    JWT_DATA = {
      userId: userforgot.id,
    };

    const token = JWT.sign(JWT_DATA, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      error: false,
      token,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};


exports.resetPassword = async(req,res)=>{
   
   try {
    const {token} = req.params;
    const { password } = req.body;
    var decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    const { userId } = decoded;
    const salt = await bcrypt.genSalt(10);
    const bcryptPass = await bcrypt.hash(password, salt);
    await user.findByIdAndUpdate(
        userId,
        { password: bcryptPass },
        { new: true }
      );
  
      return res
        .status(200)
        .json({ error: false, message: "Password Reset Successfully." });
   
  } catch (error) {
    return res.status(400).json({ error });
   
   
  }
}
