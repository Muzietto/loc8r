/* GET 'about' page. */
module.exports.about = function(req, res) {
  res.render('index', { title: 'About' });
}
/* GET raw static html */
module.exports.raw = function(req, res) {
  res.sendfile('app_server/views/raw.html')
}

