<script setup>
import { onMounted, ref } from 'vue';
import { getCategoryFilterAPI } from '@apis/category';
import { getSubCategoryAPI } from '@/apis/category';
import { useRoute } from 'vue-router';
import GoodsItem from '../Home/components/GoodsItem.vue';

//获取面包屑导航数据
const categoryData = ref({});
const route = useRoute();
const getCategoryData = async () => {
    const res = await getCategoryFilterAPI(route.params.id);
    categoryData.value = res.data.result;
}
onMounted(() => getCategoryData());

//获取基础列表数据渲染
const goodList = ref([]);
const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
})
const getGoodList = async () => {
    const res = await getSubCategoryAPI(reqData.value);
    console.log('Response:', res);
    goodList.value = res.data.result.items;
}
onMounted(() => getGoodList());

//tab切换回调
const tabChange = () => {
    console.log("changed", reqData.value.sortField);
    reqData.value.page = 1;
    getGoodList();
}

//加载更多
const disabled = ref(false);
const load = async () => {
    // console.log("到底了！");
    reqData.value.page++;
    const res = await getSubCategoryAPI(reqData.value);
    goodList.value = [...goodList.value, ...res.data.result.items];
    if (res.result.items.length === 0) {
        disabled.value = true;
    }
}
</script>

<template>
    <div class="container p-5">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">{{ categoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="sub-container mt-5">
            <el-tabs v-model="reqData.sortField" @tab-click="tabChange">
                <el-tab-pane label="New Products" name="publishTime"></el-tab-pane>
                <el-tab-pane label="Hot Products" name="orderNum"></el-tab-pane>
                <el-tab-pane label="Top-Rated" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body grid grid-cols-5 gap-5 mt-5" v-infinite-scroll="load" :infinite-scoll-disabled="disabled">
                <!-- 商品列表-->
                <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" :to="`/detail/${goods.id}`"/>
            </div>
        </div>
    </div>
</template>

