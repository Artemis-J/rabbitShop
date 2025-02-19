<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const confirmLogout = () => {
    userStore.clearUserInfo();
    router.push('/login');
};
</script>

<template>
    <nav class="bg-gray-800 text-gray-300 py-2">
        <div class="container mx-auto flex justify-end items-center space-x-4">
            <template v-if="userStore.userInfo.token">
                <a href="javascript:;" class="flex items-center space-x-1 hover:text-white">
                    <i class="iconfont icon-user text-sm"></i>
                    <span>{{ userStore.userInfo.account }}</span>
                </a>

                <el-popconfirm @confirm="confirmLogout" title="Are you sure to Logout？" confirm-button-text="yes" cancel-button-text="no">
                    <template #reference>
                        <a href="javascript:;" class="hover:text-white">Logout</a>
                    </template>
                </el-popconfirm>

                <RouterLink to="/member/order" class="hover:text-white">My commands</RouterLink>
                <a href="javascript:;" class="hover:text-white">My Space</a>
            </template>

            <template v-else>
                <a href="javascript:;" @click="$router.push('/login')" class="hover:text-white">Sign in</a>
            </template>

            <a href="javascript:;" class="hover:text-white">Help center</a>
            <a href="javascript:;" class="hover:text-white">About us</a>
        </div>
    </nav>
</template>
