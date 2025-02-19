<script setup>
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();
// 单选回调
const singleCheck = (i, selected) => {
    // 除了selected补充一个用来筛选的参数-skuCode
    cartStore.singleCheck(i.skuCode, selected);

}

const allCheck = (selected)=>{
    cartStore.allCheck(selected);
}

</script>

<template>
    <div class="w-[1200px] mx-auto p-6">
        <table class="w-full border-collapse border border-gray-300 text-center">
            <thead>
                <tr class="bg-gray-200">
                    <th class="p-3">
                        <el-checkbox :model-value="cartStore.isAll" @change="allCheck"/>
                    </th>
                    <th class="p-3">商品信息</th>
                    <th class="p-3">单价</th>
                    <th class="p-3">数量</th>
                    <th class="p-3">小计</th>
                    <th class="p-3">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in cartStore.cartList" :key="i.id" class="border-b">
                    <!-- 单选框 -->
                    <td class="p-3">
                        <el-checkbox :model-value="i.selected" @change="(selected) => singleCheck(i, selected)" />
                    </td>
                    <td class="p-3 flex items-center space-x-3">
                        <img :src="i.picture" class="w-16 h-16 object-cover rounded" />
                        <span>{{ i.name }}</span>
                    </td>
                    <td class="p-3 text-emerald-500">¥{{ i.price }}</td>
                    <td class="p-3">

                        <span class="mx-2">{{ i.count }}</span>

                    </td>
                    <td class="p-3 font-semibold text-orange-500">¥{{ i.price * i.count }}</td>
                    <td class="p-3">
                        <button class="text-red-500">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 统计区域 -->
        <div class="flex justify-between items-center mt-4 p-4 border-t">
            <div>
                <p>共 {{ cartStore.allCount }} 件商品</p>
                <p>已选中 {{cartStore.selectedCount}} 件</p>
                <p class="text-xl font-bold text-orange-500">合计：¥{{ cartStore.selectedPrice.toFixed(2) }}</p>
            </div>
            <button class="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600">
                下单结算
            </button>
        </div>
    </div>
</template>