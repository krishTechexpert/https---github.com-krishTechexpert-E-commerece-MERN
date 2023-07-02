const app = require('./app');
const dotenv= require('dotenv');

const connectToDataBase = require('./config/database')
dotenv.config({ path: 'backend/config/config.env' })

//handling Uncaught exception such as console.log(youtube) [should be put in the starting]

process.on('uncaughtException',(err) => {
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to Uncaught exception')
    process.exit(1)
})

//console.log(youtube)
// connecting to Database
connectToDataBase();

const server = app.listen(process.env.PORT,() => {
    console.log(`server started at http://localhost:${process.env.PORT}`)
})

//unhandled promise rejection such as put  mongo instead of mongodb in config.env file
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('shutting down the server due to unhandled promise rejection')

    server.close(() => {
        process.exit(1);
    })

})