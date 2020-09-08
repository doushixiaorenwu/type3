<template>
  <div>
   <breadcrumb-nav>
   <template #one>权限管理</template>
   <template #two>角色列表</template>
   </breadcrumb-nav>
  </div>
</template>

<script>
import breadcrumbNav from '@/components/comomon/breadcrumbNav'
export default {
  components: {
    breadcrumbNav
  }
}
</script>

<style></style>
