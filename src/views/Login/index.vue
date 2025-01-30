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

                <el-form>
                    <el-form-item label="账户">
                        <el-input class="w-full" />
                    </el-form-item>

                    <el-form-item label="密码">
                        <el-input type="password" class="w-full" />
                    </el-form-item>

                    <el-form-item label-width="22px">
                        <el-checkbox size="large" class="text-gray-600">
                            我已同意隐私条款和服务条款
                        </el-checkbox>
                    </el-form-item>

                    <el-button size="large" class="w-full bg-emerald-400 text-white hover:bg-white-400">
                        点击登录
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>

    <!-- footer -->
</template>