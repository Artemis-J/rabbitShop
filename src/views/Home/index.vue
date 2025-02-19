<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
// import HomeProduct from './components/HomeProduct.vue'

</script>

<template>
    <div class="flex justify-center items-start w-full my-4">
        <HomeCategory />
        <HomeBanner />
    </div>
    <div>
    <HomeNew />
    <HomeHot />
    <!-- <HomeProduct /> -->
    </div>
</template>