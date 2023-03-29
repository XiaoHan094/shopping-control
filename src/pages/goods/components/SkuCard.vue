<template>
    <el-form-item label="规格选项" v-loading="bodyLoading">
        <el-card shadow="never" class="w-full mb-3" v-for="(item,index) in sku_card_list" :key="item.id" v-loading="item.loading">
            <template #header>
                <div class="flex items-center">
                    <el-input v-model="item.text" placeholder="规格名称" style="width:200px;" @change="handleUpdate(item)">
                        <template #append>
                            <el-icon class="cursor-pointer" @click="handleChooseSku(item)"><more/></el-icon>
                        </template>
                    </el-input>
                 <!-- :disabled="index==0",就是等于index=0，就不让他上移了 -->

                    <el-button class="ml-auto" size="small" @click="sortCard('up',index)" :disabled="index == 0">
                        <el-icon><Top /></el-icon></el-button>

                    <el-button size="small" @click="sortCard('down',index)" :disabled="index === (sku_card_list.length - 1)">
                        <el-icon><Bottom /></el-icon></el-button>

                    <el-popconfirm title="是否要删除该选项？" 
                        confirmButtonText="确认" cancelButtonText="取消"
                        @confirm="handleDelete(item)">
                        <template #reference>
                            <el-button size="small"><el-icon><Delete /></el-icon></el-button>
                        </template>
                    </el-popconfirm>
                            
                </div>
            </template>
                        <!-- skuCardId在这里拿到 -->
            <SkuCardItem :skuCardId="item.id"/>
        </el-card>
        <el-button type="success" size="small" :loading="btnLoading" @click="addSkuCardEvent">添加规格选项</el-button>
        
    </el-form-item>

    <ChooseSku ref="ChooseSkuRef" />
</template>



<script setup>
import {ref} from "vue"
import SkuCardItem from "./SkuCardItem.vue";

import ChooseSku from "~/components/ChooseSku.vue"
// 存放预设商品规格信息的列表
import {
    sku_card_list,//规格选项列表的数组
    addSkuCardEvent,//添加商品规格的触发事件
    btnLoading,//添加商品多规格后的加载事件
    handleUpdate,//监控input输入框内的内容是否改变
    handleDelete,//删除按钮
    sortCard,//排序算法的点击事件触发
    bodyLoading,//整个商品多规格后的加载事件
    handleChooseSetGoodsSkusCard
}from "~/composables/useSku.js"


const ChooseSkuRef=ref(null)
const handleChooseSku = (item)=>{
    ChooseSkuRef.value.open((value)=>{
        handleChooseSetGoodsSkusCard(item.id,{
            name:value.name,
            value:value.list
        })
    })
}
</script>

<style>
.el-card__header {
    @apply !p-2 bg-gray-50;
}</style>