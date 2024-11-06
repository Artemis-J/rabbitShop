<script setup>
import { useCategoryStore } from '@/stores/category';
import { ref } from 'vue';

const categoryStore = useCategoryStore();

// 当前悬浮的分类ID
const activeCategoryId = ref(null);

// 鼠标悬浮时，设置当前分类ID
function hoverCategory(id) {
  activeCategoryId.value = id;
}

// 鼠标离开时，清空分类ID
function leaveCategory() {
  activeCategoryId.value = null;
}
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <!-- 遍历分类列表 -->
      <li
        v-for="item in categoryStore.categoryList"
        :key="item.id"
        @mouseover="hoverCategory(item.id)"
        @mouseleave="leaveCategory"
        :class="{'active': activeCategoryId === item.id}"
      >
        <!-- 分类名称链接 -->
        <RouterLink to="/">{{ item.name }}</RouterLink>

        <!-- 子分类链接，最多显示2个 -->
        <RouterLink v-for="(child, childIndex) in item.children.slice(0, 2)" :key="childIndex" to="/">{{ child.name }}</RouterLink>

        <!-- 商品弹窗，只有当前分类对应的弹窗显示 -->
        <div v-show="activeCategoryId === item.id" class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <!-- 商品列表 -->
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink to="/">
                <img :src="i.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">{{ i.name }}</p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>￥</i>{{ i.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;

      &.active {
        background: #ff7b00; /* 激活时的背景色 */
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  /* 弹出层样式 */
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: block;
    padding: 0 15px;

    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;

      small {
        font-size: 16px;
        color: #666;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-child(3n) {
          margin-right: 0;
        }

        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;

          &:hover {
            background: #e3f9f4;
          }

          img {
            width: 95px;
            height: 95px;
          }

          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;

            .name {
              font-size: 16px;
              color: #666;
            }

            .desc {
              color: #999;
            }

            .price {
              font-size: 22px;
              color: #ff7b00;

              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
