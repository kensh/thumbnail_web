var request = require("request");
var fs = require('fs');
var base_url = "http://localhost:3000"

var formData = {
  // Pass data via Streams
  upFile: fs.createReadStream(__dirname + '/sample.jpg')
};

describe("Web Server", function() {
  describe("thumbnail test", function() {
    let imageId = null;

    it("POST /image returns status code 200", function(done) {
      request.post({url: base_url + '/image', formData: formData}, function (err, response, body) {
        imageId = JSON.parse(body).filename;
        console.log('file upload done: ' + imageId);
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("GET thumbnail returns status code 200", function(done) {
      setTimeout(function(){
        request.get(base_url + "/image/" + imageId + '/thumbnail', function(error, response, body) {
          console.log('file download done');
          expect(response.statusCode).toBe(200);
          done();
        });
      },1000);
    });

  });
});
