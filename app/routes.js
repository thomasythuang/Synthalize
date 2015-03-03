// app/routes.js

module.exports = function(app){

//// VIEWS -------------------------------------------------------------------
	// home page
	app.get('/', function(req, res) {
		res.render('index.html', {});
	});

	app.get('/listen', function(req, res){
		res.render('index.html', {});
	})

};

