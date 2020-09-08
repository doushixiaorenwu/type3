<template>
  <div>
      <breadcrumb-cate></breadcrumb-cate>
      <main-cate></main-cate>
  </div>
</template>

<script>
import breadcrumbCate from '@/components/content/breadcrumb/cate.vue'
import mainCate from '@/components/content/main/goods/cate'

export default {
  components: {
    breadcrumbCate,
    mainCate

  }

}
</script>

<style>

</style>
