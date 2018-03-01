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
  title: {type: String, minLength: 2},
  writer: {type: String, minLength: 2},
  artist: {type: String, minLengthL: 2},
  image: {type: String, pattern: /https?:\/\/.+/},
  synopsis: {type: String, maxLength: 600},
  charactersAppeared: [{type: String}],
  comments: [commentSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User'}
});

schema.methods.isOwnedBy = function(user){
  return this.user && user._id.equals(this.user._id);
};

schema
  .virtual('avgRating')
  .get(function getAvgRating() {
    if(this.comments.length === 0) return 'N/A';
    const ratings = this.comments.map(comment => comment.rating);
    return Math.round(((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length) * 2) / 2);
  });

module.exports = mongoose.model('Novel', schema);
