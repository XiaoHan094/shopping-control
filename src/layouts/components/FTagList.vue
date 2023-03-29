<template>
    <div class="f-tag-list" :style="{left:$store.state.asideWidth}">
        <el-tabs v-model="activeTab" type="card" class="flex-1"  @tab-remove="removeTab" style="min-width: 100px;"
        @tab-change="changeTab">
            <el-tab-pane :closable="item.path!='/'" v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path">
             
            </el-tab-pane>
        </el-tabs>

     <span class="tag-btn">
        <el-dropdown @command="handleClose">
            <span class="el-dropdown-link">

                <el-icon>
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
            
                </el-dropdown-menu>
            </template>
        </el-dropdown>
     </span>
    </div>
    <div style="height:44px;"></div>
</template>

<script  setup>
import { useTabList } from "~/composables/useTabList.js"
const {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
} = useTabList()

</script>

<style>
.f-tag-list{
    @apply fixed  flex items-center px-2 bg-light-200;
    
    top: 66px;
    right: 2px;
    height: 50px;
    z-index: 100;
    
   
}
        /* ml-auto的意思是margin-left:auto     px-2是左右的内间距*/
.tag-btn{
    @apply bg-white rounded ml-auto flex items-center justify-center px-2;
    height: 25px;
    margin-top: -9px;
}
:deep(.el-tabs__header){
    border: 0!important;
    @apply mb-0;
}
:deep(.el-tabs__nav){
    border: 0!important;
}
:deep(.el-tabs__item){
    border: 0!important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}
:deep(.el-tabs__nav-next),:deep(.el-tabs__nav-prev){
    line-height: 32px;
    height: 32px;
}
:deep(.is-disabled){
    cursor: not-allowed;
    @apply text-gray-300;
}

</style>