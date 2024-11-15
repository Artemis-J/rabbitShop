<script setup>
import { findNewAPI } from '@/apis/home';
import HomePanel from './HomePanel.vue';
import { onMounted, ref } from 'vue';

//获取数据
const newList = ref([]);
const getNewList = async()=>{
    const res = await findNewAPI();
    newList.value = res.data.result;
}

onMounted(()=>getNewList())

</script>

<template>
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <ul class="goods-list">
        <li v-for="item in newList" :key="item.id">
            <RouterLink to="/">
                <img :src="item.picture" alt="" />
                <p class="name">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
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

        .price {
            color: @priceColor;
        }
    }
}
</style>