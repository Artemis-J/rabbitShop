<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();
const confirm = () => {
    // 退出登录业务逻辑
    // 1.清除用户信息，触发action
    userStore.clearUserInfo();
    // 2.跳转到登录页
    router.push('/login');
}


</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <!-- 多模板渲染 区分登录和非登录状态 -->
                <!-- 登录时显示第一块，非登录显示第二块 判断：是否有token -->
                <template v-if="userStore.userInfo.token">
                    <li>
                        <a href="javascipt:;"><i class=" iconfont icon-user"></i>{{ userStore.userInfo.account }}</a>
                    </li>
                    <li>
                        <el-popconfirm @confirm="confirm" title="确认退出吗？" confirm-button-text="确认"
                            cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">Logout</a>
                            </template>
                        </el-popconfirm>
                    </li>

                    <li>
                        <RouterLink to="/member/order">My commands</RouterLink>
                    </li>
                    <li><a href="javascript:;">My Space</a></li>
                </template>

                <template v-else>
                    <!-- <li>
                        <RouterLink to="/login">Log in</RouterLink>
                    </li> -->
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                </template>
                <li><a href="javascript:;">Help center</a></li>
                <li><a href="javascript:;">About us</a></li>

            </ul>
        </div>
    </nav>
</template>

<style scoped lang="less">
.app-topnav {
    margin: 0;
    background: #333;

    ul {
        display: flex;
        height: 33px;
        justify-content: flex-end;
        align-items: center;

        li {
            a {
                padding: 0 15px;
                color: @infoColor;
                font-weight: 500;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: @helpColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}

// ~ 选择器作用：选择当前选择器后的所有元素</style>