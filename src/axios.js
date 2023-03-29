import axios from 'axios'
import { toast } from '~/composables/util'
import { getToken } from '~/composables/auth'
import store from '~/store'
const service = axios.create({
    //axios中请求配置有baseURL选项，表示请求URL公共部分
   // baseURL: "http://ceshi13.dishait.cn"
    baseURL: "/api"
})
// const service = axios.create({
//     baseURL:import.meta.env.VITE_APP_BASE_API,
// })

//request拦截器
service.interceptors.request.use(config => {
    const token = getToken()
    if (token) {
        config.headers['token'] = token
    }
    return config
}, error => {
    Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(res => {
        return res.request.responseType == "blob" ? res.data : res.data.data
    },
    error => {
        let msg = error.response.data.msg || "请求失败"
        if (msg == "非法token，请先登录！") {
            store.dispatch("logout").finally(() => location.reload())
        }
        toast(msg, "error", error.response.data.errorCode == 40000)

        return Promise.reject(error)
    }
)


// // 添加请求拦截器
// service.interceptors.request.use(function (config) {
//     // 往header头自动添加token
//     const token = getToken()
//     if(token){
//         config.headers["token"] = token
//     }
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

//   // 添加响应拦截器
// service.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response.request.responseType == "blob" ? response.data : response.data.data;
//   }, function (error) {
//     const msg = error.response.data.msg || "请求失败"  
//     if(msg == "非法token，请先登录！"){
//       store.dispatch("logout").finally(()=>location.reload())
//     }
//     toast(msg,"error")
//     return Promise.reject(error);
//  })

export default service