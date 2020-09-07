<template>
  <div>
    <breadcrumb-rights />
    <main-content :rolesList="rolesList" @change="change"></main-content>
  </div>
</template>

<script>
import breadcrumbRights from '@/components/content/breadcrumb/user'
import mainContent from '@/components/content/main/power/roles'

import { getRolesLsit } from '@/network/power/roles'
export default {
  components: {
    breadcrumbRights,
    mainContent
  },
  data () {
    return {
      rolesList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getRolesLsit().then((res) => {
        if (res.data.meta.status !== 200) return this.$message.error('获取数据失败')
        this.rolesList = res.data.data
        console.log(this.rolesList)
      })
    },
    change () {
      this.getData()
    }
  }
}
</script>

<style></style>
