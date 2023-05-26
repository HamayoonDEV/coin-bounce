const Joi = require("joi");
const User = require("../models/user");
const UserDTO = require("../dto/user");
const bcrypt = require("bcryptjs");
const JWTservice = require("../services/JWTservice");
const RefreshToken = require("../models/token");
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;

const controller = {
  async register(req, res, next) {
    //1. validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = userRegisterSchema.validate(req.body);
    //2.if error in validation -> return error via middleware
    if (error) {
      return next(error);
    }
    //3.if email or username is already registered -> return an error
    const { username, name, email, password } = req.body;

    try {
      const emailInUse = await User.exists({ email });
      const usernameInUse = await User.exists({ username });
      if (emailInUse) {
        const error = {
          status: 409,
          message: "email already registered, use another email",
        };
        return next(error);
      }

      if (usernameInUse) {
        const error = {
          status: 409,
          message: "username is already taken, choose another username",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    //if email is not already registered
    //4.password hash
    const hashedPassword = await bcrypt.hash(password, 10);
    //5.store data in db
    let accessToken;
    let refreshToken;
    let user;

    try {
      const userToRegister = new User({
        username: username,
        name: name,
        email: email,
        password: hashedPassword,
      });
      user = await userToRegister.save();

      //token generation
      accessToken = JWTservice.signAccessToken({ _id: user._id }, "30m");
      refreshToken = JWTservice.signRefreshToken({ _id: user._id }, "60m");
    } catch (error) {
      return next(error);
    }
    //Store refreshToken in db
    await JWTservice.storeRefreshToken(refreshToken, user._id);
    // send tokens in cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    //6.response send
    const userDto = new UserDTO(user);
    return res.status(201).json({ user: userDto, auth: true });
  },
  async login(req, res, next) {
    //1.validate user input
    //2.if validation error -> return error
    //3.match username and password
    //4.response

    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern).required(),
    });
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { username, password } = req.body;
    let user;
    try {
      //1. match username
      user = await User.findOne({ username });

      if (!user) {
        const error = {
          status: 401,
          message: "invalid username",
        };
        return next(error);
      }
      //2.match password
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        const error = {
          status: 401,
          message: "invalid password",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    const accessToken = JWTservice.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = JWTservice.signRefreshToken({ _id: user._id }, "60m");
    // update refreshToken in database
    try {
      await RefreshToken.updateOne(
        {
          _id: user._id,
        },
        {
          token: refreshToken,
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      return next(error);
    }

    //set cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    const userDto = new UserDTO(user);
    return res.status(200).json({ user: userDto, auth: true });
  },
  async logout(req, res, next) {
    //1.delete refresh token from db
    const { refreshToken } = req.cookies;
    try {
      await RefreshToken.deleteOne({
        token: refreshToken,
      });
    } catch (error) {
      return next(error);
    }
    //delete cookie
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    //2.response
    res.status(200).json({ user: null, auth: false });
  },

  async refresh(req, res, next) {
    //1.get refreshtoken from cookies
    const originalRefreshToken = req.cookies.refreshToken;
    //2.verify refreshToken
    let id;
    try {
      id = JWTservice.verifyRefreshToken(originalRefreshToken);
    } catch (e) {
      const error = {
        status: 401,
        message: "unauthrized",
      };

      return next(error);
    }
    try {
      const match = RefreshToken.findOne({
        _id: id,
        token: originalRefreshToken,
      });

      if (!match) {
        const error = {
          status: 401,
          message: "unauthorized",
        };
        return next(error);
      }
    } catch (error) {
      return next(e);
    }
    //3.genrate new token
    try {
      const accessToken = JWTservice.signAccessToken({ _id: id }, "30m");
      const refreshToken = JWTservice.signRefreshToken({ _id: id }, "60m");
      //4.udate database,return response
      await RefreshToken.updateOne({ _id: id }, { token: refreshToken });
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
    } catch (error) {
      return next(error);
    }

    const user = await User.findOne({ _id: id });

    const userDto = new UserDTO(user);
    return res.status(200).json({ user: userDto, auth: true });
  },
};

module.exports = controller;
