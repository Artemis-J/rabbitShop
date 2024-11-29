<script setup>
defineProps({
    goods: {
        type: Object,
        default: () => { }
    }
})
</script>


<template>
    <RouterLink to="/" class="goods-item">
        <img v-img-lazy="goods.picture" alt="" />
        <p class="name ellipsis">{{ goods.name }}</p>
        <p class="price">&yen;{{ goods.price }}</p>
    </RouterLink>
</template>




<style scoped lang='less'>
.goods-item {
    width: 240px;
    height: 300px;
    padding: 10px 20px;
    position: relative;
    overflow: hidden;
    border: 1px solid transparent;
    transition: all .5s;

    .image {
        display: block;
        width: 160px;
        height: 160px;
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
        }
    }

    p {
        margin-top: 6px;
        font-size: 16px;
        text-align: center;

        &.name {
            height: 44px;
        }

        &.price {
            margin-top: -10px;
            font-size: 20px;
            color: @priceColor;
        }
    }
}
</style>