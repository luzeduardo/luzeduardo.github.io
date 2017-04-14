const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/build/index.html');
});

app.listen(process.env.PORT || 8080);