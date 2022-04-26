<template>
<div>
  <!-- 头部面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/hy' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt16">
            <!-- 数据表格 -->
            <el-table class="mt16" :data="rightsList" border style="width: 100%">
                <el-table-column type="index" label="#" width="80">
                </el-table-column>
                <el-table-column prop="authName" label="权限名称">
                </el-table-column>
                <el-table-column prop="path" label="路径">
                </el-table-column>
                <el-table-column prop="level" label="权限等级">
                  <template slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.level == 0" >一级</el-tag>
                    <el-tag size="mini" v-if="scope.row.level == 1" type="success">二级</el-tag>
                    <el-tag size="mini" v-if="scope.row.level == 2" type="warning">三级</el-tag>
                  </template>
                </el-table-column>
            </el-table>
        </el-card>
</div>
</template>
<script>
import {
  getRights
} from "@/http/api.js";
export default {
  data() {
    return {
      rightsList:[]
    };
  },
  methods: {
    async getRight(){
      let res = await getRights()
      this.rightsList = res
    }
  },
  mounted() {
    this.getRight()
  },
  computed: {},
  watch: {},
};
</script>
<style lang='scss' scoped >
</style>