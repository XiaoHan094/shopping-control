<template>
    <el-form :model="model" label-width="80px" class="mb-3" size="small">
    <el-row :gutter="20">
        <slot/>

        <template v-if="showSearch">
            <!-- 这个是高级搜索的插槽，就是比如商品管理的除了搜索关键词，还可以添加分类进行搜索的就叫做高级搜索 -->
            <slot name="show" />
        </template>
        <el-col :span="8" :offset="showSearch ? 0 : 8">
            <div class="flex items-center justify-end">
                <el-button type="primary" @click="$emit('search')">搜索</el-button>
                <el-button @click="$emit('reset')">重置</el-button>
                <el-button type="primary" text @click="showSearch = !showSearch" v-if="hasShowSearch">
                {{ showSearch ? '收起' : "展开" }}
                    <el-icon>
                        <ArrowUp v-if="showSearch"/>
                        <ArrowDown v-else/>
                    </el-icon>
                </el-button>
            </div>
        </el-col>
    </el-row>
    </el-form>
</template>
<script setup>
import { ref,useSlots } from 'vue';
defineProps({
    model:Object
})

// 将搜索与重置两个节点暴露出去
defineEmits(["search","reset"])
const showSearch = ref(false)

const slots = useSlots()

// 强行转换为bool值
const hasShowSearch = ref(!!slots.show)
</script>