const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Webhook endpoint
app.post("/webhook", (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();
  const incomingMsg = req.body.Body.toLowerCase();

  if (incomingMsg.includes("book")) {
    twiml.message("✅ Thanks! Your vehicle wash booking request is received.");
  } else {
    twiml.message("👋 Welcome to Shah Washing Center! Type 'book' to book a wash.");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
