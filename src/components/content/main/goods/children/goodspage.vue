<template>
  <div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['total', 'queryInfo'],
  methods: {
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.$emit('handleSizeChange')
    },
    handleCurrentChange (newpage) {
      this.queryInfo.pagenum = newpage

      this.$emit('handleCurrentChange')
    }
  }

}
</script>

<style>

</style>
