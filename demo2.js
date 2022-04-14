// 导入mongoControl方法
var mongoControl=require('./dbc').mongoControl
var user=new mongoControl('test','user')
// user.insert([
//     {name:'ww',password:123},
//     {name:'模块引出',password:789}
// ],function(err,res){
//     console.log(res)
// })

var contact=new mongoControl('test','contact')
// contact.insert([{name:'测试'}],function(err,res){
//     console.log(res)
// })
// 删除 
// contact.delete("61cd4b4312ba43bafb0c9493",function(err,res){
//     console.log(res)
// })
// 查询
// user.find('',function(err,res){
//     console.log(res)
// })
// 更改数据
user.update({name:'kk'},{$set:{age:30}},function(err,res){
    console.log(res)
})