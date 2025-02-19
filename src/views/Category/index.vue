<script setup>
import GoodsItem from '../Home/components/GoodsItem.vue';
import { useBanner } from './composables/useBanner';
import { useCategory } from './composables/useCategory';

// 获取 banner 数据
const { bannerList } = useBanner();

// 获取分类数据
const { categoryData } = useCategory();
</script>

<template>
  <div class="top-category">
    <div class="container mt-5">
      <!-- 面包屑 -->
      <div class="mb-4">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 轮播图 -->
      <div class="w-[1240px] h-[500px] mx-auto my-2">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="" class="w-full h-full object-cover">
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 分类列表 -->
      <div class="mt-5 bg-white">
        <h3 class="text-[28px] text-gray-600 font-normal text-center leading-[100px]">Sub-Categories</h3>
        <ul class="flex flex-wrap p-8 min-h-[160px]">
          <li v-for="i in categoryData.children" :key="i.id" class="w-[168px] h-[160px]">
            <RouterLink :to="`/category/sub/${i.id}`" class="block text-center text-[16px] hover:text-primary">
              <img :src="i.picture" class="w-[100px] h-[100px] mx-auto" />
              <p class="leading-[40px]">{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- 推荐商品 -->
      <div class="bg-white mt-5 relative" v-for="item in categoryData.children" :key="item.id">
        <div class="relative p-5">
          <h3 class="text-[28px] text-gray-600 font-normal text-center leading-[100px]">{{ item.name }}</h3>
          <span class="absolute top-5 right-5 text-gray-400 text-[16px]">More</span>
        </div>
        <div class="flex flex-wrap justify-start px-16 pb-8">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" :to="`/detail/${good.id}`"/>
        </div>
      </div>
    </div>
  </div>
</template>
