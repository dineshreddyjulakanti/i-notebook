const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId, // it is the some foregin 
      ref: 'notes'
   },
   title: {
      type: String,
      requried: true
   },
   description: {
      type: String,
      requried: true
   },
   tag: {
      type: String,
      requried: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});
module.exports = mongoose.model('notes', NotesSchema)   