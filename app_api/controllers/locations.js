var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.locationsListByDistance = function (req, res) { 
  sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.locationsCreate = function(req, res) {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.coords.lng), parseFloat(req.body.coords.lat)],
    openingTimes: [{
      days: req.body.opening1.days,
      opening: req.body.opening1.opening,
      closing: req.body.opening1.closing,
      closed: req.body.opening1.closed,
      }, {
      days: req.body.opening2.days,
      opening: req.body.opening2.opening,
      closing: req.body.opening2.closing,
      closed: req.body.opening2.closed,
    }]
  }, function(err, location) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, location);
    }
  });
};
module.exports.locationsReadOne = function (req, res) {
if (req.params && req.params.locationid) {
  Loc
    .findById(req.params.locationid)
    .exec(function(err, location) {
      sendJsonResponse(res, 200, location);
      console.log("findById complete");
    });
} else {
    sendJsonResponse(res, 404, {
    "message": "No locationid in request"
  });
}};
module.exports.locationsUpdateOne = function (req, res) { 
  sendJsonResponse(res, 200, {"status" : "success - put"});
};

/* DELETE /api/locations/:locationid */
module.exports.locationsDeleteOne = function(req, res) {
  var locationid = req.params.locationid;
  if (locationid) {
    Loc
      .findByIdAndRemove(locationid)
      .exec(
        function(err, location) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Location id " + locationid + " deleted");
          sendJsonResponse(res, 204, null);
        }
    );
  } else {
    sendJsonResponse(res, 404, {
      "message": "No locationid" 
    });
  }
};

