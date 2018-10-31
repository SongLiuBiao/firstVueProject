/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
import router from '../routers/index'
axios.defaults.timeout = 150000
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// axios.defaults.baseURL = '/wjs-web'
// POST传参序列化
axios.interceptors.request.use(
  config => {
    if (config.data) {
        config.data = qs.stringify(config.data)
    }

    if (window.localStorage.getItem('token') !== null) {
      config.headers.Authorization = `${window.localStorage.getItem('token')}`
    }
    return config
  },
  error => {
    console.error('错误的传参')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  data => {
    if (data.status && data.status == 200 && data.data.status == 'error') {
      // Message.error({ message: data.data.msg })
      return
    }
    if (data.data.code === 6666) {
      // 验签名失败
      router.push({ path: '/wx/login' })
    }
    return data
  },
  err => {
    if (err.response.status == 504 || err.response.status == 404) {
      alert('服务器正在外太空遨游，请稍后再试~')
    } else if (err.response.status == 403) {
      alert('权限不足，请联系管理员~')
    } else {
      alert('未知错误~')
    }
    return Promise.resolve(err)
  }
)

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    if (!response.data || response.data.fstat === 0) {
      window.sessionStorage.setItem('respmsg', response.data.respmsg)
      // router.push({path: '/error'})
    }
    if (response.status === 400) {
      window.sessionStorage.setItem('respmsg', '参数异常')
      // router.push({path: '/error'})
    }
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    window.sessionStorage.setItem('respmsg', '参数异常')
    // router.push({path: '/error'})
  }
  // return response
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  // console.log(res)
  if (res.status === -404) {
    // router.push({path: '/error'})
    // console.error(res.msg)
  }
  // if (res.data && (!res.data.success)) {
  //   console.error(res.data.error_msg)
  // }
  return res
}

export default {
  POST(url, data) {
    return axios({
      method: 'post',
      url,
      data: data,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      })
  },
  GET(url, params) {
    return axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        return checkStatus(response)
      })
      .then(res => {
        return checkCode(res)
      });
  }
};
