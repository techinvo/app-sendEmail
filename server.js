const express = require('express');
const path = require('path');
const schedule = require('node-schedule');
const sendEmail = require('./sendEmail');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/schedule-email', (req, res) => {
  const { email, subject, message, date, time } = req.body;
  
  const [hour, minute] = time.split(':').map(Number);
  const [year, month, day] = date.split('-').map(Number);

  const dateTime = new Date(year, month - 1, day, hour, minute);

  schedule.scheduleJob(dateTime, () => {
    sendEmail(email, subject, message);
  });

  res.send('อีเมลของคุณจะถูกส่งที่ ' + dateTime.toString());
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app