<template>
    <div>
        <!-- 头部面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/hy' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt16">
            <!-- 搜索框添加用户按钮 -->
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" @input="search" clearable  v-model="goodsQuery.query" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="$router.push('/goods/add')">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 数据表格 -->
            <el-table class="mt16" :data="goodsList" border style="width: 100%">
                <el-table-column prop="date" type="index" label="#" width="80">
                </el-table-column>
                <el-table-column width="800" prop="goods_name" label="商品名称">
                </el-table-column>
                <el-table-column prop="goods_price" label="商品价格(元)">
                </el-table-column>
                <el-table-column prop="goods_weight" label="商品重量">
                </el-table-column>
                <el-table-column prop="upd_time" label="创建时间">
                  <template slot-scope="scope">
                    {{scope.row.add_time| times}}
                  </template>
                </el-table-column>
                <el-table-column label="操作">  
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="edit(scope)">
                            编辑</el-button>
                        <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
            class="mt16"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="goodsQuery.pagenum"
                :page-sizes="[20, 40, 60, 80,140]"
                :page-size="goodsQuery.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import _ from "lodash";
import {getGoodsApi} from "@/http/api";
export default {
  data() {
    return {
      goodsQuery: {
        query: "",
        pagenum: 1,
        pagesize: 20,
      },
      total:0,
      goodsList:[]
    }
  },
  methods: {
    search:_.debounce(function(){
      this.getGoods()
    },500),
    async getGoods(){
      let res = await getGoodsApi(this.goodsQuery);
      console.log(res)
      this.goodsList = res.goods
      this.total = res.total
    },
    // 分页
    handleSizeChange(val) {
      console.log(val);
      this.goodsQuery.pagesize = val;
      this.getGoods()
    },
    handleCurrentChange(val) {
      console.log(val);
      this.goodsQuery.pagenum = val;
      this.getGoods()
    },
  },
  // 在页面创建的时候调用方法渲染页面
  created() {
    this.getGoods()
  },
  computed: {},
  watch: {},
  filters: {
    times(val) {
      return new Date(val).toLocaleString()
    }
  }
};
</script>
<style lang='scss' scoped>
</style>