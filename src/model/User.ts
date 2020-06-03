import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const schema = mongoose.Schema;
const userSchema = new schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  friendList: {
    type: Array,
    default: []
  },
  friendRequests: {
    type: Array,
    default: []
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.hashPassword = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
}

export default mongoose.model('users', userSchema);