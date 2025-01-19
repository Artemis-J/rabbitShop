<script setup>
import { getHotGoodsAPI } from '@/apis/detail';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
//设计props参数，适配不同的title和数据
const props = defineProps({
    hotType: {
        type: Number,
        require: true
    }
})

//适配：title1-24小时热榜；2-周热榜
const TYPEMAP = {
    1: '24小时热榜',
    2: '周热榜'

}

const title = computed(() => TYPEMAP[props.hotType]);

//1.封装接口
//2.调用接口渲染模板
const hotList = ref({});
const route = useRoute();
const getHotList = async () => {
    const res = await getHotGoodsAPI({
        id: route.params.id,
        type: props.hotType
    })
    hotList.value = res.data.result;
}
onMounted(() => getHotList());


</script>


<template>

    <div class="hot-list w-full">
        <div class="title bg-orange-500 text-white p-2 text-xl font-semibold text-center">
            {{ title }}
        </div>
        <div class="product bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <RouterLink to="/" class="goods-items mb-6" v-for="item in hotList" :key="item.id">
                <div class="w-full flex justify-center">
                    <img :src="item.picture" alt="" class="w-1/2 h-auto object-contain rounded-lg">
                </div>
                <h2 class="text-lg font-bold mt-2 text-center">{{ item.name }}</h2>
                <p class="text-gray-600 text-center">{{ item.desc }}</p>
                <p class="text-xl font-bold text-orange-500 mt-2 text-center">&yen;1{{ item.price }}</p>
            </RouterLink>
        </div>
    </div>

</template>