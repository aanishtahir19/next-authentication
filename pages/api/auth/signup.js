const UserModel = require('../../../Models/UserModel');

export default async (req, res) => {
  const { email, password, role } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(400).json({
      message: 'User already exists',
    });
  } else {
    const newUser = new UserModel({
      email,
      password,
      role,
    });
    await newUser.save();
    res.status(200).json({
      message: 'User created successfully',
    });
  }
};
