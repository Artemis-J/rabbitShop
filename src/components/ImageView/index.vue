<script setup>
import { ref } from 'vue';

const imageList = [
    "https://via.placeholder.com/400?text=1",
    "https://via.placeholder.com/400?text=2",
    "https://via.placeholder.com/400?text=3",
    "https://via.placeholder.com/400?text=4",
    "https://via.placeholder.com/400?text=5",
];

//1.小图切换大图显示
const activeIndex = ref(0);
const enterhandler = (i) => {
    activeIndex.value = i;
}
console.log(activeIndex);

</script>


<template>
    <div class="image-preview flex">
        <!-- 左侧大图 -->
        <div class="main-image w-2/3 flex justify-center items-center bg-gray-100 p-4 relative">
            <img id="mainImage" :src="imageList[activeIndex]" alt="" class="w-full h-auto object-contain">
            <!-- 放大镜模块 -->
            <div
                class="magnifier absolute top-4 left-4 w-16 h-16 bg-gray-800 bg-opacity-50 text-white rounded-md flex justify-center items-center">
            </div>
        </div>

        <!-- 右侧缩略图 -->
        <div class="thumbnails w-1/3 flex flex-col items-center p-4">
            <ul class="w-full space-y-4">
                <li v-for="(image, i) in imageList" :key="i" @mouseenter="enterhandler(i)"
                    :class="{ 'border-2 border-blue-500': activeIndex === i }"
                    class="cursor-pointer flex justify-center">
                    <img :src="image" alt="" class="w-20 h-20 object-cover">
                </li>
            </ul>
        </div>


        <!-- 放大镜大图盒子 -->
        <div class="magnifier-box absolute hidden w-80 h-80 border border-gray-300 overflow-hidden bg-white shadow-lg">
            <img id="magnifiedImage" :src="imageList[0]" alt="" class="absolute w-[800px] h-[800px] object-cover">
        </div>
    </div>

</template>