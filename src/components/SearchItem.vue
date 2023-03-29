<template>
    <!-- 这个插槽是搜索框的关键词插槽 -->
    <el-col :span="8" :offset="0">
        <el-form-item :label="label">
            <slot/>
        </el-form-item>
    </el-col>
</template>
<script setup>
    defineProps({
        label:String
    })
</script>