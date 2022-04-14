var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
// 1，通过MongoClient.connect连接数据库返回客户端 db
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // 2,通过db.db来选库("runoob") 返回dbo
    var dbo = db.db("runoob");
    // 增加
    var myobj = { name: "lalala", url: "www.runoob" };
    // 3,选表("site")通过dbo.collection     4，操作表 (增删改查)
    dbo.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        // 5，关闭客户端 db
        db.close();
    });
});

// 查找
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("test");
//     dbo.collection("user"). find({}).toArray(function(err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });

// 删除
