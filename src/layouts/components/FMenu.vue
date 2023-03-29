<template>
    <!-- 侧边栏宽度动态绑定 -->
    <!-- <div class="f-menu" :style="{width:$store.state.asideWidth}"> -->
        <div class="f-menu" :style="{ width:$store.state.asideWidth }">
        <!-- collapse是定义是否可以折叠的状态 ,unique-opened是保持一个菜单展开-->
        <el-menu :default-active="defaultActive" unique-opened :collapse="isCollapse"
         default-active="2" class="border-0" @select="handleSelect" :collapse-transition="false">
            <!-- 遍历api接口中的-获取管理员信息和权限菜单部分有多少目录与子目录 -->
            <template v-for="(item,index) in asideMenus" :key="index">
                <!-- 如果子目录存在，且子目录数量大于0 -->
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <!-- 图标部分绑定一个组件 -->
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>
                            {{item.name}}
                        </span>
                    </template>


                    <el-menu-item v-for="(item2,index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <!-- 这个是只有一级图标的遍历方法 -->
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <!-- 图标部分绑定一个组件 -->
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>
                        {{item.name}}
                    </span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import{computed,ref} from 'vue';
// import store from '../../store';
import {useStore} from 'vuex';
// 引入onBeforeRouteUpdate全局路由守卫，监听页面变化
import{useRouter ,useRoute,onBeforeRouteUpdate} from 'vue-router';
const store=useStore()
// const store = useStore()
const router = useRouter()

const route = useRoute()
// const route=useRoute()
// 参考api接口的获取管理员信息和权限菜单
const asideMenus = computed(()=>store.state.menus)

const handleSelect=(e)=>{
    // 拿到路径
    router.push(e)
}

// 是否折叠
const isCollapse = computed(()=> !(store.state.asideWidth == '250px'))

// 默认选中，就是侧边栏的一级一打开，就默认打开第一个儿子
const defaultActive = ref(route.path)

// 监听路由变化,左侧导航栏随用户上方点击进行高亮显示
onBeforeRouteUpdate((to,from)=>{
    defaultActive.value=to.path
})
</script>
<style>
.f-menu {
    /* width要动态绑定，后续的侧边栏宽度变换需要 */
    /* width: 250px; */
    top: 64px;
    bottom: 0;
    left: 0;
    /* 溢出自动添加滚动 */
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow-md fixed bg-light-50;
    transition: all 0.2s;
}

/* 滚动条宽度设置为0 */
.f-menu::-webkit-scrollbar{
    width: 0px;
}
</style>