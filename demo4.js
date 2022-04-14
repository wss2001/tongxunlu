const express=require('express')
const app=express()
const path=require('path')
const bodyParser=require('body-parser')
const urlencodedParser=bodyParser.urlencoded({extended:false})  //第二步 初始化body-parser中间件
const mongoControl=require('./demo3').mongoControl
const user=new mongoControl('test','user')
app.use(express.static('./static'))

// 登录
app.post('/login',urlencodedParser,(req,res)=>{
    var username=req.body.username
    var password=req.body.password
    user.find({username:username,password:password},(error,result)=>{
        if(error){
            res.status(500).send('服务器错误')
            return
        }
        // 找不到对应的账号密码数据
        if(result.length==0){
            res.status(403).send('账号密码错误')
        }
        else{
            res.send('登陆成功')
        }
    })
})
// 注册
app.post('/register',urlencodedParser,function(req,res){
    var username=req.body.username
    var password = req.body.password
    // console.log(username,password)
    if(username.length<6||password.length<6){
        res.status(403).send('账号密码过短')
        return
    }
    // 判断是否已经存在账户
    user.find({username:username},(err,result)=>{
        if(err){
            res.status(500).send('服务器错误')
            return
        }
        // result因为用了toArray方法是数组类型，大于0时，存在该账户
        if(result.length > 0){
            res.send('账户已存在，请更改')
        }
        // 找不到用户名，不存在该账户,可以注册
        if(result.length==0){
            user.insert([{username:username,password:password}],(err,result)=>{
                if(err) {
                    res.status(500).send('服务器错误')
                    return
                }
                res.send('注册成功')
                console.log(result)
            })
        }
    })
})
// 修改密码
app.post('/change',urlencodedParser,(req,res)=>{
    // es6形式
    var {username,oldPassword,newPassword}=req.body
    user.find({username:username,password:oldPassword},(err,result)=>{
        if(err){
            res.status(500).send('服务器错误')
            return
        }
        if(result.length==0){
            res.status(403).send('账号密码不匹配')
        }
        else{
            var _id=result[0]._id
            user.updateById(_id,{password:newPassword},(err,result)=>{
                if(err){
                    res.status(500).send('服务器错误,你的账号密码没有修改成功')
                    return
                }
                res.send(`修改成功，你的新账号密码为：${username} - ${newPassword}`)
            })
        }
    })
})

app.listen(4000)

