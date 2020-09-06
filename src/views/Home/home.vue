<template>
    <el-container  class="home_main">
      <el-header>
        <header-children></header-children>
        </el-header>
        <!-- 侧边 -->
      <el-container>
         <el-aside :width="isCollapse ? 50+'px' : 200+'px'">
      <div class="toggle_btn" @click="toggleMenu">|||</div>
        <aside-main :isShow="isCollapse"></aside-main>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container>
</el-container>
</template>

<script>
import HeaderChildren from './children/header'
import AsideMain from './children/asidMain'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    HeaderChildren,
    AsideMain
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    }
  }

}
</script>

<style lang="less" scoped>
.home_main{
  height: 100%;
}
.el-header{
    background-color: cadetblue;
    padding-left: 0;
}
.el-aside{
   background-color:  darkslategray;
}
.el-main{
  background-color: azure;
}
.toggle_btn{
  color: aliceblue;
  text-align: center;
  letter-spacing: .2em;
  line-height: 24px;
  cursor: pointer;
  font-size: 12px;

}

</style>
