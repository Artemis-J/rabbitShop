<script setup>
import { getBannerAPI } from '@apis/home';
import { onMounted, ref } from 'vue';

const bannerList = ref([]);

const getBanner = async () => {
    const res = await getBannerAPI();
    console.log(res);
    bannerList.value = res.data.result;

}

onMounted(() => getBanner());

</script>

<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>


<style scoped lang="less">
.home-banner {
    width: 1240px;
    height: 500px;
    margin-left: 450px;
    margin-top: 120px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98
}

// 覆盖样式
.xtx-carousel {
    :deep(.carousel-btn.prev) {
        left: 270px;
    }

    :deep(.carousel-indicator) {
        padding-left: 250px;
    }
}
</style>