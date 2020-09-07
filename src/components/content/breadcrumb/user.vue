<template>
  <div>
    <breadcrumb-nav>
   <template #one>用户管理</template>
   <template #two>用户列表</template>
   </breadcrumb-nav>
  </div>
</template>

<script>
import breadcrumbNav from '../../comomon/breadcrumbNav'

export default {
  components: {
    breadcrumbNav
  }

}
</script>

<style>

</style>
