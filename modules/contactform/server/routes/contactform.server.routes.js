'use strict';
 var mail=require('../controllers/contactform.server.controller');
module.exports = function(app) {
  // Routing logic   
  // ...
  app.route('/contactform').post(mail.sendMail);
};
