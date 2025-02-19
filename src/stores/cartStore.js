// 封装购物车模块
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { insertCartAPI, findNewCartListAPI } from '@/apis/cart';

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore();
    console.log("当前 token:", userStore.userInfo.token);
    const isLogin = computed(() => userStore.userInfo.token);
    //定义state
    const cartList = ref([]);

    //定义action-添加进购物车
    const addCart = async (goods) => {
        const { skuCode, count } = goods;
        if (isLogin.value) {
            //登录后加入购物车
            await insertCartAPI({ skuCode, count });
            const res = await findNewCartListAPI();
            cartList.value = res.data.result;
        } else {
            //没登录加入购物车
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
    }


    // 删除商品
    const delCart = (skuCode) => {
        // 1.找到要删除项的下标值-splice
        // 2.使用数组的过滤方法-filter
        const idx = cartList.value.findIndex((item) => skuCode === item.skuCode);
        cartList.value.splice(idx, 1);
    }

    // 单选功能
    const singleCheck = (skuCode, selected) => {
        // 通过skuCode找到修改项，把selected改成传过来的selected
        const item = cartList.value.find((item) => item.skuCode === skuCode);
        item.selected = selected;
    }

    // 全选功能
    const allCheck = (selected) => {
        // 把cartList中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected);
    }

    //计算总数和总价
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0));
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0));

    // 已选择数量和已选择商品价钱合计
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0));
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0));



    // 是否全选
    // 如果所有商品的 selected 都是 true，isAll 就会返回 true，否则返回 false
    const isAll = computed(() => cartList.value.every((item) => item.selected));



    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice
    }
}, {
    persist: true,
})