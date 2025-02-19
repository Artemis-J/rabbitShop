<script setup>
// 定义 props
defineProps({
    // 主标题
    title: {
        type: String
    },
    // 副标题
    subTitle: {
        type: String
    }
})
</script>

<template>
    <div class="bg-white">
        <div class="container">
            <div class="flex items-end py-10">
                <h3 class="flex-1 text-[32px] font-normal ml-2 h-[35px] leading-[35px]">
                    {{ title }}
                    <small class="text-[16px] text-gray-500 ml-5">{{ subTitle }}</small>
                </h3>
                <!-- 右上角插槽 -->
                <slot name="right" />
            </div>
            <!-- 默认插槽，面板内容 -->
            <slot />
        </div>
    </div>
</template>
