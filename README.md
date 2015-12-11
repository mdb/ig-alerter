# ig-alerter

Text message subscription to a user's Instagram posts!

## Dependencies

* an [Instagram](https://www.instagram.com/developer/clients/manage/) client id & client secret
* a [Twilio](https://www.twilio.com/) account SID & a Twilio account auth token
* a Twilio phone number that can send text messages
* The [Instagram ID](http://jelled.com/instagram/lookup-user-id) of the user you'd like subscribe to
* a phone number that can receive text messages
* [Node.js](https://nodejs.org/en/)

## Example

For example, to receive a text message each time [jinxedstore](https://www.instagram.com/jinxedstore/) posts new Instagram media...

Clone and enter the repo:

```
git clone https://github.com/mdb/ig-alerter.git && cd ig-alerter
```

Establish the following in a `.env` file:

```
IG_CLIENT_ID=<your IG client ID>
IG_CLIENT_SECRET=<your IG client secret>
IG_USER_ID=<the id of the user you'd like to follow>
CALLBACK_URL=http://<this app's public URL>/alert
TWILIO_ACCOUNT_SID=<your Twilio account SID>
TWILIO_AUTH_TOKEN=<your Twilio auth token>
TWILIO_PHONE_NUMBER=<your Twilio "from" number>
PHONE_NUMBER=<the number that should receive alerts>
```

Install npm dependencies:

```
npm install
```

Run the server:

```
npm start
```

### How do I develop locally if this requires a public URL?

On startup, the application will attempt to to perform the necessary
IG handshake with Instagram's [subscriptions API](https://www.instagram.com/developer/subscriptions/).
This requires your `ig-alerter` -- and its `CALLBACK_URL` -- to be publicly available to Instagram.

[ngrok](https://ngrok.com/) can be used to expose your local development environment to a public URL.

For example, to make port 3000 publicly available via `ngrok`:

```
ngrok 3000
```

This prints output like the following:

```
ngrok                                                  (Ctrl+C to quit)

Tunnel Status                 online
Version                       1.7/1.7
Forwarding                    https://4d6812ed.ngrok.com -> 127.0.0.1:3
Forwarding                    http://4d6812ed.ngrok.com -> 127.0.0.1:30
Web Interface                 127.0.0.1:4040
# Conn                        1
Avg Conn Time                 11.07ms



HTTP Requests
-------------

GET /alert                200 OK
```

The ngrok `Forwarding` URL can be used to set to the value of your `CALLBACK_URL` in your `.env` file:

```
...
CALLBACK_URL=https://4d6812ed.ngrok.com/alert
...
```
