//A good option to avoid the use of try/catch block in async/await is to create 
//an higher-order function for error handling:

module.exports = (theFunc) => (req,res,next) => {
    Promise.resolve(theFunc(req,res,next)).catch(next)
}

//same as above

// module.exports = function(theFunc){
//     return function(req,res,next){
//         Promise.resolve(theFunc(req,res,next)).catch(next)
//     }
// } 



