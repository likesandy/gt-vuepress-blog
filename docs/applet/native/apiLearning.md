---
autoGroup-8: 系统API学习
---

## 网络请求

### 基本使用

微信提供了专属的 API 接口,用于网络请求: wx.request(Object object)

:books: [官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)

```js
// pages/home/home.js

/**
  * 生命周期函数--监听页面加载
  */
onLoad: function (options) {
  // 发送网络请求
  // 1.发送最简单的get请求
  wx.request({
    url: 'http://123.207.32.32:8000/home/multidata',
    success(res) {
      console.log(res)
    }
  })
  // 2.get请求携带参数
  wx.request({
    // get请求参数可以在url中添加也可以在data中添加
    url: 'http://123.207.32.32:8000/home/multidata?type=sele&page=1',
    // data: {
    //   type: 'sele',
    //   page: 1
    // },
    success(res) {
      console.log(res)
    }
  })
  // 3.post请求,携带参数
  wx.request({
    // get请求参数可以在url中添加也可以在data中添加
    url: 'http://httpbin.org/post',
    method: 'POST',
    data: {
      name: 'codertao',
      age: 19
    },
    success(res) {
      console.log(res)
    },
    fail(error) {
      console.log(error)
    },
    complete() {
      console.log('接口调用完毕')
    }
  })
},
```

![](/applet/native/41.png)

### 请求封装

- 目前我们采用的网络请求是非常古老的请求方式, 我们将它封装成 Promise 的方式

开发中如果想要发送网络请求,我一般在 service/network 中发送网络请求

```js
// service/network.js
export default function request(options) {
  // Promise最大的好处就是防止出现回调地狱
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || "get",
      data: options.data || {},
      success: resolve,
      fail: reject,
    });
  });
}
```

```js
// pages/home/home.js

import request from '../../service/network'
onLoad: function (options) {
  request({
    url: 'http://123.207.32.32:8000/home/multidata',
  }).then(res => {
    console.log(res)
  }).catch(error => {
    console.log(error)
  })
}
```

![](/applet/native/42.png)

## 展示弹窗

- 小程序中展示弹窗有四种方式: showToast、showModal、showLoading、showActionSheet

:books:[官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html)

```xml
<!--pages/home/home.wxml-->
<button>按钮</button>
<button size="mini" bindtap="toast">弹窗</button>
<button size="mini" bindtap="modal">选择</button>
<button size="mini" bindtap="loding">加载</button>
<button size="mini" bindtap="actionSheet">上传</button>
```

```js
toast() {
  wx.showToast({
    title: 'Hello World',
    icon: 'loading',
    duration: 1000,
    mask: true,
    success() {
      console.log('成功')
    },
    fail() {
      console.log('失败')
    },
    complete() {
      console.log('结束')
    }
  })
},
modal() {
  wx.showModal({
    content: '是否进行闯关',
    cancelColor: 'blue',
    cancelText: '溜了溜了',
    confirmText: '奥利给',
    confirmColor: 'red',
    success(res) {
      if (res.confirm) {
        console.log('用户点击了确定')
      }
      if (res.cancel) {
        console.log('用户点击了取消')
      }
    },
    fail() {
      console.log('选择界面加载失败')
    },
    complete() {
      console.log('选择完毕')
    }
  })
},
loding() {
  wx.showLoading({
    title: '加载界面',
    mask: true,
    success() {
      console.log('接口调用成功')
    },
    fail() {
      console.log('接口调用失败')
    },
    complete() {
      console.log('接口调用完毕')
    },
  })
  setTimeout(() => {
    // 必须手动hideLoding才会让Loding消失
    wx.hideLoading()
  }, 1000)
},
actionSheet() {
  wx.showActionSheet({
    itemList: ['拍照', '相册'],
    itemColor: 'red',
    success(res) {
      console.log(res)
    }
  })
},
```

![](/applet/native/43.png)

![](/applet/native/44.png)

![](/applet/native/45.png)

![](/applet/native/46.png)

## 页面分享

## 登录流程

## 页面跳转
