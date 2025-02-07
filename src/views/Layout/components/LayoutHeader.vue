<script setup>
import { useCategoryStore } from '@/stores/category';
import HeaderCart from './HeaderCart.vue';

const categoryStore = useCategoryStore();
</script>

<template>
  <header class="bg-white w-full shadow">
    <div class="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
      
      <!-- Logo -->
      <h1 class="w-40">
        <img src="@/assets/images/logo.png" class="w-full h-auto" />
      </h1>

      <!-- 导航菜单 -->
      <nav>
        <ul class="flex space-x-6">
          <li v-for="item in categoryStore.categoryList" :key="item.id">
            <RouterLink 
              :to="`/category/${item.id}`" 
              class="text-lg font-semibold hover:text-orange-500 transition"
              active-class="text-orange-500 border-b-2 border-orange-500 pb-1">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- 搜索框 -->
      <div class="relative flex items-center border-b border-gray-300 w-64">
        <i class="iconfont icon-search text-gray-400 text-lg"></i>
        <input 
          type="text" 
          placeholder="Search..." 
          class="ml-2 w-full p-1 outline-none text-gray-700" />
      </div>

      <!-- 购物车组件 -->
      <HeaderCart />
      
    </div>
  </header>
</template>
