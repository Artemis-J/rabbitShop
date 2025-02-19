<script setup>
import { findHotAPI } from '@/apis/home';
import HomePanel from './HomePanel.vue';
import { onMounted, ref } from 'vue';

//获取数据
const hotList = ref([]);
const getHotList = async () => {
    const res = await findHotAPI();
    hotList.value = res.data.result;
}

onMounted(() => getHotList());
</script>

<template>
    <HomePanel title="Hot List" sub-title="人气爆款 不容错过">
        <ul class="flex justify-between h-[500px]">
            <li v-for="item in hotList" :key="item.id" class="w-[300px] h-[450px] bg-[#f0f9f4]">
                <RouterLink to="/">
                    <img :src="item.picture" alt="" class="w-[300px] h-[306px]" />
                    <p class="text-center text-[22px] py-[12px] px-[30px]">{{ item.title }}</p>
                    <p class="text-center text-[18px] text-info">{{ item.alt }}</p>
                </RouterLink>
            </li>
        </ul>
    </HomePanel>
</template>

