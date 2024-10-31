<script setup>
import { getCategoryAPI } from '@/apis/layout'
import { onMounted, ref } from 'vue';
const categoryList = ref([]);
const getCategory = async () => {
  const res = await getCategoryAPI();
  console.log(res);
  categoryList.value = res.data.result;

}

onMounted(() => {
  getCategory()
})
</script>

<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><img src="@/assets/images/logo.png" /></h1>
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryList" :key="item.id">
          <router-link to="/">{{ item.name }}</router-link>
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

  .container {
    display: flex;
    align-items: center;
    width: auto;
  }

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

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
    margin: 10px 10px 10px 50px;
  }

  .app-header-nav {
    padding: 15px 0 0 30px;

  }


  .search {
    width: 170px;
    height: 32px;
    position: relative;
    margin-left: 200px;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }
}
</style>