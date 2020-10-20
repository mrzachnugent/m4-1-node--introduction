"use strict";

const { query } = require("express");
// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const responseArr = [
      "🙈",
      "🙊",
      "I'll tell you the secret of the universe for a banana",
      "STOP MONKEYING AROUND",
      "sup lil human, wuz guddddd ?",
    ];
    const answer = Math.floor(Math.random() * responseArr.length);
    const message = { author: "monkey", text: responseArr[answer] };
    const randomTime = Math.floor(Math.random() * 2000 + 2);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get(`/parrot-message/`, (req, res) => {
    console.log(req.query.usermessage);
    const message = { author: "parrot", text: req.query.usermessage };
    const randomTime = Math.floor(Math.random() * 2000 + 1);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })

  .get("/bot-message", (req, res) => {
    const commonGrettings = ["hi", "hello", "sup", "hey"];
    const commonGoodbyes = ["bye", "goodbye", "peace", "see ya", "later"];
    let lowerCaseMessage = req.query.usermessage.toLowerCase();
    const filteredGreetings = commonGrettings.filter((greet) => {
      if (lowerCaseMessage.indexOf(greet) !== -1) {
        return true;
      }
    });
    const filteredGoodbyes = commonGoodbyes.filter((bye) => {
      if (lowerCaseMessage.indexOf(bye) !== -1) {
        return true;
      }
    });
    const jokesArr = [
      "I invented a new word: Plagiarism!",
      "Why do we tell actors to “break a leg?” Because every play has a cast.",
      "Helvetica and Times New Roman walk into a bar “Get out of here!” shouts the bartender. “We don’t serve your type.”",
    ];

    const getBotMessage = (text) => {
      let botMsg = "";

      if (lowerCaseMessage.indexOf("something funny") !== -1) {
        botMsg = "Would you like to hear a joke?";
      } else if (lowerCaseMessage === "yes") {
        botMsg =
          jokesArr[Math.floor(Math.random() * jokesArr.length)] +
          " Would you like to hear another one?";
      } else if (lowerCaseMessage === "no") {
        botMsg = "Goodbye";
      } else if (filteredGreetings.length > 0) {
        botMsg = "Hello!";
      } else if (filteredGoodbyes.length > 0) {
        botMsg = "Goodbye";
      } else {
        botMsg = `Bzzt ${text}`;
      }

      return botMsg;
    };

    const message = {
      author: "bot",
      text: getBotMessage(req.query.usermessage),
    };
    const randomTime = Math.floor(Math.random() * 2000 + 1.5);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
    }, randomTime);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
