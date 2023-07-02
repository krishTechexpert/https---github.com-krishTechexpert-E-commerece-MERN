const mongoose = require('mongoose');

function connectToDataBase(){
       mongoose.set('strictQuery', true);
       mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then((data) => {
        console.log(`mongodb has connected to the ${data.connection.host}`)
       })
    }

   
module.exports = connectToDataBase;