var http= require('http');
var FS   = require('fs');
var WebSocketServer = require('websocket').server;
var connection=[];
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(4000, function() {
    console.log((new Date()) + ' Server is listening on port 4000');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    // Cliente que llega
    var lastConnection = (request.accept('broadcast-protocol', request.origin));
    lastConnection.on('message', function(message) {
        for(i=0;i<connection.length;i++){
            connection[i].sendUTF(message.utf8Data);
            console.log('Enviado');
        }
    });

    lastConnection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
    connection.push(lastConnection);
});