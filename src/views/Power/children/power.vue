<template>
  <div>
       <el-table-column type="expand">
            <template v-slot="data">
              <el-row :class="['bbottom', index1 === 0 ? 'btop' : '', 'center']" v-for="(item1, index1) in data.row.children" :key="item1.id">
                <!-- 一级权限渲染 -->
                <el-col :span="5">
                  <el-tag closable @close="removeRightById(data.row, item1.id)">
                    {{ item1.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 二级三级渲染 -->
                <el-col :span="19">
                  <el-row :class="[index2 === 0 ? '' : 'btop', 'center']" v-for="(item2, index2) in item1.children" :key="item2.id">
                    <el-col :span="6">
                      <el-tag type="success" closable @close="removeRightById(data.row, item2.id)">
                        {{ item2.authName }}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 三级渲染 -->
                    <el-col :span="18">
                      <el-tag type="warning" closable @close="removeRightById(data.row, item3.id)" v-for="item3 in item2.children" :key="item3.id">
                        {{ item3.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
  </div>
</template>

<script>
import { removeRightData } from '@/network/power/roles'

export default {
  methods: {
    async removeRightById (role, id) {
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result !== 'confirm') return this.$message.info('取消了删除')
      const { data: res } = await removeRightData(role, id)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')
      this.$message.success('删除权限成功')
      // 更新返回的所有数据
      role.children = res.data
    }
  }

}
</script>

<style>
.el-tag{margin: 8px;}
.btop{border-top: 1px solid #f2f2f2;}
.bbottom{border-bottom: 1px solid #f2f2f2;}
.center{
  display: flex;
  align-items: center;
}
</style>
