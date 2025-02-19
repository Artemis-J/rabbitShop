<script setup>
defineProps({
    goods: {
        type: Object,
        default: () => ({})
    }
});
</script>

<template>
    <RouterLink class="w-[240px] h-[300px] p-3 border border-transparent transition-all duration-500 overflow-hidden hover:border-gray-300">
        <div class="w-[160px] h-[160px] mx-auto">
            <img v-img-lazy="goods.picture" alt="" class="w-full h-full object-cover" />
        </div>
        <p class="mt-2 text-[16px] text-center h-[44px] truncate">{{ goods.name }}</p>
        <p class="mt-[-10px] text-[20px] text-primary text-center">&yen;{{ goods.price }}</p>
    </RouterLink>
</template>
