<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hy' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt16">
      <el-alert type="info" show-icon>
        <template slot="title">
          <div class="alerts">
            消息提示的文案
          </div>
        </template>
      </el-alert>
      <el-row style="padding:20px 40px;margin-left:20px;">
        <el-col :span="16">
          <el-steps :active="active" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-col>
        
      </el-row>
      <el-tabs tab-position="left" style="height: 100%;" @change="">
        <!-- 基本信息表单 -->
        <el-tab-pane label="基本信息">
          <el-form label-position="top" label-width="80px" :model="goods_form">
            <el-form-item label="商品名称">
              <el-input v-model="goods_form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="goods_form.region"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="goods_form.type"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="goods_form.type"></el-input>
            </el-form-item>
            <!-- <el-form-item label="商品分类">
              <el-select v-model="goods_rid" placeholder="请选择">
                 <el-cascader
                    v-model="goods_rid"
                    :options="goodsCategories"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"></el-cascader>
            </el-form-item> -->
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品图片</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active:0,
      goods_form:{},
      goodsCategories:[],
      goods_rid:''
    };
  },
  methods: {
    // handleChange(){},
  },
  // async created() {
  //   let res = await this.$api.getCategories()
  //   this.goodsCategories = res
  //   console.log(this.goodsCategories);
  // },
  computed: {},
  watch: {},
};
</script>
<style lang='scss' scoped>
.alerts{
  text-align: center;
}
</style>