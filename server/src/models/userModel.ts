import mongoose, { Document, Schema } from "mongoose";
interface UserModel extends Document {
  name: string;
  email: string;
  password: string;
  picture: string;
}

const userSchema = new Schema<UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: {
      type: String,
      required: true,
      default: "https://cdn.vox-cdn.com/thumbor/f_H8VvB1IxOFujxrywFGQ_6otaw=/0x0:735x500/2000x1333/filters:focal(368x250:369x251)/cdn.vox-cdn.com/uploads/chorus_asset/file/19933026/image.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserModel>("User", userSchema);

export default User;
