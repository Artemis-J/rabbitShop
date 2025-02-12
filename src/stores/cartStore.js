// 封装购物车模块
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
    //定义state
    const cartList = ref([]);

    //定义action-添加进购物车
    const addCart = (goods) => {
        // 已添加过：count+1
        // 没有添加过：直接push
        // 思路：通过匹配传过来的商品对象中的skuId能不能再cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuCode === item.skuCode);
        if (item) {
            item.count++;
        } else {
            cartList.value.push(goods);
        }
    }
    // 删除商品
    const delCart = (skuCode) => {
        // 1.找到要删除项的下标值-splice
        // 2.使用数组的过滤方法-filter
        const idx = cartList.value.findIndex((item) => skuCode === item.skuCode);
        cartList.value.splice(idx, 1);
    }
    //计算总数和总价
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));





    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice
    }
}, {
    persist: true,
})