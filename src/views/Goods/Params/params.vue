<template>
  <div>
      <breadcrumb-params></breadcrumb-params>
      <main-params />
  </div>
</template>

<script>
import breadcrumbParams from '@/components/content/breadcrumb/params'
import mainParams from '../../../components/content/main/goods/params'

export default {
  components: {
    breadcrumbParams,
    mainParams
  }

}
</script>

<style>

</style>
