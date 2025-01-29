<script setup>
import powerSet from './power-set'
import { watch } from 'vue';

const props = defineProps({
    goods: {//希望父组件传递一个值
        type: Object,
        default: () => { }
    }
})

// 切换选中状态
const changeSelectedStatus = (item, v) => {
    if (v.disabled) return;
    // item:同一排的对象
    // v:当前点击项
    if (v.selected) {
        v.selected = false;
    } else {
        item.values.forEach(v => v.selected = false);
        v.selected = true;
    }
}

// 生成有效路径字典对象
const getPathMap = (goods) => {
    if (!goods || !Array.isArray(goods.skus)) return {};
    const pathMap = {};
    // 1.根据字段生成有效sku数组
    const effectiveSkus = goods.skus.filter(sku => sku.inventory > 0);

    // 2.使用算法得到子集【1，2】=>[1,2],[1],[2]
    effectiveSkus.forEach(sku => {
        //获取匹配的valueName组成的数组
        const selectedValArr = sku.specs.map(val => val.valueName);
        //用算法获取子集
        const valueArrPowerSet = powerSet(selectedValArr);
        valueArrPowerSet.forEach(arr => {
            const key = arr.join('-');
            if (pathMap[key]) {
                pathMap[key].push(sku.id);
            } else {
                pathMap[key] = [sku.id]
            }
        })
    })
    return pathMap;
}

// 初始化禁用状态
const initDisableStatus = (specs, pathMap) => {
    specs.forEach(spec => {
        spec.values.forEach(val => {
            if (pathMap[val.name]) {
                val.disabled = false;
            } else {
                val.disabled = true;
            }
        })
    })
}

//用watch监听确保goods传过来了
watch(() => props.goods, (newGoods) => {
    if (!newGoods || !newGoods.specs) return;
    const pathMap = getPathMap(newGoods)
    console.log(pathMap);
    initDisableStatus(newGoods.specs, pathMap);
}, { immediate: true }); // 组件初始化时也执行一次




</script>


<template>
    <div class="goods-sku">
        <dl v-for="item in goods.specs" :key="item.id" class="mb-4">
            <!-- 规格标题 -->
            <dt class="text-lg text-gray-500 mb-2">{{ item.name }}</dt>
            <dd class="flex flex-wrap gap-4">
                <!-- 规格值 -->
                <div v-for="v in item.values" :key="v.name" class="inline-flex items-center gap-2">
                    <!-- 图片类型规格 -->
                    <img v-if="v.picture" :src="v.picture" :title="v.name"
                        @click="$event => changeSelectedStatus(item, v)" :class="{ 'border-blue-500': v.selected }"
                        class="w-16 h-16 border rounded-lg hover:shadow-lg cursor-pointer" />
                    <!-- 文字类型规格 -->
                    <span v-else @click="$event => changeSelectedStatus(item, v)"
                        :class="{ 'border-blue-500': v.selected, 'opacity-50': v.disabled }"
                        class="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                        {{ v.name }}
                    </span>
                </div>
            </dd>
        </dl>
    </div>
</template>