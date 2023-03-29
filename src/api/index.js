import axios from '~/axios'

// 首页数据获取
// 订单传值
export function getStatistics1(){
    return axios.get("/admin/statistics1")
}

// 主控台最后一部分的数据获取
// 店铺提示，交易提示传值
export function getStatistics2(){
    return axios.get("/admin/statistics2")
}

// 动态图表,有传一个type值
// 主控动态传值
export function getStatistics3(type){
    return axios.get("/admin/statistics3?type="+type)
}