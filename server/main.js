import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import "./../imports/api/users";
import { Links } from "./../imports/api/links";
import "./../imports/startup/simple-schema-configuration";
Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {    
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    if (link) {
      res.statusCode = 302;
      Meteor.call('links.updateVisitedCount',_id);
      res.setHeader("Location", link.url);
      res.end();
    } else {
      next();
    }
  });
});
