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
    <div class="bg-gray-100 p-4">
        <!-- 面包屑 -->
        <div class="bread-container mb-4 text-sm text-gray-500">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${goods.categories?.[1].id}` }">{{
                    goods.categories?.[1].name }}</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories?.[0].id}` }">{{
                    goods.categories?.[0].name }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 大容器 -->
        <div class="outer-container grid gap-4 p-4">
            <!-- 上部分容器 -->
            <div class="top-container bg-white p-4 rounded shadow-md">
                <div class="grid grid-cols-5 gap-5">
                    <!-- 左上 -->
                    <div class="top-left col-span-2 p-4 flex flex-col justify-center items-center">
                        <div class="grid grid-cols-4 gap-2 w-full ">
                            <div class="info-item text-center">
                                <p class="title"><i class="icon">🔥</i>销量人气</p>
                                <p class="data">{{ goods.salesCount }}+</p>
                            </div>
                            <div class="info-item text-center">
                                <p class="title"><i class="icon">⭐</i>商品评价</p>
                                <p class="data">{{ goods.commentCount }}+</p>
                            </div>
                            <div class="info-item text-center">
                                <p class="title"><i class="icon">❤️</i>收藏人气</p>
                                <p class="data">{{ goods.collectCount }}+</p>
                            </div>
                            <div class="info-item text-center">
                                <p class="title">品牌信息</p>
                                <p class="data">{{ goods.brand?.name }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- 右上 -->
                    <div class="top-right col-span-3 p-4">

                        <h1 class="text-xl font-bold text-black">{{ goods.name }}</h1>
                        <p class="text-gray-600">{{ goods.desc }}</p>
                        <p class="text-lg">
                            <span class="text-orange-500 font-bold">&yen;{{ goods.price }}</span>
                            <span class="line-through text-gray-500">&yen;{{ goods.oldPrice }}</span>
                        </p>

                        <div class="text-sm text-gray-700">
                            <p>配送方式：全国包邮</p>
                            <p>售后保障：7天无理由退换货</p>
                        </div>

                        <div>
                            <button
                                class="w-max-fit p-2 bg-emerald-400 hover:bg-emerald-600 text-white rounded-lg text-lg">加入购物车</button>
                        </div>

                    </div>
                </div>
            </div>

            <!-- 下部分容器 -->
            <div class="bottom-container p-4 rounded shadow-md">
                <div class="grid grid-cols-6 gap-4">
                    <!-- 左下 -->
                    <div class="bottom-left col-span-4 bg-white p-4 flex flex-col items-center">
                        <!-- 商品详情部分 -->
                        <div class="details w-full mb-8">
                            <h3 class="text-xl font-bold mb-4">商品详情</h3>
                            <div class="border-b border-gray-300 mb-6"></div>

                            <ul class="list-none space-y-4">
                                <li v-for="item in goods.details?.properties" :key="item.value"
                                    class="flex items-center">
                                    <span class="dt font-semibold mr-4">{{ item.name }}:</span>
                                    <span class="dd">{{ item.value }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- 商品图片部分 -->
                        <div class="details-images w-full mb-4">
                            <div v-for="img in goods.details?.pictures" :key="img" class="w-full flex justify-center">
                                <img :src="img" alt="商品图片" class="max-w-full h-auto object-contain rounded-lg">
                            </div>
                        </div>
                    </div>

                    <!-- 右下 -->
                    <div class="bottom-right col-span-2 bg-white p-4 flex flex-col items-center">
                        <!-- 24小时热榜容器 -->
                        <div class="hot-list w-full">
                            <div class="title bg-orange-500 text-white p-2 text-xl font-semibold text-center">
                                24小时热榜
                            </div>
                            <div class="product bg-white p-4 rounded-lg shadow-md">
                                <div class="flex flex-col items-center">
                                    <div class="w-full flex justify-center">
                                        <img src="https://via.placeholder.com/150" alt="商品图片"
                                            class="w-1/2 h-auto object-contain rounded-lg">
                                    </div>
                                    <h2 class="text-lg font-bold mt-2">商品名称</h2>
                                    <p class="text-gray-600">商品描述</p>
                                    <p class="text-xl font-bold text-orange-500 mt-2">&yen;100</p>
                                </div>
                            </div>
                        </div>

                        <!-- 周热榜容器 -->
                        <div class="hot-list w-full">
                            <div class="title bg-orange-500 text-white p-2 text-xl font-semibold text-center">
                                周热榜
                            </div>
                            <div class="product bg-white p-4 rounded-lg shadow-md">
                                <div class="flex flex-col items-center">
                                    <div class="w-full flex justify-center">
                                        <img src="https://via.placeholder.com/150" alt="商品图片"
                                            class="w-1/2 h-auto object-contain rounded-lg">
                                    </div>
                                    <h2 class="text-lg font-bold mt-2">商品名称</h2>
                                    <p class="text-gray-600">商品描述</p>
                                    <p class="text-xl font-bold text-orange-500 mt-2">&yen;150</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>