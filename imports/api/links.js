import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import shortid from "shortid";


export const Links = new Mongo.Collection("links");

if (Meteor.isServer) {
  Meteor.publish("links", function() {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  "links.insert"(url) {
    if (!this.userId) {
      throw new Meteor.Error("invalid user", "User doesnt exist");
    }

    new SimpleSchema({
      url: {
        type: String,
        label: "Your link",
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });    
    
    Links.insert({ _id:shortid.generate(), url, userId: this.userId, visible:true, visitedCoun:0, lastVisited:null });
  },
  'links.setVisibility'(_id,visible){
    if(!this.userId){
      throw new Meteor.Error(400,'User not logged in');
    }
    new SimpleSchema({
      visible:{
        type:Boolean        
      },
      _id:{
        type:String,
        min:1
      }
    }).validate({visible,_id});

    Links.update({_id},{$set:{visible}});
  },
  'links.updateVisitedCount'(_id){
    new SimpleSchema({
          _id:{
          type:String
          }
    }).validate({_id});

    Links.update({_id},{$inc:{
visitedCount:1
    },$set:{lastVisited:  new Date().getTime()}});
  }

});
