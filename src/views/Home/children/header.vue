<template>
  <div class="header">
      <div>
         <img src="../../../assets/3.png" alt="">
          <span>后台系统</span>
      </div>
    <el-button type="info" @click="outForm">退出</el-button>

  </div>
</template>

<script>
export default {
  methods: {
    outForm () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: antiquewhite;

  div{
    display: flex;
    align-items: center;
  }
  img{
    width: 60px;
    height: 60px;
    margin: 0 10px;
  }

}

</style>
