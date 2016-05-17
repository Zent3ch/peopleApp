var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')



var app = express();



app.set('views','src/views');
app.set('view engine','jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){

	fs.readFile('./resources/users.json',function(err,data){
		if(err){
			console.log(err);
		}

		var parseData = JSON.parse(data);
		console.log(parseData);
		res.render("index", {
			users: parseData.userArray


		});
	});

});


app.get('/usercheck',function(req,res){
	res.render("usercheck");

});
	app.post('/usercheck', function(req, res) {
		fs.readFile('./resources/users.json',function(err,data){
			if(err){
				console.log(err);
			}
			var fname = req.body.fname
			var parseData = JSON.parse(data);

			parseData.userArray.forEach(function(data){
				if(fname == data.firstname || fname == data.lastname){
					res.send("hello" +fname+"you are found in the system");
				}else{
					res.send("hellas");
				}
			})
		})

	});

	app.get('/adduser',function(req,res){
		res.render('adduser');
	});

	app.post('/',function(req,res){
		fs.readFile('./resources/users.json',function(err,data){
			if(err){
				console.log(err);
			}
			var parseData = JSON.parse(data);
			var newUser = {"firstname": req.body.fname, "lastname": req.body.lname, "email":req.body.email}
			parseData.userArray.push(newUser)

			fs.writeFile('./resources/users.json',JSON.stringify(parseData),function(err){
				if(err){
					console.log(err)
				};
				res.render('index',{
					users:parseData.userArray
				})
			});

		})
	})


var server = app.listen(3000,function(){
	console.log('Exmaple app listening on port '+ server.address().port);
});