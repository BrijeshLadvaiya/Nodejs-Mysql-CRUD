const express =require('express');
const connection=require('./Database/DBconfig.js');//exported from seperate file.
require('dotenv').config();

const app=express();
const PORT=process.env.PORT || 3000;

//Home Route
app.get("/",(req,res)=>{
    res.send("<h1>Home Route </h1>")
})

// Route to create db.
app.get("/db-create", (req,res)=>{
    const dbquery="CREATE DATABASE IF NOT EXISTS Cricketers";

    connection.query(dbquery,(err,result)=>{
        if(err) throw err;
        console.log("Database created successfully",result)
    })
    res.send("<h1>Route to create db.</h1>")
});


//Route to create Table.
app.get("/db-create-table", (req,res)=>{


    //studentinfo table
    const batsmeninfo=`CREATE TABLE IF NOT EXISTS tblBatsmenInfo(
        batsmenRank varchar(10) NOT NULL,
        fname varchar(50) NOT NULL,
        lname varchar(50) NOT NULL,
        country varchar(15) NOT NULL,
        PRIMARY KEY (batsmenRank))`

        const bowlerinfo=`CREATE TABLE IF NOT EXISTS tblBowlerInfo(
            bowlerRank varchar(10) NOT NULL,
            fname varchar(50) NOT NULL,
            lname varchar(50) NOT NULL,
            country varchar(15) NOT NULL,
            PRIMARY KEY (bowlerRank))`

        // SHOW DATABASES => List the available DB from MySql server
        
    connection.query("USE Cricketers",(err,result)=>{ // "Select Database"
        if(err) throw err;
        connection.query(batsmeninfo,(err,result)=>{
            if(err) throw err;
            console.log(" Batsmen Table created successfully",result)
        });

        connection.query(bowlerinfo,(err,result)=>{
            if(err) throw err;
            console.log("bowler Table created successfully",result)
        });
    });
    res.send("<h1>Route to create Table. </h1>")
});

//Route to insert data

app.get("/db-insert", (req,res)=>{
    const dbInsert1=`INSERT INTO tblBatsmenInfo
    (batsmenRank,fname,lname,country)
    VALUES ('1','Virat','Kohli','India'),
    ('5','Rohit','Sharma','India'),
    ('3','Babar','Azam','Pakistan'),
    ('2','Joe','Root','England'),
    ('4','Steve','Smith','Australia')`;

    const dbInsert2=`INSERT INTO tblBowlerInfo
    (bowlerRank,fname,lname,country)
    VALUES ('1','Mitchell','Starc','Australia'),
    ('2','Jasprit','Bumrah','India'),
    ('3','kaile','Jaminson','New Zealand'),
    ('4','Mohammed','Amir','Pakistan')`;

    connection.query("USE Cricketers",(err,result)=>{
        if(err) throw err;

        connection.query(dbInsert1,(err,result)=>{
            if(err) throw err;
            console.log(`Total affected ROWS in tblBatsmenInfo: ${result['affectedRows']}`)
            })

        connection.query(dbInsert2,(err,result)=>{
            if(err) throw err;
            console.log(`Total affected ROWS in tblBowlerInfo: ${result['affectedRows']}`)
            })
    });
    res.send("<h1>Route to insert data </h1>")
});

//Route to update Data.
app.get("/db-update",(req,res)=>{
    const db1=`UPDATE tblBatsmenInfo SET fname = 'Kane', lname= "Williamson", country="New Zealand"  WHERE batsmenRank = '3'`;
    const db2=`UPDATE tblBowlerInfo SET fname = 'Josh', lname= "Hazelwood", country="Australia" WHERE bowlerRank = '2'`;

    connection.query("USE Cricketers",(err,result)=>{
        if(err) throw err;
            connection.query(db1,(err,result)=>{
                if(err) throw err;
                
                console.log(`Total affected ROWS in tblBatsmenInfo: ${result['affectedRows']}`)
                console.log(result);
            })

            connection.query(db2,(err,result)=>{
                if(err) throw err;
                
                console.log(`Total affected ROWS in tblBowlerInfo: ${result['affectedRows']}`)
                console.log(result);
            })
    })
    res.send("<h1>Route to update Data. </h1>")
})

//Route to display data
app.get("/db-display", (req,res)=>{
    const db1=`SELECT * from tblBatsmenInfo`;
    const db2=`SELECT * from tblBowlerInfo`;

    connection.query("USE Cricketers",(err,result)=>{
        if(err) throw err;
            connection.query(db1,(err,result)=>{
                if(err) throw err;
                
                console.log("Inserted Data in tblBatsmenInfo is:\n");
                console.log(result);
            })

            connection.query(db2,(err,result)=>{
                if(err) throw err;
                
                console.log("Inserted Data in tblBowlerInfo is:\n");
                console.log(result);
            })
    })
    res.send("<h1>Route to display data </h1>")
});

//Route to Delete Data
app.get("/db-delete",(req,res)=>{
    const db1=`DELETE FROM tblBatsmenInfo WHERE batsmenRank = '5'`;
    const db2=`DELETE FROM tblBowlerInfo WHERE bowlerRank = '2'`;

    connection.query("USE Cricketers",(err,result)=>{
        if(err) throw err;
            connection.query(db1,(err,result)=>{
                if(err) throw err;
                
                console.log(`Total affected ROWS in tblBatsmenInfo: ${result['affectedRows']}`)
                console.log(result);
            })

            connection.query(db2,(err,result)=>{
                if(err) throw err;
                
                console.log(`Total affected ROWS in tblBowlerInfo: ${result['affectedRows']}`)
                console.log(result);
            })
    })
    res.send("<h1>Route to Delete Data </h1>")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`)
})