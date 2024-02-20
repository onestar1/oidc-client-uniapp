import {chooseImage} from './index'

export function add(params) {
  // return new Promise((resolve, reject) => {
  //   uniCloud.callFunction({
  //     name: 'add',
  //     data:params
  //     //  {
  //     //   name: 'DCloud',
  //     //   subType: 'uniCloud',
  //     //   createTime: Date.now(),
  //     //   age:11
  //     // }
  //   }).then((res) => {
  //     resolve(res)
  //     console.log(res)
  //   }).catch((err) => {
  
  //     console.error(err)
  //   })
  // })
}

export function remove() {
  // uni.showLoading({
  //   title: '处理中...'
  // })
  // uniCloud.callFunction({
  //   name: 'remove'
  // }).then((res) => {
  //   uni.hideLoading()
  //   uni.showModal({
  //     content: res.result.msg,
  //     showCancel: false
  //   })
  //   console.log(res)
  // }).catch((err) => {
  //   uni.hideLoading()
  //   uni.showModal({
  //     content: `删除失败，错误信息为：${err.message}`,
  //     showCancel: false
  //   })
  //   console.error(err)
  // })
}

export function update() {
  // uni.showLoading({
  //   title: '处理中...'
  // })
  // uniCloud.callFunction({
  //   name: 'update',
  //   data: {
  //     name: 'DCloud',
  //     subType: 'html 5+',
  //     createTime: Date.now()
  //   }
  // }).then((res) => {
  //   uni.hideLoading()
  //   uni.showModal({
  //     content: res.result.msg,
  //     showCancel: false
  //   })
  //   console.log(res)
  // }).catch((err) => {
  //   uni.hideLoading()
  //   uni.showModal({
  //     content: `更新操作执行失败，错误信息为：${err.message}`,
  //     showCancel: false
  //   })
  //   console.error(err)
  // })
}

export function get() {
  // uni.showLoading({
  //   title: '加载中...'
  // })
  // return new Promise((resolve, reject) => {
  //   uniCloud.callFunction({
  //     name: 'get'
  //   }).then((res) => {
  //     uni.hideLoading()
  //     console.log(res)
  //     resolve(res.result)
  //   }).catch((err) => {
  //     uni.hideLoading()
  //     uni.showModal({
  //       content: `查询失败`,
  //       showCancel: false
  //     })
  //     console.error(err)
  //   })
  // })
}

export function useCommon() {
  console.log('请确保自己已经阅读并按照公用模块文档操作 https://uniapp.dcloud.io/uniCloud/cf-common')
  uniCloud.callFunction({
    name: 'use-common'
  }).then((res) => {
    uni.hideLoading()
    uni.showModal({
      content: '云函数use-common返回结果：' + JSON.stringify(res.result),
      showCancel: false
    })
    console.log(res)
  }).catch((err) => {
    uni.hideLoading()
    uni.showModal({
      content: `云函数use-common执行失败，错误信息为：${err.message}`,
      showCancel: false
    })
    console.error(err)
  })
}
/**
 * @description: 选择图片并上传图片
 * @param {type} 
 * @return {type} 
 * @author: hch
 */
export async function chooseImgUpload() {
  return new Promise((resolve, reject) => {
    new Promise((resolve, reject) => {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          const path = res.tempFilePaths[0]
          let ext
          // #ifdef H5
          ext = res.tempFiles[0].name.split('.').pop()
          // #endif
          // #ifndef H5
          // 字节跳动小程序ios端选择文件会带query
          ext = res.tempFilePaths[0].split('?')[0].split('.').pop()
          // #endif
          const options = {
            filePath: path,
            cloudPath: Date.now() + '.' + ext
          }
          resolve(options)
        },
        fail: () => {
          reject(new Error('Fail_Cancel'))
        }
      })
    }).then((options) => {
      uni.showLoading({
        title: '文件上传中...'
      })
      return uniCloud.uploadFile({
        ...options,
        onUploadProgress(e) {
          // console.log(e)
        }
      })
    }).then(res => {
      uni.hideLoading()
      uni.showToast({
        content: '上传成功',
        showCancel: false
      })
      resolve(res) 
    }).catch((err) => {
      uni.hideLoading()
      console.log(err);
      if (err.message !== 'Fail_Cancel') {
        uni.showToast({
          content: `图片上传失败`,
          showCancel: false
        })
      }
    })

  })
}
/**
 * @description: 上传图片
 * @param {type} 
 * @return {type} 
 * @author: hch
 */
export async function upload(path) {
  return new Promise((resolve, reject) => {
    new Promise((resolve, reject) => {
      let ext
      // #ifdef H5
      ext = path.name.split('.').pop()
      // #endif
      // #ifndef H5
      // 字节跳动小程序ios端选择文件会带query
      ext = path.split('?')[0].split('.').pop()
      // #endif
      const options = {
        filePath: path,
        cloudPath: Date.now() + '.' + ext
      }
      resolve(options)
    }).then((options) => {
      uni.showLoading({
        title: '文件上传中...'
      })
      return uniCloud.uploadFile({
        ...options,
        onUploadProgress(e) {
          // console.log(e)
        }
      })
    }).then(res => {
      uni.hideLoading()
      uni.showToast({
        content: '上传成功',
        showCancel: false
      })
      resolve(res) 
      console.log("upload -> res", res)
    }).catch((err) => {
      // uni.hideLoading()
      console.log(err);
      if (err.message !== 'Fail_Cancel') {
        uni.showToast({
          content: `图片上传失败`,
          showCancel: false
        })
      }
    })

  })
}
/**
 * @description: 存储用户信息
 * @param {type} 
 * @return {type} 
 * @author: hch
 */
export async function addUserInfo(params) {
  // uniCloud.callFunction({
  //   name: 'addUser',
  //   data:params
  // }).then((res) => {
  //   console.log(res)
  // }).catch((err) => {
  //   console.error(err)
  // })
}
/**
 * @description: 获取用户信息
 * @param {type} 
 * @return {type} 
 * @author: hch
 */
export async function getUserInfo(params) {
  // return new Promise((resolve, reject) => {
  //   uniCloud.callFunction({
  //     name: 'getUser',
  //     data:params
  //   }).then((res) => {
  //     resolve(res.result)
  //     console.log(res)
  //   }).catch((err) => {
  //     console.error(err)
  //   })
  // })
}

