const models = require('../../db/models');
const utils = require('./lib/utils.js');
const knex = require('../../db/knex.js');

module.exports.saveComment = (text="this is a great photo", photo_id=1, profile_id=1) => {

  return models.Comment.forge({text, photo_id, profile_id})
    .save()
    .then(() => {
      models.Photo.query().where({'id': photo_id})
        .select()
        .then((data) => {
          return data[0].comment_count;
        })
        .then((commentCount) => {

          if (commentCount === null) {
            return models.Photo.forge({id: photo_id}).save({'comment_count': 1});
          } else {
            return models.Photo.forge({id: photo_id}).save({'comment_count': commentCount + 1});
          }
        });
    });
};

module.exports.getAllComments = (photoID = 1) => {

  return models.Comment.CommentQueries.getAllCommentsForPhoto(photoID)
    .then((data) => {
      return data.rows;
    });

};

module.exports.removeComment = (commentID) => {
  return models.Comment.CommentQueries.decrementCommentCount(commentID)
    .then((data) => {
      return models.Comment.CommentQueries.removeComment(commentID);
    });
};

//how to insert data:

// // Save with no arguments
// Model.forge({id: 5, firstName: "John", lastName: "Smith"}).save().then(function() { //...

// // Or add attributes during save
// Model.forge({id: 5}).save({firstName: "John", lastName: "Smith"}).then(function() { //...

// // Or, if you prefer, for a single attribute
// Model.forge({id: 5}).save('name', 'John Smith').then(function() { //...