var request = require("request");
var fs = require('fs');
var base_url = "http://localhost:3000"

var formData = {
  // Pass data via Streams
  upFile: fs.createReadStream(__dirname + '/sample.jpg')
};

describe("Web Server", function() {
  describe("POST /image", function() {
    it("returns status code 200", function(done) {

      request.post({url: base_url + '/image', formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
          return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
      });

    });
  });
});
