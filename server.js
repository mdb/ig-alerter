import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import Instagram from 'instagram-node-lib';
import dotenv from 'dotenv';
import Twilio from 'twilio';

dotenv.load();

let twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
    port = process.env.PORT || 3000,
    app = express(),
    server = http.Server(app),
    sendMessage = (data) => {
      let username = data[0].user.username,
          link = data[0].link;

      twilio.sendMessage({
        to: process.env.PHONE_NUMBER,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: 'New post from ' + username + ':\n' + link
      }, (err, resp) => {
        if (err) console.log(err);

        console.log(resp);
      });
    };

Instagram.set('client_id', process.env.IG_CLIENT_ID);
Instagram.set('client_secret', process.env.IG_CLIENT_SECRET);

Instagram.users.subscribe({
  object: 'user',
  object_id: process.env.IG_USER_ID,
  aspect: 'media',
  callback_url: process.env.CALLBACK_URL,
  type: 'subscription'
});

app.use(bodyParser.json());

app.get('/alert', (req, res) => {
  Instagram.subscriptions.handshake(req, res);
});

app.post('/alert', (req, res) => {
  res.send();
  Instagram.users.recent({
    user_id: req.body[0].object_id,
    complete: sendMessage
  });
});

server.listen(port);

console.log('ig-alerter listening on port ' + port);
