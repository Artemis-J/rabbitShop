// 封装购物车模块
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
    //定义state
    const cartList = ref([]);

    //定义action 
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

    return {
        cartList,
        addCart
    }
}, {
    persist: true,
})