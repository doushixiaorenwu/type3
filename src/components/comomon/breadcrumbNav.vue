<template>
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><slot>首页</slot></el-breadcrumb-item>
      <el-breadcrumb-item><slot name="one"></slot></el-breadcrumb-item>
      <el-breadcrumb-item><slot name="two"></slot></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
