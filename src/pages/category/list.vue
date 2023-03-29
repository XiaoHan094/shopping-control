<template>
    <div>
        <el-card shadow="never" class="border-0 ">
            <ListHeader @create="handleCreate" @refresh="getData"/>
            <el-tree :data="tableData" :props="{ label:'name',children:'child' }" 
            v-loading="loading" node-key="id" >
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                 
                    <span>{{ data.name }}</span>

                    <div class="iconleft">
                        <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0" 
                        @change="handleStatusChange($event,data)"/>

                        <el-button text type="primary" size="small" 
                        :loading="data.goodsDrawerLoading"
                        @click="openGoodsDrawer(data)">推荐商品</el-button>
                        <!-- handleEdit修改就是把当前的对象传过来，再将抽屉打开 -->
                        <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>
                 

                        <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(data.id)">
                            <template #reference>
                                <el-button text type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>

                </div>
            </template>
        </el-tree>


        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="form.name" style="width: 30%;" placeholder="名称"></el-input>                
                </el-form-item>
            </el-form>
        </FormDrawer>


        <GoodsDrawer ref="GoodsDrawerRef" />
        </el-card>
        
    </div>
</template>

<script setup>
import ListHeader from "~/components/ListHeader.vue"
import FormDrawer from "~/components/FormDrawer.vue"
import GoodsDrawer from "./components/GoodsDrawer.vue"
import {ref} from "vue"
import {
    getCategoryList,
    createCategory,
    updateCategory,
    updateCategoryStatus,
    deleteCategory
} from "~/api/category.js"

import{
    useInitTable,
    useInitForm
}from "~/composables/useCommon.js"




const {
    loading,//加载动画
    tableData,//获取数据的表单
    getData,//刷新数据的方法
    handleDelete,
    handleStatusChange
}=useInitTable({
    getList:getCategoryList,//获取数据的api
    onGetListSuccess:(res)=>{
        tableData.value = res.map(o=>{
            o.goodsDrawerLoading = false
            return o
        })
    },
    delete:deleteCategory,
    updateStatus:updateCategoryStatus

})


const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {

    name:"",
   
  },
  rules: {},

  getData,

  update: updateCategory,
  create: createCategory
})

const GoodsDrawerRef=ref(null)
const openGoodsDrawer=(data)=>GoodsDrawerRef.value.open(data)


</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}
.el-tree-node__content {
    padding: 40px 0;
}
.iconleft{
    margin-left: 800px;
}

</style>