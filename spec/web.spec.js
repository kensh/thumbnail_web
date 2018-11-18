var request = require("request");
var fs = require('fs');
var base_url = "http://localhost:3000"

var formData = {
  // Pass data via Streams
  upFile: fs.createReadStream(__dirname + '/sample.jpg')
};

describe("Web Server", function() {
  describe("thumbnail test", function() {
    it("POST /image returns status code 200", function(done) {

      request.post({url: base_url + '/image', formData: formData}, function (err, response, body) {
        console.log('file upload done');
        expect(response.statusCode).toBe(200);
        done();
      });

    });
  });
});
