# Simple Email Server

This is a small node project that listens to requests sent to `/mail` and dispatches the emails using `node-mailer`.

### How To Use

1 - Add the SMTP Config to `routes.js`

```js
// line 12
const smtpConfig = {
  host: "", //could be smtp.gmail.com or any other smtp you like
  secure: true, // true for 465, false for other ports
  port: 465,
  auth: {
    user: "", // example@gmail.com add a valid e-mail account here
    pass: "",
  },
};
```

2 - Email options setup, the `to` property in this object is the recipient

```js
let mailOptions = {
  from: req.body.email, // sender email address
  to: "example@gmail.com", // list of receivers
  subject: req.body.subject, // Subject line
  text: "", // plain text body
  html:
    "from: " +
    req.body.email +
    "<br><br> name: " +
    req.body.name +
    "<br><br> message" +
    req.body.message, // plain text body
};
```

3 - Run the app by running `node app.js` or `npm start` on your terminal, you can run npm start because there is a script on the package.json file.

4 - if you're testing it locally it won't work and you will get an error saying the connection was refused, this is because localhost is not secure, or the gmail account does not have a permission enabled to allow less secure apps.
So for testing purposes, you can [Allow less secure apps to access the gmail account](https://myaccount.google.com/lesssecureapps).
Also, change the port to a non secure one and set secure to false on the `smtpConfig` object as follows:

```js
...
secure: false, // true for 465, false for other ports
port: 587,
...
```

and if you send a request to /mail you should see the console logs on the terminal that you're running `node app.js`


```js
    {
        name: 'test',
        email: 'test@example.com',
        subject: 'Email title',
        message: 'email message'
    }

    Message sent: {
        accepted: [ 'recipient@gmail.com' ],
        rejected: [],
        envelopeTime: 233,
        messageTime: 799,
        messageSize: 339,
        response: '250 2.0.0 OK  1598965001 c40sm1336654qtb.72 - gsmtp',
        envelope: { from: 'example@example.com', to: [ 'recipient@gmail.com' ] },
        messageId: '<b14a5d7a-b53e-8368-1962-e2f88d006056@example.com>'
    }
```

### Next Steps

Now that you have the email server working on your localhost, Try to figure out how to reproduce it on the server with more security, meaning you can't do step 4 on the server, you must use the secure port.
