<script setup>
//定义props
defineProps({
    //主标题
    title: {
        type: String
    },
    //副标题
    subTitle: {
        type: String
    }
})
</script>

<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <h3>{{ title }}<small>{{ subTitle }}</small></h3>
                <!-- 右上角插槽 -->
                <slot name="right" />
            </div>
            <!-- 默认插槽，面板内容 -->
            <slot />
        </div>
    </div>
</template>

<style scoped lang="less">
.home-panel {
    background-color: #fff;
    margin-left: 200px;

    .head {
        padding: 40px 0;
        display: flex;
        align-items: flex-end;

        h3 {
            flex: 1;
            font-size: 32px;
            font-weight: normal;
            margin-left: 6px;
            height: 35px;
            line-height: 35px;

            small {
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }
    }
}
</style>