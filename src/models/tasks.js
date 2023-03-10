import mongoose, { Schema } from 'mongoose';

const tasks = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    completed_at: {
      type: Date,
      default: null
    }
  }, { _id: true, timestamps: true, collection: 'tasks' }
);

const model = mongoose.model('tasks', tasks);
export default model;
