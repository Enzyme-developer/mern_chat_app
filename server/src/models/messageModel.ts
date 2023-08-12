import mongoose, { Document, Schema, Types } from "mongoose";

interface MessageModel extends Document {
  sender: Types.ObjectId;
  content: string;
  chat: Types.ObjectId;
}

const messageSchema = new Schema<MessageModel>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const Message = mongoose.model<MessageModel>("Message", messageSchema);

export default Message;
