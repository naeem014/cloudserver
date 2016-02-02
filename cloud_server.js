var hashmap = require('hashmap');
var server = require('http').createServer().listen(process.env.PORT || 1111);
var io = require('socket.io')(server);

var client_server = 0;
var dishes = new hashmap();

io.on('connection', function(socket) {
	socket.on('client_server_connection', function() {
		client_server = socket;
	});

	socket.on('parameters', function(data) {
		var id = data['dish_id'];
		dishes.set(id, socket);
		client_server.emit('parameters', data);
	});

	socket.on('update_parameters', function(data) {
		dishes.forEach(function (value, key) {
			value.emit('update_parameters', data);
		});
	});

});