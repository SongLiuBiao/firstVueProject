/* eslint-disable */
import { default as Axios } from '../lib/http'

/**
 * 获取项目详情
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getProject(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/app/getProjectInfo', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 获取借款人列表
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getInvestBidRecords(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/app/investBidRecords', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 获取出借人列表
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getoanRecord(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/app/loanRecord', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 获取自然人
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getLoanRecordDetail(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/app/userLoanRecord', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 获取平台信息
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getInformationList(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/app/showInformation', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 获取详情
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getInformationDetail(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/app/showInfoDetail', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 获取活动分享信息
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getActivityShareInfo(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/app/getShareInfo', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 获取协议内容
 * @param reqParams http://localhost:9007/v1/data?api=protocol
 * @returns {Promise<any>}
 */
export function getInvestdeal(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/v1/data?api=protocol', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 获取出借协议信息
 * @param reqParams http://localhost:9007/v1/data?api=wPlanProtocolData&userId=220&bidId=857&wInvestId=95
 * @returns {Promise<any>}
 */
export function getLenddeal(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/v1/data?api=wPlanProtocolData', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 获取授权委托书协议信息
 * @param reqParams http://localhost:9007/v1/data?api=borrowProtocolInfo&bidId=1042
 * @returns {Promise<any>}
 */
export function getEntrust(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/v1/data?api=borrowProtocolInfo', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}


/**
 * 获取微智享服务协议
 * @param reqParams
 * @returns {Promise<any>} api=protocolList&template=winvest_agreement_template&scene=1
 */
export function getWzsInvestdealList(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/v1/data?api=protocolList', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * 退出登录接口
 * @param reqParams
 * @returns {Promise<any>}
 */
export function loginOut(reqParams) {
  return new Promise((resolve, reject) => {
    Axios.POST('/wx/loginAndRegiste/loginOut', reqParams).then(res => {
      if (res) {
        resolve(res)
      } else {
        reject('网络异常！')
      }
    })
  })
}

/**
 * H5首页banner图列表
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getBanner(){
    return new Promise((resolve,reject)=>{
      Axios.POST("/v1/data?api=banners",{}).then(res=>{
        if(res){
          resolve(res)
        }else{
          reject('网络异常！')
        }
      })
    })
    
}
/**
 * H5微智享活动页面
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getWZX(){
  return new Promise((resolve,reject)=>{
    Axios.POST("/app/activityWisdom",{}).then(res=>{
      if(res){
        resolve(res)
      }else{
        reject('网络异常！')
      }
    })
  })
  
}
/**
 * App中秋活动页面
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getNational(reqParams){
  return new Promise((resolve,reject)=>{
    Axios.POST("/app/cardCollect",reqParams).then(res=>{
      if(res){
        resolve(res)
      }else{
        reject('网络异常！')
      }
    })
  })
  
}
/**
 * App中秋活动页面
 * @param reqParams
 * @returns {Promise<any>}
 */
export function getcard(reqParams){
  return new Promise((resolve,reject)=>{
    Axios.POST("/app/obtainCard",reqParams).then(res=>{
      if(res){
        resolve(res)
      }else{
        reject('网络异常！')
      }
    })
  })
  
}

/**
 * App打卡活动- 补卡信息
 * @param reqParams
 * @returns {Promise<any>}
 */
export function suppLement(reqParams){
  return new Promise((resolve,reject)=>{
    Axios.POST("/app/obtainValue",reqParams).then(res=>{
      if(res){
        resolve(res)
      }else{
        reject('网络异常！')
      }
    })
  })
  
}
/**
 * App打卡活动--一键补卡
 * @param reqParams
 * @returns {Promise<any>}
 */
export function mendCard(reqParams){
  return new Promise((resolve,reject)=>{
    Axios.POST("/app/mendCard",reqParams).then(res=>{
      if(res){
        resolve(res)
      }else{
        reject('网络异常！')
      }
    })
  })
  
}