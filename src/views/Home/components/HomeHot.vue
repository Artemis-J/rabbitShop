<script setup>
import { findHotAPI } from '@/apis/home';
import HomePanel from './HomePanel.vue';
import { onMounted, ref } from 'vue';

//获取数据
const hotList = ref([]);
const getHotList = async()=>{
    const res = await findHotAPI();
    hotList.value = res.data.result;
}

onMounted(()=>getHotList());

</script>

<template>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <ul class="goods-list">
        <li v-for="item in hotList" :key="item.id">
            <RouterLink to="/">
                <img :src="item.picture" alt="" />
                <p class="title">{{ item.title }}</p>
                <p class="alt">{{ item.alt }}</p>
            </RouterLink>
        </li>
      </ul>
    </HomePanel>
   
</template>


<style scoped lang="less">
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;
  
    li {
        width: 306px;
        height: 406px;
        background: #f0f9f4;
       

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding: 12px 30px 0 30px;
            text-align: center;
        }

        .alt {
            font-size: 18px;
            color: @infoColor;
        }
    }
}
</style>