var express = require('express');
var router = express.Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const CREDENTIALS = require('../credentials');
const CONFIG = require('../config');
// const {private_key} = require('../credentials.json');



const view_id = 'XXXXXXX'

let key = CREDENTIALS.private_key.split("\\n");
    key = key.join("\n");

router.post('/getEvents', function(req, res, next) {
  const {timeMin, timeMax} = req.body;
  const scopes = ['https://www.googleapis.com/auth/calendar.readonly'];
  const jwt = new google.auth.JWT({                                          
    email: CREDENTIALS.client_email,                                                    
    key: key,                                                       
    scopes                                                                         
  });
  jwt.authorize((err, token) => {
    
    const calendar = google.calendar({version: 'v3', auth: jwt});
    calendar.events.list({
      calendarId: CONFIG.email,
      timeMin: timeMin,
      timeMax: timeMax,
      maxResults: 10000,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, response) => {
      if (err) return res.status(200).send('The API returned an error: ' + err);
      const events = response.data.items;
      res.status(200).send(events);
    }) 
  })
})

router.post('/booking', function(req, res, next) {
  const {summary, location, description, start, end} = req.body;
  const attendees =[{email: CONFIG.client_email}];
  const scopes = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'];
  const jwt = new google.auth.JWT({                                          
    email: CREDENTIALS.client_email,                                                    
    key: key,                                                       
    scopes                                                                         
  });
  const reminders = {
    "useDefault": false,
    "overrides": [
      {
        "method": "email",
        "minutes": 15
      },
      {
        "method": "popup",
        "minutes": 15
      }
    ]
 }
  const event = {
    summary: summary,
    location: location,
    description: description,
    start: {
      dateTime: start
    },
    end: {
      dateTime: end
    },
    attendees: attendees,
    reminders: reminders,
    
  }
  jwt.authorize((err, token) => {
    
    const calendar = google.calendar({version: 'v3', auth: jwt});
    calendar.events.insert({
      calendarId: CONFIG.email,
      sendNotifications: true,
      resource: event
    }, (err, response) => {
      if (!response.data) return res.status(404).send('The API returned an error: ' + err);
      // console.log(response.data)
      res.status(200).send(response.data);
    })
  })
})


module.exports = router;