let express = require('express')
let {createPool} = require('mysql');
let app = express()
const bodyParser = require('body-parser');
const fs = require('fs')

// Parse incoming request bodies in a middleware before your handlers.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
let port = 3000
app.use(express.json())
const pool=createPool({
    host:'localhost',
    user: 'localhost',
    password : '',
    database :'HealthCard'
})

// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'localhost',
//     password : '',
//     database : 'test1'
// });

// connection.connect();
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/demo.html')
// })
app.post('/sel',(req,res)=>{
    console.log(req.body)
    // var qry="select * from Patients;";
    // connection.query(qry,function (error,results) {
    //     console.log('The solution is: ', results);
    //   })
});
// app.post('/demo', (request,res)=>{
//     var id = request.body.id
//     var names = request.body.names
//     var city = request.body.city
//     console.log(id,names,city)
//     pool.query("insert into demo (id,Name,city) values(" + id + ",'" + names +"','" + city +"')", (err, result, field)=>{
//         if(err) throw err;
//         res.send(result);
//     })
// })
app.post('/register', (req,res)=>{
    var id = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var DOB = req.body.DOB;
    var Gender = req.body.Gender;
    var Adharcard = req.body.Adharcard;
    var phoneNO1 = req.body.phoneNO1;
    var phoneNO2 = req.body.phoneNO2;
    var Email = req.body.Email;
    var BloodGRP = req.body.BloodGRP;
    var address = req.body.address;
    var Pincode = req.body.Pincode;
    var passwords = req.body.passwords;
    var photo = req.body.photo;
    console.log(req.body)
    pool.query("insert into Patient (id,FIRST_NAME,LAST_NAME,DOB,Gender,ADHAR_ID,photo,phoneNO1,phoneNO2,Email,BloodGRP,address,Pincode,passwords) values(" + id + ",'" + first_name +"','" + last_name +"','" + DOB +"','" + Gender +"','" + Adharcard +"','" + photo +"','" + phoneNO1 +"','" + phoneNO2 +"','" + Email +"','" + BloodGRP +"','" + address +"','" + Pincode +"','" + passwords +"')", (err, result, field)=>{
        if(err) throw err;
        res.json(result);
    })
})

app.get('/select' , (req,res)=>{
    pool.query("select * from Patient", (err, result, field)=>{
            const keys = Object.values(result[0])
            fs.writeFileSync("data.json",JSON.stringify(result))
            res.send(result[2])
        }
    )
})

app.post('/login',(req,res)=>{
    var email = req.body.email
    var password = req.body.password
    console.log(email +"  "+password)
    pool.query("select Email,passwords from Patient", (err, result, field)=>{
    const keys = Object.values(result)
    console.log(keys)
    const user = keys.find(u => e.email === keys.Email && e.password === keys.passwords);
  if (user) {
    // Generate a session token or set a cookie to indicate the user is logged in
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});
})
// connection.end();
app.listen(port,()=>{
    console.log(`App run on port : ${port}`);
})
