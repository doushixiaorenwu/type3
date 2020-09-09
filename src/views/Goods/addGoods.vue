<template>
  <div>
      <breadcrumb-add></breadcrumb-add>
      <main-add />
  </div>
</template>

<script>
import breadcrumbAdd from '@/components/content/breadcrumb/addGoods'
import mainAdd from '@/components/content/main/goods/addGoods.vue'

export default {
  components: {
    breadcrumbAdd,
    mainAdd
  }

}
</script>

<style>

</style>
