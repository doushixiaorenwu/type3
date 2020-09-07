<template>
  <div>
      <main-item>
          <template #main>
              <el-table :data="rightsList" border stripe >
                <el-table-column type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template v-slot='asd'>
                        <el-tag v-if='asd.row.level==="0"'>一级</el-tag>
                        <el-tag v-if='asd.row.level==="1"' type="success">二级</el-tag>
                        <el-tag type="warning">三级</el-tag>
                    </template>
                </el-table-column>
              </el-table>
          </template>
      </main-item>
  </div>
</template>

<script>
import MainItem from '../../../comomon/main'
export default {
  props: {
    rightsList: {
      type: Array
    }
  },
  components: {
    MainItem
  }
}
</script>

<style>

</style>
