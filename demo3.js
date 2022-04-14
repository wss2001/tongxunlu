// es6封装
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId
var url = "mongodb://localhost:27017"
class mongoControl{
    constructor(dbName,collectionName){
        this.dbName=dbName
        this.collectionName=collectionName
    }
    find(whereStr,callback){
        MongoClient.connect(url,(error,db)=>{
            if(error){
                callback(error)
                return
            }
            var dbo=db.db(this.dbName)
            dbo.collection(this.collectionName).find(whereStr).toArray((err,result)=>{
                callback(err,result)
                db.close()
            })
        })
    }
    insert(docs,callback){
        MongoClient.connect(url,(error,db)=>{
            if(error) throw error
            var dbo=db.db(this.dbName)
            dbo.collection(this.collectionName).insertMany(docs,(error,result)=>{
                callback(error,result)
                db.close()
            })
        })
    }
    update(whereStr,newData,callback){
        MongoClient.connect(url,(error,db)=>{
            if(error) throw error
            var dbo=db.db(this.dbName)
            dbo.collection(this.collectionName).updateMany(whereStr,{$set:newData},(error,result)=>{
                callback(error,result)
                db.close()
            })
        })
    }
    delete(whereStr,callback){
        MongoClient.connect(url,(error,db)=>{
            if(error) throw error
            var dbo=db.db(this.dbName)
            dbo.collection(this.collectionName).deleteMany(whereStr,(error,result)=>{
                callback(error,result)
                db.close()
            })
        })
    }
    // 通过_id来删除
    deleteById(_id,callback){
        var whereStr={_id:ObjectId(_id)}
        this.delete(whereStr,callback)
    }
    // 通过_id来查找
    findById(_id,callback){
        var whereStr={_id:ObjectId(_id)}
        this.find(whereStr,callback)
    }
    //  通过_id来更新
    updateById(_id,newData,callback){
        var whereStr={_id:ObjectId(_id)}
        this.update(whereStr,newData,callback)
    }
}

exports.mongoControl=mongoControl
// var user = new mongoControl('test','user')
// user.find({},function(err,result){
//     console.log(result)
// })
// var contact = new mongoControl('test','contact')
// contact.insert([{name:'sm',age:20}],function(error,result){
//     console.log(result)
// })
// contact.update({name:'sm'},{age:21},function(error,result){
//     console.log(result)
// })
// user.deleteById("61cd46147a703e67ff804dd7",function(error,result){
//     console.log(result)
// })
// user.updateById("61cc50b45a4157c0909b0c8e",{phone:'nova'},function(error,result){
//     console.log(result)
// })