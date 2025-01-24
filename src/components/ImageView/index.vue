<script setup>
import { reactive, ref, watch } from 'vue';
import { useMouseInElement } from '@vueuse/core';

//props适配图片列表
//用defineProps定义组件的props属性
//props是 Vue 组件接收外部传递数据的一种方式
defineProps({
    imageList: {//希望父组件传递一个值
        type: Array,
        default: () => []//默认值为空数组
    }
})
// 使用 () => [] 而不是 [] 的原因是，
// 每个组件实例都会生成一个新的数组，避免多个组件实例共享同一个数组对象，
// 防止意外数据污染。


// 当前预览图的索引
const currIndex = ref(0);

// 是否显示放大镜和大图
const show = ref(false);

// 放大镜的坐标
const layerPosition = reactive({
    left: 0,
    top: 0,
});

//放大镜大图的坐标
const largePosition = reactive({
    backgroundPositionX: 0,
    backgroundPositionY: 0,
});

// 使用useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
const target = ref(null);
const { elementX, elementY, isOutside } = useMouseInElement(target);

watch([elementX, elementY, isOutside], () => {
    show.value = !isOutside.value;//在区域内才显示放大镜

    if (isOutside.value) return;//如果鼠标不在范围内，后续逻辑不执行

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
    //
    largePosition.backgroundPositionX = `${-2 * position.x}px`;
    largePosition.backgroundPositionY = `${-2 * position.y}px`;

});


</script>

<template>
    <div class="image-preview flex m-4">
        <!-- 左侧显示图 -->
        <div class="main-image relative w-[400px] h-[400px] flex justify-center items-center bg-gray-200 " ref="target">
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

        <!-- 放大镜大图 -->
        <div v-show="show" class="absolute left-[630px] w-[400px] h-[400px] bg-no-repeat bg-cover z-50" :style="[
            {
                backgroundImage: `url(${imageList[currIndex]})`,
                backgroundSize: '800px 800px'
            }, largePosition
        ]">

        </div>
    </div>


</template>
