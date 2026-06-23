import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  sender: string;
  recipient: string;
  text: string;
  imageUrl?: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  edited?: boolean;
  forwarded?: boolean;
  replyToId?: string;
  replyToSender?: string;
  replyToText?: string;
  reactions?: { username: string; emoji: string }[];
}

const MessageSchema: Schema = new Schema({
  sender: { type: String, required: true, index: true },
  recipient: { type: String, required: true, index: true },
  text: { type: String },
  imageUrl: { type: String },
  time: { type: String, required: true },
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
  edited: { type: Boolean, default: false },
  forwarded: { type: Boolean, default: false },
  replyToId: { type: String },
  replyToSender: { type: String },
  replyToText: { type: String },
  reactions: { type: [{ username: String, emoji: String }], default: [] }
}, {
  timestamps: true
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
