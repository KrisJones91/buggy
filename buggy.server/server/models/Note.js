import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Note = new Schema({
  body: { type: String, required: true },
  creatorId: { type: String, required: true },
  bugId: { type: String, ref: 'Bug', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

Note.virtual('bug', {
  localField: 'bugId',
  ref: 'Bug',
  foreignField: '_id',
  justOne: true
})

export default Note
