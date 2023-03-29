import axios from '~/axios'
import { queryParams } from "~/composables/util"

export function getOrderList(page,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/order/${page}${r}`)
}


export function deleteOrder(ids){
    return axios.post(`/admin/order/delete_all`,{
        ids
    })
}

// 导出订单excel
export function exportOrder(query = {}){
    let r = queryParams(query)
    return axios.post(`/admin/order/excelexport${r}`,{},{
        responseType:"blob"
    })
}

//查询物流信息
export function getShipInfo(id){
    return axios.get(`/admin/order/${id}/get_ship_info`)
}

export function refundOrder(id,data){
    return axios.post(`/admin/order/${id}/handle_refund`,data)
}