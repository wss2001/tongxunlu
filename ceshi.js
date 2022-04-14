var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var objId=require('mongodb').ObjectId
MongoClient.connect(url,function(err,db){
    if(err){
        console.log(err)
        return
    }
    var dbo=db.db('shiyan')
    //插入数据
    // var myobj=[
    //     {name:'wss',password:123},
    //     {name:'niu',password:456}
    // ]
    // dbo.collection('kk').insertMany(myobj,function(err,res){
    //     if(err) throw err
    //     console.log('插入的文档数量为：'+res.insertedCount)
    //     db.close()
    // })
    // 查找数据       find({}),所有的全都查找  find(whereStr)查找带有whereStr属性的文档
    // var whereStr={name:'wss'}
    // dbo.collection('kk').find(whereStr).toArray(function(err,res){
    //     console.log(res)
    //     db.close()
    // })
    // 更改数据
    // var whereStr={name:'wss'}
    // var updateStr={$set:{age:20}}
    // dbo.collection('kk').updateMany(whereStr,updateStr,function(err,res){
    //     if(err) throw err
    //     console.log('文档更新完成')
    //     db.close()
    // })
    // 删除数据
    // var whereStr={name:'niu'}
    var whereStr={_id:objId("61cd35a68006a49fc0066942")}
    dbo.collection('kk').deleteMany(whereStr,function(err,obj){
        if(err) throw err
        console.log(obj.deletedCount)
        console.log(obj.acknowledged)
        db.close()
    })
})













 
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mx");
//     var myobj =  [
//         { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
//         { name: 'Google', url: 'https://www.google.com', type: 'en'},
//         { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
//        ];
//     dbo.collection("ceshi").insertMany(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("插入的文档数量为: " + res.insertedCount);
//         db.close();
//     });
// });