var contactList = $('#contact-list')

// 通过_id获取联系人
var contact = {
    arr: [],
    getContactById: function (_id) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i]._id == _id) {
                return this.arr[i]
            }
        }
        return null
    }
}

// 唤出添加联系人模态框
var addContactBtn = $('#add-contact-btn')
var addContactModal = $('#add-contact-modal')
// 添加联系人提交按钮,name,phoneNumber input输入框
var addContactSubmit = $('#add-contact-submit')
var addContactName = $('#add-contact-name')
var addContactPhoneNumber = $('#add-contact-phoneNumber')

// 修改系列
var changeContactModal = $('#change-contact-modal')
// 修改联系人提交按钮,name,phoneNumber input输入框
var changeContactSubmit = $('#change-contact-submit')
var changeContactName = $('#change-contact-name')
var changeContactPhoneNumber = $('#change-contact-phoneNumber')
// 保存当前要修改的id
var change_id = ''

// 搜索
var searchInput = $('#search-input')

// 使删除，修改联系人按钮带有_id属性 新填入的HTML元素后添加监听器
var addEventListener = function () {
    var deleteBtn = $('.delete-btn')
    deleteBtn.on('click', function () {
        console.log($(this).attr('data-_id'))
        deleteContact($(this).attr('data-_id'))
    })
    $('.change-btn').on('click', function () {
        changeContactModal.modal('show')
        console.log($(this).attr('data-_id'))
        change_id = $(this).attr('data-_id')
        // 定义nowChange通过contact.getContactById方法来获取联系人信息，再映射到界面上
        var nowChange = contact.getContactById(change_id)
        if (nowChange) {
            changeContactName.val(nowChange.name)
            changeContactPhoneNumber.val(nowChange.phoneNumber)
        }
        // 通过ajax来获得一个人的联系方式，并返回nowChange
        // $.ajax({
        //     type: 'GET',
        //     url: '/getContact',
        //     data: {
        //         _id: change_id
        //     },
        //     success: function (e) {
        //         var nowChange = e[0]
        //         if (nowChange) {
        //             changeContactName.val(nowChange.name)
        //             changeContactPhoneNumber.val(nowChange.phoneNumber)
        //         }
        //         changeContactModal.modal('show')
        //     }
        // })
    })
}

var fileData = function (arr) {
    var html = ''
    arr.forEach(element => {
        html += `
        <li class="list-group-item">
                <h1>${element.name}</h1>
                <p>${element.phoneNumber}</p>
                <div class="btn-group" role="group" aria-label="...">
                    <a type="button" href="tel:${element.phoneNumber}" class="btn btn-default">拨打号码</a>
                    <button type="button" class="btn btn-default change-btn" data-_id="${element._id}">修改联系人信息</button>
                    <button type="button" class="btn btn-default delete-btn" data-_id="${element._id}">删除联系人信息</button>
                </div>
            </li>
        `
    });
    contactList.html(html)
    // 初始化之后才能获得btn的data-_id
    addEventListener()
}

// 获取全部联系人方法
var getAllContact = function () {
    $.ajax({
        type: 'GET',
        url: '/getAllContact',
        data: {},
        success: function (result) {
            // 获取到数据之后填充到页面
            fileData(result)
            console.log(result)
            contact.arr = result
        }
    })
}

// 添加联系人方法
var addContact = function (name, phoneNumber) {
    // 利用Ajax请求
    $.ajax({
        type: 'POST',
        url: '/addContact',
        data: {
            name: name,
            phoneNumber: phoneNumber
        },
        // 成功的回调函数
        success: function (result) {
            // 添加完后重新调用获取全部联系人方法
            getAllContact()
        }
    })
}
// 删除联系人方法
var deleteContact = function (_id) {
    $.ajax({
        type: 'GET',
        url: '/delete',
        data: {
            _id: _id
        },
        // 执行成功后要执行的函数
        success: function () {
            // 删除完后重新调用获取全部联系人方法
            getAllContact()
        }
    })
}
// 修改联系人方法
var changeContact = function (_id, newName, newPhoneNumber) {
    $.ajax({
        type: 'post',
        url: '/change',
        data: {
            _id: _id,
            newName: newName,
            newPhoneNumber: newPhoneNumber
        },
        success: function (e) {
            getAllContact()
        }
    })
}
// 搜索联系人方法
var searchContact = function (wd) {
    $.ajax({
        type: 'GET',
        url: '/search',
        data: {
            wd: wd
        },
        success: function (e) {
            fileData(e)
        }
    })
}

// 点击事件监听 页面一开始有的元素挂在这
var initListener = function () {
    // 点击调出模态框
    addContactBtn.on('click', function () {
        // 模态框显示
        addContactModal.modal('show')
    })
    addContactSubmit.on('click', function () {
        // 获取value值
        var name = addContactName.val()
        // value值输入完隐藏
        addContactName.val('')
        var phoneNumber = addContactPhoneNumber.val()
        addContactPhoneNumber.val('')
        addContact(name, phoneNumber)
        // 添加后隐藏模态框
        addContactModal.modal('hide')
    })
    // 修改
    changeContactSubmit.on('click', function () {
        var newName = changeContactName.val()
        changeContactName.val('')
        var newPhoneNumber = changeContactPhoneNumber.val()
        changeContactPhoneNumber.val('')
        var _id = change_id
        // 清楚_id以免影响
        change_id = ''
        changeContact(_id, newName, newPhoneNumber)
        changeContactModal.modal('hide')
    })
    // 获取搜索框输入的内容
    searchInput.on('input', function () {
        searchContact($(this).val())
    })
}

// 页面进来就做的显示的
var main = function () {
    getAllContact()
    initListener()
}
main()