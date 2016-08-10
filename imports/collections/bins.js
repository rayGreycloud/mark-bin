import { Mongo } from 'meteor/mongo';

Meteor.methods({
  //
  'bins.insert': function() {
    // create new bin and save to db
    return Bins.insert({
      createdAt: new Date(),
      content: '',
      sharedWith: [],
      ownerId: this.userId
    });
  },
  // Remove particular bin from BinsList
  'bins.remove': function(bin) {
    // remove bin associated with clicked button
    return Bins.remove(bin);
  },
  // To update text in BinsEditor
  'bins.update': function(bin, content) {
    // find bin with bin._id and set content to (new) content
    return Bins.update(bin._id, { $set: { content } });
  },
  // Add authorized user to BinsShare
  'bins.share': function(bin, email) {
    // find bin with bin._id and push email into sharedWith array
    return Bins.update(bin._id, { $push: { sharedWith: email }});
  }
});

export const Bins = new Mongo.Collection('bins');
