<template>
    <!-- elementuui的container布局 -->
    <el-container>
        <el-header>
            <!-- 头部 -->
            <f-header />
        </el-header>
        <el-container>
            <!-- 随着是否折叠宽度进行改变 -->
            <el-aside :width="$store.state.asideWidth">
                <!-- 侧边 -->
                <f-menu></f-menu>
            </el-aside>
            <el-main>
                <!-- 标签导航栏 -->
                <f-tag-list />
                <!-- 渲染子组件 -->
                <router-view v-slot="{Component}">
                    <transition name="fade">
                        <!-- vue里面自带的component组件 -->
                        <keep-alive :max="10">
                            <component :is="Component" class="maincontent mt-1"></component>
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTagList from './components/FTagList.vue'
</script>

<style>
.el-aside {
    transition: all 0.2s;
}

/* 全局过渡动画 */
.fade-enter-from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);

}

.fade-enter-to {

    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.fade-leave-from {
    opacity: 1;

}

.fade-leave-to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-active {
    transition-delay: 0.3s;
}

.maincontent{
    margin-left: -8px;
    margin-top: 2px;
}
</style>