<template>
<!-- 修改轮播图的组件 -->
<el-drawer title="设置轮播图" v-model="dialogVisible" direction="rtl" size="50%" destroy-on-close>
    <el-form :model="form"  label-width="80px" >
        <el-form-item label="轮播图">
            <ChooseImage v-model="form.banners" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
            
        </el-form-item>
    </el-form>
    
</el-drawer>


</template>
<script setup>
import {ref,reactive} from "vue"
import ChooseImage from "~/components/ChooseImage.vue";

import {
    readGoods,
    setGoodsBanner
} from "~/api/goods"
import { toast } from "~/composables/util";

// 默认false，弹框不显示
const dialogVisible=ref(false)

// 刷新数据
const emit=defineEmits(["reloadData"])

const form=reactive({
    banners:[]
})

// 准备接受传过来的商品id
const goodsId=ref(0)

// 暴露一个打开方法
const open=(row)=>{
    // console.log(row);
    goodsId.value=row.id
    row.bannersLoading=true
    // 打开
    readGoods(goodsId.value).then(res=>{
        // console.log(res);
        // 拿到的goodsBanner是一个数组，所以用map遍历里面的每一个url
        form.banners=res.goodsBanner.map(o=>o.url)
        dialogVisible.value=true
       

    }).finally(()=>{
    row.bannersLoading=false

    })
}

const loading=ref(false)
const submit=()=>{
    loading.value=true
    setGoodsBanner(goodsId.value,form).then(res=>{
        toast("设置轮播图成功")
        dialogVisible.value=false
        emit("reloadData")
    })
    .finally(()=>{
        loading.value=false
    })

}

defineExpose({
    open
})

</script>