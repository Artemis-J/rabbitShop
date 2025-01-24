<script setup>
import { reactive, ref, watch } from 'vue';
import { useMouseInElement } from '@vueuse/core';

//图片列表
const imageList = [
    "https://yanxuan-item.nosdn.127.net/3683d874b9623434a10b4ab0c2e6be9f.png",
    "https://yanxuan-item.nosdn.127.net/87e67decbff7cc5b4d02050b8cd62d2f.png",
    "https://yanxuan-item.nosdn.127.net/11956ee9b0657112819ad4b307cd6765.png",
    "https://yanxuan-item.nosdn.127.net/6e76349dcd4f8e0ffe4d0d0960a17ad9.png",
    "https://yanxuan-item.nosdn.127.net/0774f25b48c256a59e9e8f21e51fadae.png",
];

// 当前预览图的索引
const currIndex = ref(0);

// 1. 是否显示放大镜和大图
const show = ref(false);

// 2. 放大镜的坐标
const layerPosition = reactive({
    left: 0,
    top: 0,
});

// 3. 使用useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
const target = ref(null);
const { elementX, elementY, isOutside } = useMouseInElement(target);

watch([elementX, elementY, isOutside], () => {
    show.value = !isOutside.value;//在区域内才显示放大镜

    const position = { x: 0, y: 0 }; //放大镜初始坐标

    //横向
    //鼠标水平不超过放大镜模块的一半时，放大镜不动
    if (elementX.value < 100) position.x = 0;
    //鼠标水平超过（显示图宽度-放大镜宽度+放大镜一半宽度）时，放大镜停止移动，防止出界
    else if (elementX.value > 300) position.x = 200;
    else position.x = elementX.value - 100;
    
    //纵向同理
    if (elementY.value < 100) position.y = 0;
    else if (elementY.value > 300) position.y = 200;
    else position.y = elementY.value - 100;

    // 给样式赋值
    layerPosition.left = `${position.x}px`;
    layerPosition.top = `${position.y}px`;
});


</script>

<template>
    <div class="image-preview flex m-4">
        <!-- 左侧显示图 -->
        <div class="main-image relative w-[400px] h-[400px] flex justify-center items-center bg-gray-200 " ref="target"
            :style="largePosition">
            <img id="mainImage" :src="imageList[currIndex]" alt="" class="w-full h-full object-cover">
            <!-- 放大镜 -->
            <div v-show="show" class="magnifier absolute w-[200px] h-[200px] bg-gray-500 bg-opacity-50 overflow-hidden"
                :style="layerPosition">
            </div>
        </div>

        <!-- 右侧缩略图 -->
        <div class="thumbnails w-[80px] flex flex-col items-center pl-4">
            <ul class="w-full space-y-4">
                <li v-for="(image, i) in imageList" :key="i"
                    :class="['relative w-[68px] h-[68px] mb-[15px] border-2 cursor-pointer', { 'border-blue-500': i === currIndex }]"
                    @mouseenter="currIndex = i">
                    <img :src="image" alt="" class="w-full h-full object-cover">
                </li>
            </ul>
        </div>
    </div>


</template>
