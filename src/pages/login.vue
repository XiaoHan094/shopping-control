<template>
    <el-row :gutter="0" class="min-h-screen bg-indigo-500">
        <el-col :md="12" :lg="16" :offset="0" class="flex items-center justify-center">
            <div class="px-10 sm:px-30">
                <div class="sm:text-4xl xl:text-5xl font-bold text-light-50 leading-tight mb-6">欢迎光临</div>

            </div>
        </el-col>
        <el-col :md="12" :lg="8" :offset="0" class="bg-light-50 flex flex-col items-center justify-center">
            <h2 class="mt-6 text-3xl font-bold text-gray-900">欢迎回来</h2>
            <div class="flex items-center justify-center space-x-2 mt-5 mb-8">
                <span class="h-px w-16 bg-gray-200"></span>
                <span class="text-gray-300 font-normal">账号密码登录</span>
                <span class="h-px w-16 bg-gray-200"></span>
            </div>
            <el-form :model="form" :rules="rules" ref="formRef" style="width:250px;" :inline="false" size="default">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <user />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" style="width:250px;color: white;" @click="submit" :loading="loading">登 录
                    </el-button>
                </el-form-item>
            </el-form>

        </el-col>
    </el-row>


</template>

<script  setup>
 import { ref,reactive,onBeforeUnmount } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { toast } from '~/composables/util.js'
    // import  { login}  from '~/api/manager'
    const router = useRouter()

    // 拿到表单的节点
    const formRef = ref(null)
    const form = reactive({
        username:"",
        password:""
    })

    const rules = {
        username:[{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
        }],
        password:[{
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        }],
    }

    const loading = ref(false)
    const store = useStore()
    const submit = (e)=>{
        if(e.key == undefined || e.key == "Enter"){
            formRef.value.validate((valid)=>{
                if(!valid) return false
                loading.value = true

                
                store.dispatch("login",form).then(()=>{
                    toast("登录成功")
                    router.push("/")
                }).finally(()=>{
                    loading.value = false
                })
            })
        }
    }

    document.addEventListener("keyup",submit)
    onBeforeUnmount(()=>document.removeEventListener("keyup",submit))

</script>



<style scoped>

</style>