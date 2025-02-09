<script setup>
import { getBannerAPI } from '@apis/home';
import { onMounted, ref } from 'vue';

const bannerList = ref([]);

const getBanner = async () => {
    const res = await getBannerAPI();
    bannerList.value = res.data.result;
};

onMounted(() => getBanner());
</script>

<template>
    <div class="w-[1000px] h-[500px] relative z-0">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img :src="item.imgUrl" alt="" class="w-full h-full object-cover" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </template>
  
