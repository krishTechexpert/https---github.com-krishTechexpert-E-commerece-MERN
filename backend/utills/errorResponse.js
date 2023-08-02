class ErrorResponse extends Error {
    constructor(code,message){
        super();
        this.message=message;
        this.statusCode=code;
        //Error.captureStackTrace(this,this.constructor)
    }
    
}

module.exports = ErrorResponse