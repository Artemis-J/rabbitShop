<script setup>

defineProps({
    goods: {//希望父组件传递一个值
        type: Object,
        default: () => { }
    }
})

// 切换选中状态
const changeSelectedStatus = (item, v) => {
    // item:同一排的对象
    // v:当前点击项
    if (v.selected) {
        v.selected = false;
    } else {
        item.values.forEach(v => v.selected = false);
        v.selected = true;
    }
}

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
                        :class="{ 'border-blue-500': v.selected }"
                        class="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
                        {{ v.name }}
                    </span>
                </div>
            </dd>
        </dl>
    </div>
</template>