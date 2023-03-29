<template>
    <div class="flex items-center">
        <!-- 渲染动态图标 -->
        <el-icon :size="20" v-if="modelValue" class="mr-2">
            <component :is="modelValue"/>
        </el-icon>
        <!-- filterable可以进行筛选 -->
        <el-select filterable :modelValue="modelValue" class="m-2" placeholder="请选择图标" @change="handleChange">
            <el-option
            v-for="item in icons"
            :key="item"
            :label="item"
            :value="item"
            >
                <div class="flex items-center justify-between">
                    <el-icon>
                        <!-- 动态绑定图标的名称 -->
                        <component :is="item"/>
                    </el-icon>
                    <span class="text-gray-500">{{ item }}</span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>
<script setup>
import { ref } from "vue"
import * as iconList from '@element-plus/icons-vue'
defineProps({
    modelValue:String
})

const icons = ref(Object.keys(iconList))//遍历的数组，拿到了iconList对象的key值

// 用emit来记录用户选中的图标
const emit = defineEmits(["update:modelValue"])

// 执行事件
const handleChange = (icon)=>{
    emit("update:modelValue",icon)
}
</script>