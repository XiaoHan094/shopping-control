<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增||刷新 -->
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small" @click="handleCreate">新增</el-button>

            <el-tooltip effect="dark" content="刷新数据" placement="top">
                <el-button size="small" text @click="$emit('refresh')">
                    <el-icon :size="15">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="content" label="公告内容" />
            
            <el-table-column prop="create_time" label="发布时间" width="380" />
            <el-table-column label="操作" widtn="180" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>

                    <el-popconfirm title="是否要删除该公告？" confirmButtonText="确认" cancelButtonText="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev, pager ,next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>

<script setup>
import { ref, reactive,computed } from "vue"
import FormDrawer from "~/components/FormDrawer.vue";


import {
    getNoticeList,
    createNotice,
    updateNotice,
    deleteNotice
} from "~/api/notice"

import {
    toast
} from "~/composables/util"

// 加载动画
const loading = ref(false)
// 分页
// 当前分页
const currentPage = ref(1)
// 总共条数默认0条
const total = ref(0)
// 每页限制十条
const limit = ref(10)
// 准备好传入数据的接口
const tableData = ref([])

// 获取公告列表数据
function getData(p = null) {
    // p是当前页码
    if (typeof p == "number") {
        currentPage.value = p
    }
    // 如需切换，就会在上面的if循环中切换再获取新的数据
    loading.value = true
    getNoticeList(currentPage.value)
        .then(res => {
            console.log(res)
            // 数据
            tableData.value = res.list
            // 总页数
            total.value = res.totalCount

        }).finally(() => {
            loading.value = false
        })
}
getData()
// // 删除
const handleDelete=(id)=>{
    loading.value=true
    deleteNotice(id).then(res=>{
        toast("删除成功")
        getData()
    }).finally(()=>{
        loading.value=false
    })

}
// 表单部分
const formDrawerRef = ref(null)

const formRef = ref(null)
const form = reactive({
    // 表单里面的内容
    title: "",
    content: ""
})
// 规则
const rules = {
    title: [{
        required: true,
        message: '公告标题不能为空',
        trigger: 'blur'
    }],
    content: [{
        required: true,
        message: '公告内容不能为空',
        trigger: 'blur'
    }]
}
// 加一个标识，因为修改和新增提交的提交是用同一个抽屉，若editId=0，代表新增，等于当前对象id就是修改
const editId=ref(0)
const drawerTitle=computed(()=>editId.value ? "修改" : "新增")
// 新增的提交，与修改
const handleSubmit = () => {
    formRef.value.validate((valid) => {
        // 传入的valid为真
        if (!valid) return
        // 展示加载loading，在FormDrawer有暴露出来
        formDrawerRef.value.showLoading()

        // 创建fun来判断是新增公告还是修改公告，editId是有值说明是修改，没有就是新增
        const fun=editId.value ? updateNotice(editId.value,form):createNotice(form)


        // 调用新增公告的接口，传入表单
        fun.then(res => {
            toast(drawerTitle.value+"成功")
            // 刷新第一页
            // 如果editId是有值的说明要修改，刷新当前页，否则是新增就要传1来刷新第一页的数据
            getData(editId.value ? false:1)

            // 表单弹框关掉
            formDrawerRef.value.close()

        })
            .finally(() => {
                formDrawerRef.value.hideLoading()
            })
    })

}
// 重置表单,因为新增和修改里面的内容不一样
function resetForm(row=false){
    if(formRef.value)formRef.value.clearValidate()

    // form里面包含title和content两个内容，如果row对象是真的，就遍历row里面form的内容和标题
    if(row){
        for(const key in form){
            // row的key值给form
            form[key]=row[key]
        }
    }
}
// 新增的打开抽屉
const handleCreate = () => {
    // editId等于0打开的就是新增的抽屉
    editId.value=0
    // 重置表单
    // 传空对象
    resetForm({
        title:"",
        content:""
    })
    formDrawerRef.value.open()
}
// 编辑的打开抽屉
const handleEdit=(row)=>{
    // editId等于当前id，就会打开不一样的抽屉
    editId.value=row.id
    // 重置表单
    // 传当前对象
    resetForm(row)
    formDrawerRef.value.open()

}
getData()
</script>