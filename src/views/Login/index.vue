<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

// 准备表单对象
const form = ref({
    account: '',
    password: '',
    agree: true
})

// 准备规则对象
const rules = {
    account: [
        { required: true, message: 'Username cannot be empty', trigger: 'blur' }
    ],
    password: [
        { required: true, message: 'Password cannot be empty', trigger: 'blur' },
        { min: 6, max: 14, message: 'The password must be 6-14 characters', trigger: 'blur' },
    ],
    agree: [
        {
            validator: (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    callback(new Error('Please check the agreement'));
                }

            }
        }
    ]
}

// 获取form实例做统一校验
const formRef = ref(null);
const router = useRouter();
const doLogin = () => {
    const { account, password } = form.value;//解构赋值
    // 调用实例方法
    formRef.value.validate(async (valid) => {
        // valid:所有表单都通过校验才为true
        console.log(valid);
        // 以valid作为判断条件，如果通过才登录
        if (valid) {
            //登录 account:xiaotuxian001 password:123456
            await userStore.getUserInfo({ account, password });
            // 提示用户成功
            ElMessage({ type: 'success', message: 'Login successful' });
            //跳转首页
            router.replace({ path: '/' });
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
                <span>Go to HomePage</span>
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
                    <a href="javascript:;" class="border-b-2 border-blue-500 pb-1">Login</a>
                </nav>

                <el-form ref="formRef" :model="form" :rules="rules">
                    <el-form-item prop="account" label="Username">
                        <el-input v-model="form.account" class="w-full" />
                    </el-form-item>

                    <el-form-item prop="password" label="Password">
                        <el-input v-model="form.password" type="password" class="w-full" />
                    </el-form-item>

                    <el-form-item prop="agree" label-width="22px">
                        <el-checkbox v-model="form.agree" size="large" class="text-gray-600">
                            I agree the agreement
                        </el-checkbox>
                    </el-form-item>

                    <el-button size="large" class="w-full bg-emerald-400 text-white hover:bg-white-400"
                        @click="doLogin">
                        Sign in
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>

    <!-- footer -->
</template>