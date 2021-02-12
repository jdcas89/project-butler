import { User, UserModel } from '../../model/user';

export const getUsersByIds = async (ids: string[]) => {
  return UserModel.find({ id: { $in: ids } })
    .lean()
    .exec();
};

export const getUserById = async (id: string) => {
  return UserModel.findOne({ id }).lean().exec();
};

export const createUser = async (user: User) => {
  const newUser = new UserModel(user);
  return await newUser.save();
};
