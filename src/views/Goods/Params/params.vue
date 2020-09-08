<template>
  <div>
      <breadcrumb-params></breadcrumb-params>
      <main-params />
  </div>
</template>

<script>
import breadcrumbParams from '@/components/content/breadcrumb/cate.vue'
import mainParams from '../../../components/content/main/goods/goods'

export default {
  components: {
    breadcrumbParams,
    mainParams
  }

}
</script>

<style>

</style>
