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
    console.log("到底了！");
    //获取下一页的数据
    reqData.value.page++;
    const res = await getSubCategoryAPI(reqData.value);
    goodList.value = [...goodList.value, ...res.data.result.items];//拼接新旧数据
    //加载完毕，停止监听
    if (res.result.items.length === 0) {
        disabled.value = true;
    }
}


</script>

<template>

    <div class="container">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName
                    }}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/' }">{{ categoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-click="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="最多评论" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body" v-infinite-scroll="load" :infinite-scoll-disabled="disabled">
                <!-- 商品列表-->
                <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
            </div>
        </div>
    </div>

</template>

<style scoped lang="less">
.container {
    padding: 20px;
}

.sub-container {
    padding: 20px;
}

.body {
    display: grid;
    /* 启用 Grid 布局 */
    grid-template-columns: repeat(5, 1fr);
    /* 每行显示 5 个商品 */
    gap: 20px;
    /* 设置商品之间的间隔 */
    grid-auto-rows: auto;
    /* 设置行高自动适应 */
}


.el-tabs {
    margin-bottom: 20px;
}
</style>