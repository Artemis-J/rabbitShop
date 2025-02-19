<script setup>
import { useCategoryStore } from '@/stores/category';
import { useScroll } from '@vueuse/core';

const { y } = useScroll(window);
const categoryStore = useCategoryStore();
</script>

<template>
    <div class="fixed w-full h-20 bg-white border-b border-gray-200 z-50 transition-transform opacity-0 -translate-y-full"
        :class="{ 'opacity-100 translate-y-0': y > 78 }">
        <div class="container flex items-center justify-between px-6 mx-auto">
            <RouterLink to="/" class="flex items-center">
                <img src="@/assets/images/logo.png" alt="Logo" class="h-20 w-auto" />
            </RouterLink>

            <ul class="flex items-center space-x-10">
                <li v-for="item in categoryStore.categoryList" :key="item.id">
                    <RouterLink :to="`/category/${item.id}`"
                        class="text-lg font-bold text-primary hover:text-secondary transition">
                        {{ item.name }}
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>
</template>
