<script setup>

</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="true">
                    <li>
                        <a href="javascipt:;"><i class=" iconfont icon-user"></i>Artemis</a>
                    </li>
                    <li><a href="javascript:;">Logout</a></li>
                    <li>
                        <RouterLink to="/member/order">My commands</RouterLink>
                    </li>
                    <li><a href="javascript:;">My Space</a></li>
                </template>
                <template v-else>
                    <li>
                        <RouterLink to="/login">Log in</RouterLink>
                    </li>
                    <li><a href="javascript:;">register</a></li>
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

// ~ 选择器作用：选择当前选择器后的所有元素
</style>