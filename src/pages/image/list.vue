<template>
    <el-container class=" bg-white rounded" :style="{height:(h+'px')}">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
        <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
      </el-header>
      <el-container>
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange"/>
        <ImageMain ref="ImageMainRef"/>     
      </el-container>
    </el-container>
</template>

<script setup>
import {ref} from "vue"
import ImageAside from "~/components/ImageAside.vue"
import ImageMain from "~/components/ImageMain.vue"
// import ImageAside from "../../components/ImageAside.vue"
    const windowHeight=window.innerHeight||document.body.clientHeight
    const h=windowHeight-64-44-40
    // 新增图库列表的功能需要调用到imageaside的组件，所以需要加个ref为接口
    const ImageAsideRef=ref(null)
    // 点击事件
    const handleOpenCreate=()=>ImageAsideRef.value.handleCreate()
    const ImageMainRef=ref(null)
    // 拿到图库的id
    const handleAsideChange=(image_class_id)=>{
      // console.log(image_class_id)
      // 拿到组件里面暴露出来的loaddata
      ImageMainRef.value.loadData(image_class_id)
    }
    // 上传图片
const handleOpenUpload = ()=>ImageMainRef.value.openUploadFile()
</script>
<style>
    .image-header{
        border-bottom: 1px solid #eeeeee;
        @apply flex items-center;
    }

</style>