// implement Search,Filter,Pagination

// this.query matlab Product.find()

class ApiFeatures {
    constructor(query,queryStr){
        this.query=query; //such as Product.find()
        this.queryStr=queryStr;
    }

    Search(){

        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,  //find kjlgsamosamosa = samosa
                $options:"i"
            }
        } : {};

        //this.query = Product.find().find({...keyword}) used option chaining...
        //same above
        this.query = this.query.find({...keyword})
        //db.products.find( { name: { $regex: /^ABC/i } } )
        return this;
    }

    Filter(){
        const Keyword = {...this.queryStr};
        let removeFields = ['keyword','page','limit'];
        
        removeFields.forEach(key => delete Keyword[key])
        //Filter for price and rating
        // we have to add $ with gt and lt such as mongodb lte oprator
        // "price":{"$gte":"4000"}}

       let str =  JSON.stringify(Keyword);
           str = str.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`)
        this.query = this.query.find(JSON.parse(str))

        return this;
    }

    Pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage -1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this.query

    }




}

module.exports=ApiFeatures