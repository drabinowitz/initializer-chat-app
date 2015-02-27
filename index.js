var port = process.env.PORT || 8000;
require('./server/server').listen(port);
console.log('listening on port ' + port);
