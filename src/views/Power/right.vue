<template>
  <div>
   <breadcrumb-rights />
   <main-content :rightsList="rightsList"></main-content>
  </div>
</template>

<script>
import breadcrumbRights from '../../components/content/breadcrumb/user'
import mainContent from '../../components/content/main/power/rights'
import { getRightsData } from '../../network/power/rights'
export default {
  components: {
    breadcrumbRights,
    mainContent
  },
  data () {
    return {
      rightsList: []

    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getRightsData().then(res => {
        if (res.data.meta.status !== 200) return this.$message.error('获取数据失败')
        this.rightsList = res.data.data
        console.log(this.rightsList)
      })
    }
  }
}
</script>

<style></style>
