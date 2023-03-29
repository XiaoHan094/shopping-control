<template>
    <!-- 调用数据并且保留整数 -->
    {{d.num.toFixed(0)}}

</template>
<script setup>
    import{reactive,watch} from "vue"
    // 数据滚动引用的插件
    import gsap from "gsap"
    
    // 用props接收一下
    const props = defineProps({
    value:{
        type:Number,
        default:0
    }
})
    
const d = reactive({
    num:0
})

// 动画改变方法,数字由0增加到num，耗时0.5s
function AnimateToValue(){
    gsap.to(d,{
        duration:0.5,
        num:props.value
    })
}

AnimateToValue()

// 监听事件，防止打开过程中，数据改变，而动画效果没有显示
watch(()=>props.value,()=>AnimateToValue())
</script>