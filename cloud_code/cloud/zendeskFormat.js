/*
 * This Module:
 * Formats ticket according to Zendesk form specification.
 */

var zendeskFields = require('cloud/zendeskFields.js')
var foldToASCII = require('cloud/lib/fold-to-ascii.min.js')

module.exports = {
  sales: function(ticket) {
    return {
      ticket: {
        requester: {
          name: ticket.name + ' ' + ticket.last,
          email: ticket.email,
          locale_id: '2',
          user_fields: {
            mobile_mx: ticket.mobile 
          }
        },
        subject: ticket.type + ' - ' + ticket.service,
        description: ticket.type + ' - ' + ticket.service,
        ticket_form_id: zendeskFields.sales,
        custom_fields: [
          { id: zendeskFields.step, value: ticket.step },
          { id: zendeskFields.outcome, value: ticket.outcome },
          { id: zendeskFields.service, value: foldToASCII(ticket.service).replace(/\s/g, '_').toLowerCase() },
          { id: zendeskFields.company, value: ticket.company},
          { id: zendeskFields.contact, value: ticket.contact },
          { id: zendeskFields.zip, value: ticket.zip },
          { id: zendeskFields.state, value: ticket.state },
          { id: zendeskFields.municipality, value: ticket.municipality },
          { id: zendeskFields.district, value: ticket.district },
          { id: zendeskFields.street, value: ticket.street },
          { id: zendeskFields.number, value: ticket.number },
          { id: zendeskFields.apt, value: ticket.apt },
          { id: zendeskFields.building, value: ticket.building },
          { id: zendeskFields.levels, value: ticket.levels },
          { id: zendeskFields.channel, value: ticket.channel }
        ]
      }
    }
  },
  technical: function(ticket) {
    return {
      ticket: {
        requester: {
          name: ticket.name + ' ' + ticket.last,
          email: ticket.email,
          locale_id: '2',
          user_fields: {
            mobile_mx: ticket.mobile 
          }
        },
        subject: ticket.type + ' - ' + ticket.service + ' - ' + ticket.subject,
        description: ticket.message == '' ? ticket.type + ' - ' + ticket.service + ' - ' + ticket.subject : ticket.message,
        ticket_form_id: zendeskFields.technical,
        custom_fields: [
          { id: zendeskFields.technicalSubject, value: ticket.subject == 'Otro' ? 'technical_other' : foldToASCII(ticket.subject).replace(/\s/g, '_').toLowerCase() },
          { id: zendeskFields.company, value: ticket.company },
          { id: zendeskFields.service, value: foldToASCII(ticket.service).replace(/\s/g, '_').toLowerCase() },
          { id: zendeskFields.contact, value: ticket.contact },
          { id: zendeskFields.channel, value: ticket.channel }
        ]
      } 
    }
  },
  administrative: function(ticket) {
    return {
      ticket: {
        requester: {
          name: ticket.name + ' ' + ticket.last,
          email: ticket.email,
          locale_id: '2',
          user_fields: {
            mobile_mx: ticket.mobile 
          }
        },
        subject: ticket.type + ' - ' + ticket.service + ' - ' + ticket.subject,
        description: ticket.message == '' ? ticket.type + ' - ' + ticket.service + ' - ' + ticket.subject : ticket.message,
        ticket_form_id: zendeskFields.administrative,
        custom_fields: [
          { id: zendeskFields.company, value: ticket.company},
          { id: zendeskFields.service, value: foldToASCII(ticket.service).replace(/\s/g, '_').toLowerCase() },
          { id: zendeskFields.contact, value: ticket.contact },
          { id: zendeskFields.channel, value: ticket.channel }
        ]
      }
    }
  },
  contact: function(ticket) {
    return {
      ticket: {
        requester: {
          name: ticket.name + ' ' + ticket.last,
          email: ticket.email,
          locale_id: '2',
          user_fields: {
            mobile_mx: ticket.mobile 
          }
        },
        subject: ticket.type + ' - ' + ticket.subject,
        description: ticket.message,
        ticket_form_id: zendeskFields.contactForm,
        custom_fields: [
          { id: zendeskFields.contactSubject, value: ticket.subject == 'Otro' ? 'contact_other' : foldToASCII(ticket.subject).replace(/\s/g, '_').toLowerCase() },
          { id: zendeskFields.company, value: ticket.company },
          { id: zendeskFields.contact, value: ticket.contact },
          { id: zendeskFields.channel, value: ticket.channel }
        ]
      }
    }
  },
  jobs: function(ticket) {
    return {
      ticket: {
        requester: {
          name: ticket.name + ' ' + ticket.last,
          email: ticket.email,
          locale_id: '2',
          user_fields: {
            mobile_mx: ticket.mobile 
          }
        },
        subject: ticket.type + ' - ' + ticket.role,
        description: ticket.message,
        ticket_form_id: zendeskFields.jobs,
        custom_fields: [
          { id: zendeskFields.role, value: foldToASCII(ticket.role).replace(/\s/g, '_').toLowerCase() },
          { id: zendeskFields.state, value: ticket.state },
          { id: zendeskFields.contact, value: ticket.contact },
          { id: zendeskFields.education, value: foldToASCII(ticket.education) },
          { id: zendeskFields.college, value: ticket.college},
          { id: zendeskFields.collegeUrl, value: ticket.collegeUrl },
          { id: zendeskFields.masters, value: ticket.masters },
          { id: zendeskFields.mastersUrl, value: ticket.mastersUrl },
          { id: zendeskFields.phd, value: ticket.phd },
          { id: zendeskFields.phdUrl, value: ticket.phdUrl },
          { id: zendeskFields.experience, value: ticket.experience },
          { id: zendeskFields.resume, value: ticket.resume.url },
          { id: zendeskFields.channel, value: ticket.channel }
        ]
      } 
    }
  },
  unsubscribe: function(ticket) {
    return {
      ticket: {
        requester: {
          name: ticket.name + ' ' + ticket.last,
          email: ticket.email,
          locale_id: '2',
          user_fields: {
            mobile_mx: ticket.mobile 
          }
        },
        subject: ticket.type,
        description: ticket.message == '' ? ticket.type : ticket.message,
        ticket_form_id: zendeskFields.unsubscribe,
        custom_fields: [
          { id: zendeskFields.unsubscribeEmail, value: ticket.unsubscribeEmail},
          { id: zendeskFields.unsubscribeMobile, value: ticket.unsubscribeMobile},
          { id: zendeskFields.unsubscribeAddress, value: ticket.unsubscribeAddress},
          { id: zendeskFields.opposeTransfer, value: ticket.opposeTransfer},
          { id: zendeskFields.forgetMe, value: ticket.forgetMe },
          { id: zendeskFields.channel, value: ticket.channel }
        ]
      } 
    }
  }
}
