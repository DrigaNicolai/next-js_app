import User from "@models/user";

export const getUsers = async () => {
  /*const users = await User.find({}).populate('role_id');

  return users;*/

  return User.find({}).populate('role_id');
};