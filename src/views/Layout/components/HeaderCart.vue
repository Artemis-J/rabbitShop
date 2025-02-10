<!-- 顶部购物车图标 -->

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();
const isCartOpen = ref(false); //默认购物车弹窗关闭
// 切换购物车弹窗
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

</script>

<template>
    <div class="relative">
        <!-- 购物车按钮 -->
        <button @click="toggleCart" class="relative p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <i class="iconfont icon-cart text-xl"></i>
            <span v-if="totalCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {{ totalCount }}
            </span>
        </button>

        <!-- 购物车弹框 -->
        <div v-if="isCartOpen" class="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-4 z-50">
            <ul class="space-y-2 max-h-96 overflow-y-auto">
                <li v-for="i in cartStore.cartList" :key="i" class="flex justify-between items-center border-b pb-2">
                    <div class="flex items-center space-x-2">
                        <img :src="i.picture" class="w-10 h-10 object-cover rounded" />
                        <div>
                            <p class="text-md font-semibold">{{ i.name }}</p>
                            <span v-for="(attr, index) in i.attrsText" :key="index">
                                {{ attr.name }}:{{ attr.valueName }}<span v-if="index < i.attrsText.length - 1"> |
                                </span>
                            </span>
                        </div>
                    </div>

                    <!-- flex-1让该 div 充满剩余空间，使 price 和 count 贴右对齐 -->
                    <div class="flex flex-col items-end flex-1 text-right">
                        <p class="text-md font-semibold text-emerald-500">¥{{ i.price }}</p>
                        <p class="text-sm text-gray-500">x{{ i.count }}</p>
                    </div>

                    <i class="iconfont icon-close-new pl-2" @click="cartStore.delCart(i.skuCode)"></i>
                </li>

            </ul>

            <div class="mt-3 text-right">
                <p class="text-sm font-semibold">共计：<span class="text-emerald-400">¥{{ totalPrice }}</span></p>
                <button class="mt-2 bg-emerald-400 text-white py-1 px-4 rounded hover:bg-emerald-600">
                    去购物车结算
                </button>
            </div>

            <i></i>
        </div>
    </div>
</template>