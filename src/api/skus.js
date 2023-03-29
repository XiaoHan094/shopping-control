import axios from '~/axios'

//获取优惠券列表
export function getSkusList(page){
    return axios.get(`/admin/skus/${page}`)
}
// 增加优惠券
export function createSkus(data){
    return axios.post("/admin/skus",data)
}
// 修改优惠券
export function updateSkus(id,data){
    return axios.post("/admin/skus/"+id,data)
}
// 删除优惠券
export function deleteSkus(ids){
    ids = !Array.isArray(ids) ? [ids] : ids
    return axios.post(`/admin/skus/delete_all`,{ ids })
}

// 失效优惠券
export function updateSkusStatus(id,status){
    return axios.post(`/admin/skus/${id}/update_status`,{
        status
    })
}