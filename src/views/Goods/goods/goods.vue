<template>
  <div>
      <breadcrumb-goods></breadcrumb-goods>
      <main-goods></main-goods>
  </div>
</template>

<script>
import breadcrumbGoods from '@/components/content/breadcrumb/goods'
import mainGoods from '../../../components/content/main/goods/goods'
export default {
  components: {
    mainGoods,
    breadcrumbGoods
  }

}
</script>

<style>

</style>
