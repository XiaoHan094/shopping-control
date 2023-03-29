<template>
    <div class="aside-list" :class="{ 'active' : active }">
        <!-- truncate是超出部分用点点点的形式表现 -->
        <!-- 加上class="ml-auto"可以把所有图标推向最右边 -->
        <span class="truncate">
            <slot />
        </span>
<!-- 加.stop是阻止冒泡事件 -->
        <el-button class="ml-auto px-1" text type="primary" size="small" @click.stop="$emit('edit')">
            <el-icon :size="12">
                <Edit />
            </el-icon>
        </el-button>

        <span @click.stop="()=>{}">
            <el-popconfirm title="是否要删除该分类？" confirmButtonText="确认" cancelButtonText="取消" @confirm.stop="$emit('delete')">
                <template #reference>
                    <el-button text class="px-1" type="primary" size="small">
                        <el-icon :size="12"><Close /></el-icon>
                    </el-button>
                </template>
            </el-popconfirm>
        </span>
    </div>
</template>

<script setup>
defineProps({
    active: {
        type: Boolean,
        default: false
    }
})
// 暴露两个事件出去
defineEmits(["edit", "delete"])
</script>
<style>
.aside-list {
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center p-3 text-sm text-gray-600;
}

.aside-list:hover,
.active {
    @apply bg-blue-50;
}
</style>