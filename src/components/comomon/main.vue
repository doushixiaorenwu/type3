<template>
  <div>
    <el-card class="box-card">
        <div>
            <slot name="top"></slot>
        </div>
        <div>
            <slot name="main"></slot>
        </div>
        <div>
            <slot name="footer"></slot>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
