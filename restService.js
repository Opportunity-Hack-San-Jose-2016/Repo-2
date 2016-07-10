var express = require('express');
var app = express();

app.use(express.static('html'));
app.use(express.static('images'));
app.use(express.static('public'));
var http = require("http");
var crypto = require('crypto');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'mysql'
});

connection.connect();

//get all customer
app.get('/api/customer', function(req, res){

  var result =[];
  var queryStr = "select * from customer";
  console.log("Query is "+queryStr);
  connection.query(queryStr, function(err, rows, fields) {
      if (!err && rows.length!=0){
        console.log('The solution is: ', rows);
		for(var i = 0; i<rows.length; i++){

			result.push(rows[i]);
		}
		  	res.send(result);
	}

      else{
        console.log('Error while performing Query.'+err);
      }
      });
});

//get by member id
app.get('/api/customer/:cust_id', function(req, res){

  var result =[];
  var cust_id = Number(req.query.cust_id);

  var queryStr = "select * from customer where cust_id ="+cust_id;
  console.log("Query is "+queryStr);
  connection.query(queryStr, function(err, rows, fields) {
      if (!err && rows.length!=0){
        console.log('The solution is: ', rows);
		for(var i = 0; i<rows.length; i++){

			result.push(rows[i]);
		}
		  	res.send(result);
	}

      else{
        console.log('Error while performing Query.'+err);
      }
      });
});


//HTTP to register
app.post('/api/customer/register', function (req, res) {

    console.log(req.body.name);
    var body = req.body;
    var hash = crypto.createHash('sha256').update(body.password).digest('base64');
    var customer = {customer_id: body.customer_id,
    password: hash,
    firstname : body.firstname,
    lastname : body.lastname,
    address : body.address,
    city : body.city,
    state : body.state,
    zipcode : body.zipcode,
    dob : body.dob,
    phone : body.phone,
    adult : body.adult,
    children : body.children,
    total_ppl : body.total_ppl,
    race : body.race,
    language : body.language,
    disability : body.disability,
    q1_ans : body.q1_ans,
    q2_ans : body.q2_ans,
    digital_sign : body.q2_ans,
    date : body.date,
}
   con.query('INSERT INTO customer SET ?', customer, function(err,res){
   if(err) throw err;

   console.log('Last insert ID:',body.customer_id);
   });
   res.writeHeader(200, {"Content-Type": "application/json"});
   res.end();
  
})

//HTTP to login check for admin
app.post('/api/admin/login', function (req, res) {

    var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');

    console.log(req.body.password +"  "+ hash);

    var queryStr = "select admin_id, password from admin where admin_id="+req.body.admin_id+ "and password="+ hash;
    console.log("Query is "+queryStr);
    connection.query(queryStr, function(err, rows, fields) {
        if (!err && rows.length!=0){
        console.log('The solution is: ', rows);
		for(var i = 0; i<rows.length; i++){

			result.push(rows[i]);
		}
		  	res.send(result);
            res.writeHeader(200, {"Content-Type": "application/json"});
	}

      else{
        console.log('Error while performing Query.'+err);
            res.writeHeader(401, {"Content-Type": "application/json"});
      }
      });

    res.end();

})

//HTTP to login check for admin
app.post('/api/customer/login', function (req, res) {

    var hash = crypto.createHash('sha256').update(req.body.password).digest('base64');

    console.log(req.body.password +"  "+ hash);

    var queryStr = "select cust_id, password from customer where cust_id="+req.body.cust_id+ "and password="+ hash;
    console.log("Query is "+queryStr);
    connection.query(queryStr, function(err, rows, fields) {
        if (!err && rows.length!=0){
            console.log('The solution is: ', rows);
            for(var i = 0; i<rows.length; i++){

                result.push(rows[i]);
            }
            res.send(result);
            res.writeHeader(200, {"Content-Type": "application/json"});
        }

        else{
            console.log('Error while performing Query.'+err);
            res.writeHeader(401, {"Content-Type": "application/json"});
        }
    });

    res.end();

})

// Update the customer record
app.put('/api/customer/register/:cust_id', function (req, res){

    var cust_id = req.body.cust_id;

    var queryStr = "UPDATE SET ContactName = 'Alfred Schmidt', City='Hamburg'
    WHERE CustomerName='Alfreds Futterkiste';
    var body = req.body;
    var hash = crypto.createHash('sha256').update(body.password).digest('base64');
    var customer = {customer_id: body.customer_id,
        password: hash,
        firstname : body.firstname,
        lastname : body.lastname,
        address : body.address,
        city : body.city,
        state : body.state,
        zipcode : body.zipcode,
        dob : body.dob,
        phone : body.phone,
        adult : body.adult,
        children : body.children,
        total_ppl : body.total_ppl,
        race : body.race,
        language : body.language,
        disability : body.disability,
        q1_ans : body.q1_ans,
        q2_ans : body.q2_ans,
        digital_sign : body.q2_ans,
        date : body.date,
    }

    connection.query('UPDATE users SET ? WHERE cust_id ='+cust_id,
        customer),function(err,res){
        if(err) throw err;
        console.log('Last update ID:',body.cust_id);
    });


app.delete('/api/customer/:cust_id', function (req, res){

    var cust_id = req.body.cust_id;

    var queryStr = 'DELETE FROM customer WHERE cust_id=?';
    var body = req.body;
    //Delete a record.
    connection.query(deleteRecord, cust_id, function(err, res){
        if(err) throw err;
        else {
            console.log('An customer is removed.');
        }
    });

})

