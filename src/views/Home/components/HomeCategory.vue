<script setup>
import { useCategoryStore } from '@/stores/category';
import { ref } from 'vue';

const categoryStore = useCategoryStore();
const activeCategoryId = ref(null);

const hoverCategory = (id) => {
  activeCategoryId.value = id;
};
const leaveCategory = () => {
  activeCategoryId.value = null;
};
</script>

<template>
  <div class="w-[250px] h-[500px] bg-black/80 relative z-10">
    <ul class="mt-10">
      <li v-for="item in categoryStore.categoryList" :key="item.id" @mouseover="hoverCategory(item.id)"
        @mouseleave="leaveCategory" :class="{ 'bg-orange-500': activeCategoryId === item.id }"
        class="pl-10 h-12 leading-[50px] text-white">
        <RouterLink :to="`/category/${item.id}`" class="text-xl font-semibold mr-2">{{ item.name }}</RouterLink>
        <RouterLink v-for="(child, index) in item.children.slice(0, 2)" :key="index" :to="`/category/${child.id}`"
          class="text-md">/{{ child.name }}</RouterLink>

        <div v-show="activeCategoryId === item.id"
          class="absolute left-[250px] top-0 w-[990px] h-[500px] bg-white/90 p-6 shadow-lg">
          <h4 class="text-gray-800 text-2xl font-semibold flex items-center">
            Recommended for you
            <small class="text-gray-400 text-base ml-4">You might like these based on your purchase or browsing
              history.</small>
          </h4>
          <ul class="flex flex-wrap justify-between mt-4">
            <li v-for="i in item.goods" :key="i.id"
              class="w-[32%] h-[120px] bg-white border border-gray-200 rounded-lg shadow-sm mb-4 flex items-center p-2 hover:shadow-md">
              <RouterLink :to="`/detail/${i.id}`" class="flex w-full h-full">
                <img :src="i.picture" class="w-[95px] h-[95px] object-cover" alt="" />
                <div class="pl-4 flex-1 overflow-hidden">
                  <p class="text-gray-700 font-medium truncate">{{ i.name }}</p>
                  <p class="text-gray-500 text-sm truncate">{{ i.desc }}</p>
                  <p class="text-orange-500 text-2xl">
                    <i class="text-lg">￥</i>{{ i.price }}
                  </p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>

      </li>
    </ul>
  </div>
</template>
