<script setup>
import { useCategoryStore } from '@/stores/category';
const categoryStore = useCategoryStore()
</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><img src="@/assets/images/logo.png" /></h1>
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink to="/">{{ item.name }}</RouterLink>
        </li>

      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="Search...">
      </div>
    </div>
  </header>
</template>


<style scoped lang='less'>
.app-header {
  background: #fff;
  width: 100%;
  /* 设置为 100% 占满整个页面宽度 */
  position: relative;
  display: flex;
  justify-content: center;


  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 1200px; /* 设置一个最大宽度，保持内容居中 */
    gap: 20px
  }

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      margin-right: 40px;
      margin-top:10px;
      width: auto;
    

      a {
        font-size: 16px;
        font-weight: bolder;
        height: 32px;
        color: @xtxColor;
        line-height: 1.5;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @helpColor;
        }
      }



    }
  }

  .logo {
    width: 200px;
    height: 80px;
  }

  .app-header-nav {
    display: flex;
    justify-content: center; /* 水平居中导航 */
    width: 820px;
    
    position: relative;
    z-index: 998;
  }


  .search {
    width: 250px;
    height: 32px;
    position: relative;
    margin-left: 40px;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    input {
      width: 170px;
      padding-left: 5px;
      color: #666;
    }
  }
}
</style>