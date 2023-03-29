<script setup>

</script>

<template>
<!-- <button>ass</button> -->
<router-view></router-view> 

</template>

<style>
    /* 全局进度条样式 */
    #nprogress .bar{
        background-color:#f4f4f4!important;
        height: 3px!important;
    }

    body{
        @apply bg-gray-100;
    }

    ::-webkit-scrollbar{
        width: 4px;
        height: 6px;
    }
    ::-webkit-scrollbar-corner{
        display: block;

    }
    /* 滚动条小框 */
    ::-webkit-scrollbar-thumb{
        border-radius: 8px;
        background-color: blueviolet;
    }

    /* 滚动条轨道 */
    ::-webkit-scrollbar-track,::-webkit-scrollbar-thumb{
        border-left-color: transparent;
        border-right-color:transparent;
        background-color: rgba(0,0,0,0.1);

    }

</style>
