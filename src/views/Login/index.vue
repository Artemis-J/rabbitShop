<script setup>
import { ref } from 'vue';

// 准备表单对象
const form = ref({
    account: '',
    password: '',
    agree: true
})

// 准备规则对象
const rules = {
    account: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码长度需要6-14字符', trigger: 'blur' },
    ],
    agree: [
        {
            validator: (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    callback(new Error('请勾选协议'));
                }

            }
        }
    ]
}

// 获取form实例做统一校验
const formRef = ref(null);
const doLogin = ()=>{
    // 调用实例方法
    formRef.value.validate((valid)=>{
        // valid:所有表单都通过校验才为true
        console.log(valid);
        // 以valid作为判断条件，如果通过才登录
        if(valid){
            //登录
        }
    })
}

</script>


<template>
    <div class="min-h-screen flex flex-col">
        <!-- header -->
        <header class="w-full flex justify-between items-center pl-16 py-14 bg-white shadow-md">
            <h1 class="text-2xl font-bold text-gray-800">
                <RouterLink to="/"><img src="@/assets/images/logo.png" alt="Banner" class="w-1/3 h-1/3 object-cover" />
                </RouterLink>
            </h1>
            <RouterLink class="text-gray-600 flex items-center space-x-1 hover:text-blue-500" to="/">
                <span>回到首页</span>
                <i class="iconfont icon-angle-right"></i>
                <i class="iconfont icon-angle-right"></i>
            </RouterLink>
        </header>


        <!-- bg-image -->
        <div class="relative w-full">
            <img src="@/assets/images/login-bg.png" alt="Banner" class="w-full h-[500px] object-cover" />
            <!-- login -->
            <div
                class="absolute top-1/2 right-1/4 transform -translate-y-1/2 bg-white shadow-lg p-8 rounded-lg w-96 max-w-sm">
                <nav class="text-xl font-semibold text-gray-700 mb-6">
                    <a href="javascript:;" class="border-b-2 border-blue-500 pb-1">账户登录</a>
                </nav>

                <el-form ref="formRef" :model="form" :rules="rules">
                    <el-form-item prop="account" label="账户">
                        <el-input v-model="form.account" class="w-full" />
                    </el-form-item>

                    <el-form-item prop="password" label="密码">
                        <el-input v-model="form.password" type="password" class="w-full" />
                    </el-form-item>

                    <el-form-item prop="agree" label-width="22px">
                        <el-checkbox v-model="form.agree" size="large" class="text-gray-600">
                            我已同意隐私条款和服务条款
                        </el-checkbox>
                    </el-form-item>

                    <el-button size="large" class="w-full bg-emerald-400 text-white hover:bg-white-400" @click="doLogin">
                        点击登录
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>

    <!-- footer -->
</template>