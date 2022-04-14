// 通讯录接口  api
// 运用ajax来进行处理
const express=require('express')  //http框架
var app=express()   
const mongoControl=require('./demo3').mongoControl
var contactCtl=new mongoControl('test','contact')
const bodyParser=require('body-parser')  //解析http请求体
const urlencodedParser=bodyParser.urlencoded({extended:false})
const jsonParser=bodyParser.json()
app.use(express.static('./public'))
// 错误函数
var handleErr=function(res){
    res.status(500).send('数据库错误')
}
// 获取全部联系人  返回一个联系人数组 用户ajax请求后填充到页面中
app.get('/getAllContact',(req,res)=>{
    contactCtl.find({},(err,result)=>{
        if(err) {
            handleErr(res)
            return
        }
        res.send(result)
    })
})
// 获得一个联系人
// app.get('/getContact',(req,res)=>{
//     var _id=req.query._id
//     contactCtl.findById(_id,(err,result)=>{
//         if(err) {
//             handleErr(res)
//             return
//         }
//         res.send(result)
//     })
// })
// 搜索联系人  
app.get('/search',(req,res)=>{
    var wd=req.query.wd
    var reg=new RegExp(wd,'i')
    contactCtl.find(
        {
            $or:[
                {name:{$regex:reg}},
                {phoneNumber:{$regex:reg}}
            ]
        },(err,result)=>{
            if(err) return handleErr(res)
            res.send(result)
        })
})
// 删除联系人
app.get('/delete',(req,res)=>{
    // req.query传回来的_id
    var _id=req.query._id
    contactCtl.deleteById(_id,(err,result)=>{
        if(err) return handleErr(res)
        res.send(result)
    })
})
// 添加联系人
app.post('/addContact',urlencodedParser,(req,res)=>{
    var {name,phoneNumber}=req.body
    contactCtl.insert([{name:name,phoneNumber:phoneNumber}],(err,result)=>{
        if(err) {
            handleErr(res) 
            return
        }
        res.send({result:'ok'})
    })
})
// 修改联系人  
app.post('/change',urlencodedParser,(req,res)=>{
    var {_id,newName,newPhoneNumber}=req.body
    contactCtl.updateById(_id,{name:newName,phoneNumber:newPhoneNumber},(err,result)=>{
        if(err) {
            handleErr(res)
            return
        }
        res.send({result:'ok'})
    })
    
})


app.listen(4001)
