<template>
 <el-menu
      class="el-menu-vertical-demo"
      background-color="darkslategray"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      :collapse="isShow"
      router
      :default-active='activePath'
      >
      <el-submenu :index="item.id + ''" v-for="item in meuList" :key="item.id">
        <template slot="title">
          <i :class="iconList[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item  :index="'/'+subItem.path" v-for="subItem in item.children"
          :key="subItem.id"
          @click="isActive('/'+subItem.path)">
               <i class="el-icon-menu"></i>
              <template>{{subItem.authName}}</template>
          </el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
import { getMenuList } from '../../../network/aside'

export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activePath: '',
      props: [],
      meuList: [],
      iconList: {
        125: 'el-icon-user-solid',
        103: 'el-icon-suitcase-1',
        101: 'el-icon-shopping-bag-1',
        102: 'el-icon-s-order',
        145: 'el-icon-s-platform'
      }
    }
  },
  created () {
    this.getMenuAll()
    this.activePath = sessionStorage.getItem('path')
  },
  methods: {
    getMenuAll () {
      getMenuList().then(res => {
        if (res.data.meta.status !== 200) return this.$message.error(res.data.meta.msg)
        this.meuList = res.data.data
      })
    },
    isActive (path) {
      sessionStorage.setItem('path', path)
    }
  }

}
</script>

<style>
.el-menu{
  border-right: none;
}
</style>
