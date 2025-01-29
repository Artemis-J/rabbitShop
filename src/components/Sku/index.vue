<script setup>
import powerSet from './power-set'
import { ref, onMounted } from 'vue';
import { getDetail } from '@/apis/detail';
import { useRoute } from 'vue-router';
/*
defineProps({
    goods: {//希望父组件传递一个值
        type: Object,
        default: () => { }
    }
})
*/

const goods = ref({});
const route = useRoute();
let pathMap = {};
const getGoods = async () => {
    const res = await getDetail(route.params.id);
    goods.value = res.data.result;
    //生成数据字典
    pathMap = getPathMap(goods.value);
    //初始化更新按钮状态
    initDisableStatus(goods.value.specs, pathMap);
}
onMounted(() => getGoods());



// 选中和取消选中实现
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
    //点击按钮时更新
    updateDisableStatus(goods.value.specs, pathMap);
    // 产出Sku对象数据
    const index = getSelectedValues(goods.value.specs).findIndex(item => item === undefined);
    if (index > -1) {
        return;
    } else {
        //获取sku对象
        const key= getSelectedValues(goods.value.specs).join('-');
        const skuIds = pathMap[key];
        //以skuId作为匹配项去goods.value.skus数组中找
        const skuObj = goods.value.skus.find(item=>item.id===skuIds[0]);
        console.log(skuObj);     
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

//获取选中项的匹配数组
const getSelectedValues = (specs) => {
    const arr = [];
    specs.forEach(spec => {
        const selectedVal = spec.values.find(item => item.selected);
        arr.push(selectedVal ? selectedVal.name : undefined);
    })
    return arr;
}

//切换时更新禁用状态
const updateDisableStatus = (specs, pathMap) => {
    specs.forEach((spec, index) => {
        const selectedValues = getSelectedValues(specs);
        spec.values.forEach(val => {
            selectedValues[index] = val.name;
            const key = selectedValues.filter(value => value).join('-');
            if (pathMap[key]) {
                val.disabled = false;
            } else {
                val.disabled = true;
            }
        })
    })
}

// 服饰=>恍若没穿鞋  可测试组合式禁用
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
                        @click="$event => changeSelectedStatus(item, v)"
                        :class="{ 'border-blue-500': v.selected, 'opacity-50 cursor-not-allowed': v.disabled }"
                        class="w-16 h-16 border rounded-lg hover:shadow-lg cursor-pointer" />
                    <!-- 文字类型规格 -->
                    <span v-else @click="$event => changeSelectedStatus(item, v)"
                        :class="{ 'border-blue-500': v.selected, 'opacity-50 cursor-not-allowed': v.disabled }"
                        class="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                        {{ v.name }}
                    </span>
                </div>
            </dd>
        </dl>
    </div>
</template>