<script setup>
import { ref, computed } from "vue";

// 购物车状态
const isCartOpen = ref(false);

// 模拟购物车数据
const cartItems = ref([
    { id: 1, name: "商品1", price: 99, quantity: 2, image: "https://via.placeholder.com/50" },
    { id: 2, name: "商品2", price: 149, quantity: 1, image: "https://via.placeholder.com/50" },
]);

// 计算总数量
const totalCount = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0));

// 计算总价
const totalPrice = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

// 切换购物车显示
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
        <div v-if="isCartOpen" class="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
            <h3 class="text-lg font-semibold mb-2">购物车</h3>

            <div v-if="cartItems.length === 0" class="text-gray-500 text-sm">购物车为空</div>

            <ul v-else class="space-y-2 max-h-60 overflow-y-auto">
                <li v-for="item in cartItems" :key="item.id" class="flex justify-between items-center border-b pb-2">
                    <div class="flex items-center space-x-2">
                        <img :src="item.image" class="w-10 h-10 object-cover rounded" />
                        <div>
                            <p class="text-sm">{{ item.name }}</p>
                            <p class="text-xs text-gray-500">x{{ item.quantity }}</p>
                        </div>
                    </div>
                    <p class="text-sm font-semibold text-orange-500">¥{{ item.price * item.quantity }}</p>
                </li>
            </ul>

            <div class="mt-3 text-right">
                <p class="text-sm font-semibold">共计：<span class="text-orange-500">¥{{ totalPrice }}</span></p>
                <button class="mt-2 bg-orange-500 text-white py-1 px-4 rounded hover:bg-orange-600">
                    去购物车结算
                </button>
            </div>
        </div>
    </div>
</template>