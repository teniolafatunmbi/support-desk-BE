import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  first_name: string;
  last_name: string;
  password?: string;
  email: string;
  isAdmin?: boolean;
}

const userSchema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: [true, 'First name is required'],
    },
    last_name: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Checks if the password matches the user's password
 * @param password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
