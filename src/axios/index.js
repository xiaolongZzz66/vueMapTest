import axios from "axios";
import { Message, Loading } from 'element-ui'


const apirequest = axios.create({
    baseURL: '/proxy',
    // validateStatus 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
    validateStatus: status => {
        return status >= 200 && status < 300 // 默认的
    },
    // timeout: 100
})

apirequest.interceptors.request.use(
    config => {
        let contentType = config.headers['Content-Type']
        if (contentType === null || contentType === undefined || contentType === '') {
            config.headers['Content-Type'] = 'application/json'
        }
        return config
    },
    error => {
        console.log('请求异常', error)
        Promise.reject(error)
    }
)
apirequest.interceptors.response.use(
    async response => {
        const { code, data, message } = response.data
            // 当200状态，放行，由具体业务场景做信息提示
        if (response.status == 200) {
            return Promise.resolve(response)
        } else {
            // 当非200网络状态，即2开头其他状态，统一拦截异常
            console.log('响应异常', code, message, data)
            Message({ message: `响应异常,${message}`, type: 'error' })
        }
    },
    error => {
        //Message({type: 'error', message: error })

        // 这里通信异常，统一抓取
        const { status, data, statusText, config } = error.response
        console.log('通信异常', status, data, statusText, config.url)
        Message({ message: `通信异常,请重新尝试`, type: 'error' })
            // return Promise.reject(error)
    }
)
export { apirequest }