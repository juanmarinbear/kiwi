/*
 * This Module:
 * Validates Sales, Technical, Administrative, Contact, Jobs and Unsubscribe classes object before sending to Zendesk.
 * Formats object according to Zendesk specification.
 * Submits object to Zendesk.
 */

var validate = require('cloud/lib/validate.min.js');
var auth = require('cloud/auth.js');

module.exports = {

  valid: function(ticket, constraints) {
    if(validate(ticket, constraints)) {
      return false; 
    } else {
      return true; 
    }
  },
  errors: function(ticket, constraints) {
    return validate(ticket, constraints);
  },
  save: function(ticket, success, error) {
    Parse.Cloud.httpRequest({
      method: 'POST',
      url: 'https://kiwinetworks.zendesk.com/api/v2/tickets.json',
      headers: auth.zendesk.headers, 
      body: ticket,
      success: function (httpResponse) {
        success(httpResponse.data); 
      },
      error: function(httpResponse) {
        error('Request failed with response code ' + httpResponse.status);
      }
    });  
  },
  update: function(zendeskId, ticket, success, error) {
    Parse.Cloud.httpRequest({
      method: 'PUT',
      url: 'https://kiwinetworks.zendesk.com/api/v2/tickets/' + zendeskId + '.json',
      headers: auth.zendesk.headers, 
      body: ticket,
      success: function (httpResponse) {
        success(httpResponse.data); 
      },
      error: function(httpResponse) {
        error('Request failed with response code ' + httpResponse.status);
      }
    });  
  }
}
