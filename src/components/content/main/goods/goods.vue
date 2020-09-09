<template>
  <div>
    <main-item>
      <template #top>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getData">
              <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="toLink">添加商品</el-button>
          </el-col>
        </el-row>
      </template>
      <template #main>
        <el-table :data="goodsListData">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="商品名称" prop="goods_name"></el-table-column>
          <el-table-column label="商品价格（元）" prop="goods_price" width="95px"></el-table-column>
          <el-table-column label="商品重量" prop="goods_weight" width="95px"></el-table-column>
          <el-table-column label="创建时间" prop="goods_time" width="200px">
            <template v-slot="asd">
              {{ asd.row.add_time | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template v-slot="asd">
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete"  @click="removeData(asd.row.goods_id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </template>
    </main-item>
  </div>
</template>

<script>
import MainItem from '../../../comomon/main'

import { goodsList, deleteData } from '@/network/goods/goods'
export default {
  components: {
    MainItem
  },
  data () {
    return {
      goodsListData: [],
      total: 0,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      goodsList(this.queryInfo).then((res) => {
        if (res.data.meta.status !== 200) return this.$message.error('获取数据失败')
        this.goodsListData = res.data.data.goods
        this.total = res.data.total
        console.log(this.goodsListData)
      })
    },
    handleSizeChange (newsize) {
      this.queryInfo.pagesize = newsize
      this.getData()
    },
    handleCurrentChange (newpage) {
      this.queryInfo.pagenum = newpage
      this.getData()
    },
    async removeData (id) {
      const result = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (result !== 'confirm') return this.$message.info('取消了操作')
      deleteData(id).then(res => {
        if (res.meta.status !== 200) return this.$message.error('删除失败')
        this.getGoodsList()
      })
    },
    toLink () {
      this.$router.push('/goods/add')
    }
  }
}
</script>

<style></style>
