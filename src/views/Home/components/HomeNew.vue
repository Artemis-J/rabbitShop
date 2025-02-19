<script setup>
import { findNewAPI } from '@/apis/home';
import HomePanel from './HomePanel.vue';
import { onMounted, ref } from 'vue';

//获取数据
const newList = ref([]);
const getNewList = async () => {
    const res = await findNewAPI();
    newList.value = res.data.result;
}

onMounted(() => getNewList())
</script>

<template>
    <HomePanel title="New Product" sub-title="新鲜出炉 品质靠谱">
        <ul class="flex justify-between h-[500px]">
            <li v-for="item in newList" :key="item.id" class="w-[300px] h-[450px] bg-gray-100">
                <RouterLink :to="`/detail/${item.id}`">
                    <img :src="item.picture" alt="" class="w-[300px] h-[306px]" />
                    <p class="text-center text-[22px] py-[12px] px-[30px]">{{ item.name }}</p>
                    <p class="text-center text-[18px] text-orange-600">&yen;{{ item.price }}</p>
                </RouterLink>
            </li>
        </ul>
    </HomePanel>
</template>
