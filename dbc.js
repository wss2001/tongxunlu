var mongodb=require('mongodb')
var MongoClient=mongodb.MongoClient
var objId=mongodb.ObjectId
var url = "mongodb://localhost:27017";
// 封装
var mongoControl=function(dbName,tableName){
    this.dbName=dbName
    this.tableName=tableName
    // 插入封装
    this.insert=function(data,callback){
        MongoClient.connect(url,(err,db)=>{
            if(err) throw err
            var dbo=db.db(this.dbName)
            dbo.collection(this.tableName).insertMany(data,function(err,res){
                callback(err,res)
                db.close()
            })
        })
    }
    // 删除封装
    this.delete=function(_id,callback){
        MongoClient.connect(url,(err,db)=>{
            if(err) throw err
            var dbo=db.db(this.dbName)
            dbo.collection(this.tableName).deleteOne({_id:objId(_id)},function(err,res){
                callback(err,res)
                db.close()
            })
        })
    }
    // 查询封装
    this.find=function(whereStr,callback){
        MongoClient.connect(url,(err,db)=>{
            if(err) throw err
            var dbo=db.db(this.dbName)
            dbo.collection(this.tableName).find(whereStr).toArray(function(err,res){
                callback(err,res)
                db.close()
            })
        })
    }
    // 更改封装
    this.update=function(whereStr,updateStr,callback){
        MongoClient.connect(url,(err,db)=>{
            if(err) throw err
            var dbo=db.db(this.dbName)
            dbo.collection(this.tableName).updateMany(whereStr,updateStr,function(err,res){
                callback(err,res)
                db.close()
            })
        })
    }
}

// 导出去
exports.mongoControl=mongoControl

