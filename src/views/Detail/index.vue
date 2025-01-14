<script setup>
import { getDetail } from '@/apis/detail';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue'

const goods = ref({});
const route = useRoute();
const getGoods = async () => {
    const res = await getDetail(route.params.id);
    goods.value = res.data.result;
}
onMounted(() => getGoods());


</script>



<template>
    <div>
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${goods.categories?.[1].id}` }">{{
                    goods.categories?.[1].name }}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories?.[0].id}` }">{{
                    goods.categories?.[0].name }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="product-detail">
            <!-- 上部内容 -->
            <div class="top-section">
                <!-- 左半部分 -->
                <div class="left-panel">
                    <div class="info-item">
                        <p class="title"><i class="icon">🔥</i>销量人气</p>
                        <p class="data">{{ goods.salesCount }}+</p>
                    </div>
                    <div class="info-item">
                        <p class="title"><i class="icon">⭐</i>商品评价</p>
                        <p class="data">{{ goods.commentCount }}+</p>
                    </div>
                    <div class="info-item">
                        <p class="title"><i class="icon">❤️</i>收藏人气</p>
                        <p class="data">{{ goods.collectCount }}+</p>

                    </div>
                    <div class="info-item">
                        <p class="title">品牌信息</p>
                        <p class="data">{{ goods.brand?.name }}</p>

                    </div>
                </div>

                <!-- 右半部分 商品信息-->
                <div class="right-panel">
                    <h1 class="product-title">{{ goods.name }}</h1>
                    <p class="product-description">{{ goods.desc }}</p>
                    <p class="product-price">
                        <span>{{ goods.price }}</span>
                        <span>{{ goods.oldPrice }}</span>
                    </p>

                    <div class="additional-info">
                        <p>配送方式：全国包邮</p>
                        <p>售后保障：7天无理由退换货</p>
                    </div>
                    <button class="add-to-cart">加入购物车</button>
                </div>
            </div>

            <!-- 下方详情展示部分 -->
            <div class="details">
                <h2>商品详情</h2>
                <div class="details-description">
                    <!-- 属性 -->
                    <ul class="attrs">
                        <li v-for="item in goods.details?.properties" :key="item.value">
                            <span class="dt">{{ item.name }}:</span>
                            <span class="dd">{{ item.value }}</span>
                        </li>
                    </ul>


                    <h3>详细描述</h3>
                    <p>
                        本商品采用高品质材料制作，具有出色的耐用性和时尚的外观设计。
                        是您日常生活的理想选择。
                    </p>

                    <div class="details-images">
                        <img v-for="img in goods.details?.pictures" :src="img" :key="img" alt="">
                    </div>
                    
                </div>




            </div>

        </div>
    </div>
</template>

<style scoped>
/* 页面整体布局 */
.product-detail {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: #faf5ff;
    /* 浅紫背景 */
    border-radius: 8px;
}

/* 上部内容布局 */
.top-section {
    display: grid;
    grid-template-columns: 2fr 3fr;
    /* 左右两部分比例分配 */
    gap: 20px;
    align-items: start;
}

/* 左侧面板样式 */
.left-panel {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;
    border-right: 1px solid #d1c4e9;
    /* 紫色分隔线 */
    padding-right: 20px;
}

.info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.title {
    font-size: 16px;
    font-weight: bold;
    color: #1c8569;
}

.data {
    font-size: 20px;
    font-weight: bold;
    color: #ff7c3b;
}

.icon {
    font-size: 24px;
    color: #1c8569;
}

/* 右侧面板样式 */
.right-panel {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.product-title {
    font-size: 24px;
    font-weight: bold;
    color: #7b1fa2;
    /* 深紫色 */
}

.product-description {
    font-size: 16px;
    color: #5e35b1;
    /* 紫色 */
}

.product-price {
    display: flex;
    /* 将价格和原价放在一行 */
    gap: 10px;
    /* 设置两者之间的间距 */
    align-items: baseline;
    /* 对齐基线 */
    font-weight: bold;
    color: #ff7c3b;
}

.product-price span {
    font-size: 18px;
    /* 设置通用字体大小 */
}

.product-price span:last-child {
    color: gray;
    /* 灰色字体 */
    text-decoration: line-through;
    font-weight: normal;
    /* 添加删除线 */
    font-size: 14px;
    /* 原价字体略小 */
}

.additional-info {
    font-size: 14px;
    color: #7e57c2;
    /* 淡紫色 */
}

.add-to-cart {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #7b1fa2;
    /* 深紫色 */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-to-cart:hover {
    background-color: #239862;
    /* 更深紫色 */
}

/* 商品详情部分 */
.details {
    display: flex;
    flex-direction: column;
    width: 80%;
    grid-template-columns: 5fr 2fr;
    gap: 20px;
    padding: 20px;
    background-color: rgb(230, 219, 240);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

}

.details-description {
    display: grid;
    gap: 20px;
}

.details h3 {
    display: flex;
    font-size: 18px;
    color: #7b1fa2;
    /* 深紫色 */
}

.details-description ul {
    list-style-type: disc;
    margin-left: 20px;
    color: #5e35b1;
    /* 紫色 */
}

.details-description p {
    margin-top: 10px;
    color: #666;
    line-height: 1.6;
}

.details-images {
    display: flex;
    flex-direction: column;
    /* 垂直排列图片 */
}

.details-images img {
    width: 100%;
    /* 图片宽度自适应父容器 */
    height: auto;
    object-fit: contain;
    max-width: 60%;
    max-height: 60%;
}
</style>