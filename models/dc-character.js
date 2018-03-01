const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  maintitle: {type: String, minlength: 2},
  content: {type: String, minlength: 2, required: true},
  rating: {type: Number, min: 1, max: 5, required: true},
  moderated: {type: Boolean, default: false},
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

commentSchema
  .virtual('formattedDate')
  .get(function getFormattedDate() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[this.createdAt.getMonth()] + '-' + this.createdAt.getFullYear();
  });

commentSchema.methods.isOwnedBy = function(user){
  return this.user._id && user._id.equals(this.user._id);
};

const schema = new mongoose.Schema({
  name: {type: String, minLength: 2},
  alias: { type: String, minLength: 2},
  status: {type: String, minLength: 2},
  powers: { type: String, maxLength: 500},
  thumbnailImage: {type: String, pattern: /^http/},
  image: {type: String, pattern: /https?:\/\/.+/},
  comments: [commentSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

schema.methods.isOwnedBy = function(user){
  return this.user && user._id.equals(this.user._id);
};

module.exports = mongoose.model('Character', schema);
