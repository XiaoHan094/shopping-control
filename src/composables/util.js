import { ElLoading, ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'
// 成功提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}

// 消息提示（退出登录的提示框
export function showModal(content="提示内容",type="warning",title=""){
    
    return  ElMessageBox.confirm(
          content,
          title,
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type,
          }
        )
    

}

// 显示全屏loading
export function showFullLoading(){
    nprogress.start()
}
// 隐藏全屏loading
export function hideFullLoading(){
    nprogress.done()
}

// 弹出输入框
export function showPrompt(tip,value = ""){
    return ElMessageBox.prompt(tip, '', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    //   输入框原来的写的什么
      inputValue:value
    })
  }

  // 将query对象转成url参数
export function queryParams(query){
  let q = []
  for (const key in query) {
      if(query[key]){
          q.push(`${key}=${encodeURIComponent(query[key])}`)
      }
  }

  // 进行拼接
  let r = q.join("&")
  r = r ? ("?"+r) : ""
  return r
}


// 步骤：[1,2,3,4]->[2,2,3,4]->[2,1,3,4]
// 排序时上移与下移
export function useArrayMoveUp(arr,index){
  swapArray(arr,index,index-1)

}

export function useArrayMoveDown(arr,index){

  swapArray(arr,index,index+1)
}

// 顺序交换
function swapArray(arr,index1,index2){
  arr[index1]=arr.splice(index2,1,arr[index1])[0]
  return arr
}

// sku排列算法
export function cartesianProductOf() {
  return Array.prototype.reduce.call(arguments, function (a, b) {
      var ret = [];
      a.forEach(function (a) {
          b.forEach(function (b) {
              ret.push(a.concat([b]));
          });
      });
      return ret;
  }, [
      []
  ]);
}