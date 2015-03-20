// app/routes.js

module.exports = function(app){

//// VIEWS -------------------------------------------------------------------
	// home page
	app.get('/', function(req, res) {
		res.render('index.html', {});
	});

	app.get('/survey', function(req, res){
		res.render('index.html', {});
	})

	app.get('/done', function(req, res){
		res.render('index.html', {});
	})

	app.get('/future', function(req, res){
		res.render('index.html', {});
	})

	app.get('/about', function(req, res){
		res.render('index.html', {});
	})

};

