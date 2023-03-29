<template>
    <!-- 弹框组件 -->
    <el-dialog
        title="规格选择"
        v-model="dialogVisible"
        width="80%"
        top="5vh">
        <!-- 容器 -->
        <el-container style="height:65vh;">
            <!-- 左边 -->
            <el-aside width="220px" class="image-aside">
                <!-- 内容 -->
                <div class="top">
                    
                    <div class="sku-list" :class="{ 'active':(activeId == item.id) }" 
                    v-for="(item,index) in tableData" :key="index" @click="handleChangeActiveId(item.id)">
                        {{ item.name }}
                    </div>
                </div>
                <!-- 分页 -->
                <div class="bottom">
                    <el-pagination 
                    background 
                    layout="prev, next" 
                    :total="total" 
                    :current-page="currentPage" 
                    :page-size="limit" 
                    @current-change="getData"/>
                </div>
            </el-aside>
            <!-- 右边内容 -->
            <el-main>
                <el-checkbox-group v-model="form.list">
                    <el-checkbox v-for="item in list" :key="item" :label="item" border>
                        {{item}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-main>
        </el-container>

        <template #footer>
            <span>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue"
import {
    getSkusList
} from "~/api/skus"
import {
    useInitTable
} from "~/composables/useCommon"

const dialogVisible = ref(false)
const activeId = ref(0)
const {
   loading,
    currentPage,
    limit,
    total,
    tableData,
    getData
} = useInitTable({
    getList:getSkusList,
     //成功拿到数据就默认选中第一个
    onGetListSuccess:(res)=>{
    //    将拿到的数据列表交给tableData
        tableData.value = res.list
        // 拿到总页数
        total.value = res.totalCount
// 如果拿到的数组有值，就把当前的第一个尺寸id交给handleChangeActiveId
        if(tableData.value.length > 0){
            handleChangeActiveId(tableData.value[0].id)
        }
    }
})

const callbackFunction = ref(null)
const open = (callback = null)=>{
    callbackFunction.value = callback
    getData(1)//刷新第一页的数据
    dialogVisible.value = true
}

const list = ref([])

// 因为form是对象所以用reactive
const form = reactive({
    name:"",
    list:[]
})

function handleChangeActiveId(id){
    // 这里前面先定义了activeId=0，当用户点击不同的item时，id进行了切换，同时，active的颜色也跟着进行重新赋值改变
    activeId.value = id
    list.value = []
    // 将tableData数组中的数据中找到与id相匹配的id，赋值给item
    let item = tableData.value.find(o=>o.id == id)
    if(item){
        // item里面的default内容逐个用，隔开
        list.value = item.default.split(",")
        // form里面放的是list数组
        form.name = item.name
    }
}

const submit = ()=>{
    if(typeof callbackFunction.value === "function"){
        callbackFunction.value(form)
    }
    dialogVisible.value = false
}

defineExpose({
    open
})
</script>
<style>
.image-aside{
  border-right: 1px solid #eeeeee;
  position: relative;
}
.image-aside .top
{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom
{
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
.sku-list {
    border-bottom: 1px solid #f4f4f4;
    @apply p-3 text-sm text-gray-600 flex items-center cursor-pointer;
}
.sku-list:hover,active {
    @apply bg-blue-50;
}
</style>