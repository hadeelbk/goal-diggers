import { Schema, Document, Model } from 'mongoose';
import { User as IBaseUser } from '../@types/model/user';
import mongoose from '../db';

export interface IUser extends IBaseUser, Document {}

const UserSchema: Schema<IUser> = new Schema ({
  userName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: {type: String, required: true},
  position: {type: String, required: true}
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;