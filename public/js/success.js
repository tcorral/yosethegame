var qs = require('querystring');
var array = require('./array.utils');
var thisPlayer = require('./player.utils');

findChallengeTitle = function(challengeFile, database) {
	return array.first(database.challenges, function(item) {
		return item.file == challengeFile;
	}).title;
};

logSuccess = function(form, database, response) {
	if (form.login == undefined || form.challenge == undefined || form.server == undefined) {
		response.writeHead(400);
		response.end();
		return;
	}
		
	var player = database.find(form.login);
		
	if (thisPlayer.isANew(player)) {
		player.portfolio = [];
	}
		
	player.portfolio.push( 
		{ 
			title: findChallengeTitle(form.challenge, database),
			server: form.server 
		} 
	);
	database.savePlayer(player);
	response.end();
}

success = function(request, response, database) {
	var host = request.headers.host;
	if (host != 'localhost:5000' && host != 'yose.herokuapp.com') {
		console.log('\n !!! receiving success request from host ' + request.headers.host);
		response.writeHead(401);
		response.end();
		return;
	}
	
	if (request.method != 'POST') {
		response.writeHead(405);
		response.end();
		return;
	} 
	
	var body = '';
    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {
		var form = qs.parse(body);			
		logSuccess(form, database, response);
    });
	
};

module.exports = success;