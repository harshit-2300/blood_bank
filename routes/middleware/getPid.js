const session = require("express-session");
const mysql = require("mysql");
const db = require("../../config/db.js");
const getPid = (req, res, next) => {
    
    mail=req.body.email;

    db.query(
        "SELECT * FROM people WHERE email=?",mail,
        function (error, result, fields) {
          if (error) {
            console.log(error);
          }
          else if(result.length==0){
            console.log("not found");
             
            var users={
              full_name: req.body.name,
              blood_group: req.body.blood_type,
              DOB: req.body.dob,
              phone_number: req.body.phone,
              email: req.body.email,
              verified: 0,
              password:"no password",
              gender: req.body.gender,
              user_type: "normal",
            }

            db.query(
              "INSERT INTO people SET ?",
              users,
              function(error,result,fields){
                if(error){
                  console.log(error);
                }
                else
                {
                console.log("inserted into peop;e=",result);  
                req.session.pid=result.insertId;
                console.log("req,session.pid=",req.session.pid);
                next();
                }
              }
            )

            
            
          }
          else {
            console.log(result);
           

            
            
            console.log("at pid");
            req.session.pid=result[0].PID;
            next();
            };
          });

          

};

module.exports = getPid;
