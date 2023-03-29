import axios from "~/axios"

// 引入图库列表模块
export function getImageClassList(page){
    return axios.get("/admin/image_class/" + page)
}

// 创建图库列表模块
export function createImageClass(data){
    return axios.post("/admin/image_class",data)
}

// 修改图库分类列表模块
export function updateImageClass(id,data){
    return axios.post("/admin/image_class/"+id,data)
}

// 删除图库分类列表模块
export function deleteImageClass(id){
    return axios.post(`/admin/image_class/${id}/delete`)
}