const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("Public"));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const emailID = req.body.emailID;

      const data = {
        members: [{
          email_address: emailID,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }]
      };

      const jsonData = JSON.stringify(data);

      const url = "https://us21.api.mailchimp.com/3.0/lists/1055cdff08";

      const options = {
        method: "POST",
        auth: "murali4:fcc03ab76a128a37f2f20bab80ed6d48-us21"
      };

      const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
          res.sendFile(__dirname+"/success.html");
        } else {
          res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data) {
          console.log(JSON.parse(data));
        });
      });

      request.write(jsonData);
      request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

      //API key
      //fcc03ab76a128a37f2f20bab80ed6d48-us21

      //List Id
      //1055cdff08
      app.listen(process.env.PORT || 3000, function() {
        console.log("Server is running @port 3000");
      });
