import axios from '~/axios'

// 获取商品规格列表
export function getRuleList(page){
    return axios.get(`/admin/rule/${page}`)
}

// 增加商品规格
export function createRule(data){
    return axios.post("/admin/rule",data)
}

// 修改商品规格
export function updateRule(id,data){
    return axios.post("/admin/rule/"+id,data)
}

// 修改商品规格状态
export function updateRuleStatus(id,status){
    return axios.post(`/admin/rule/${id}/update_status`,{
        status
    })
}

// 批量删除商品规格
export function deleteRule(id){
    return axios.post(`/admin/rule/${id}/delete`)
}