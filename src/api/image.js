import axios from "~/axios"

// id与page是变量，加反引号就可以直接传
// 获取图库列表
export function getImageList(id,page = 1){
    return axios.get(`/admin/image_class/${id}/image/${page}`)
}

// 修改图片名称
export function updateImage(id,name){
    return axios.post(`/admin/image/${id}`,{ name })
}

// 删除图片
export function deleteImage(ids){
    return axios.post(`/admin/image/delete_all`,{ ids })
}

// 上传图片
export const uploadImageAction = import.meta.env.VITE_APP_BASE_API + "/admin/image/upload"