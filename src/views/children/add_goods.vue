<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hy' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt16">
      <el-alert type="info" title="添加商品信息" show-icon center>
      </el-alert>
      <el-steps class="mt16" align-center :active="active*1" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs class="mt16" @tab-click="changeTab" :before-leave="changeActive" v-model="active" tab-position="left" style="height: 100%;">
        <!-- 基本信息表单 -->
        <el-tab-pane label="基本信息" name="0">
          <el-form :rules="rules" label-position="top" label-width="80px" :model="goods_form">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="goods_form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="goods_form.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="goods_form.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="goods_form.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
              <el-cascader v-model="goods_form.goods_cat" :options="goodsCategories" :props="props" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <el-form>
            <el-form-item v-for="(item,index) in manyList" :key="index" :label="item.attr_name">
              <el-checkbox-group v-model="item.attr_vals" >
                <el-checkbox v-for="(item1,index1) in item.attr_vals" :key="index1" :label="item1"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <el-form>
            <el-form-item v-for="(item,index) in onlyList" :key="index" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <el-upload class="upload-demo" action="http://www.ysqorz.top:8888/api/private/v1/upload" :on-preview="handlePreview" :on-remove="handleRemove" multiple :limit="3" :on-success="handleSuccess" :headers="{Authorization:token}" :file-list="goods_form.pics">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <quill-editor style="height:200px;" v-model="goods_form.goods_introduce" ref="myQuillEditor"></quill-editor><br><br>
          <div class="mt16">
            <el-button type="primary" size="mini" @click="addGoods">添加商品</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 步骤条和tabs的默认值
      active: "0",
      // 添加商品的商品信息列表
      goods_form: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_introduce: "",
        goods_cat: [],
        // 存放图片路径
        pics: [],
        // 存放动态参数和静态属性
        attr: [],
      },
      // 商品分类列表
      goodsCategories: [],
      // 分类id的数组长度3
      // goods_rid: [],
      props: {
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        value: "cat_id",
      },
      token: sessionStorage.getItem("token"),
      // 正则校验
      rules: {
        goods_name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "blur",
          },
        ],
        goods_price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur",
          },
          {
            pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: "请输入大于0的整数或小数",
            trigger: "blur",
          },
        ],
        goods_weight: [
          {
            required: true,
            message: "请输入商品重量",
            trigger: "blur",
          },
          {
            pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: "请输入大于0的整数或小数",
            trigger: "blur",
          },
        ],
        goods_number: [
          {
            required: true,
            message: "请输入商品数量",
            trigger: "blur",
          },
          {
            pattern: /^[1-9][0-9]*$/,
            message: "请输入大于0的整数",
            trigger: "blur",
          },
        ],
      },
      // 动态参数列表
      manyList: [],
      // 静态属性列表
      onlyList: [],
    };
  },
  methods: {
    // 确定添加
    async addGoods() {
      const dong = this.manyList.map((item) => {
        if (!item) {
          return {};
        } else {
          return {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(","),
          };
        }
      });
      
      const jing = this.onlyList.map((item) => {
        console.log('item:',item)
        if (!item) {
          return {};
        } else {
          return {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          };
        }
      });
      this.goods_form.attr = [...dong, ...jing];
      this.goods_form.goods_cat = this.goods_form.goods_cat.join(",");
      await this.$api.addGoodsApi(this.goods_form)
      this.$router.push('/goods')
    },
    // 用于图片预览
    handlePreview() {},
    // 图片移出的回调
    handleRemove(val) {
      console.log(val);
      let delPicInfo = val.pic;
      let index = this.goods_form.findIndex((item) => {
        return (item.tmp_path = delPicInfo);
      });
      this.goods_form.pics.splice(index, 1);
    },
    // 上传成功的回调函数
    handleSuccess(val) {
      let picsInfo = {
        pic: val.data.tmp_path,
      };
      this.goods_form.pics.push(picsInfo);
      console.log(this.goods_form.pics);
    },
    // 给goods_form里的goods_cat
    handleChange(val) {
      this.goods_form.goods_cat = val;
    },
    // 如果没有选择三级分类禁止跳转
    changeActive(val) {
      this.active = val;
      if (this.goods_form.goods_cat.length < 3) {
        this.$message({
          message: "请选择三级分类",
          typr: "warning",
        });
        this.active = 0;
        return false;
      }
    },
    // tab切换 如果是动态参数传many 如果是静态属性传only
    async changeTab() {
      if (this.active == 1) {
        let res = await this.$api.getCategoriesId(this.csId);
        res.forEach((item) => {
          return (item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : []);
        });
        console.log(res);
        this.manyList = res;
      } else if (this.active == 2) {
        let res = await this.$api.getCategoriesId(this.csId, "only");
        this.onlyList = res;
        console.log(this.onlyList);
      }
    },
  },
  async created() {
    let res = await this.$api.getCategories();
    this.goodsCategories = res;
    console.log(this.goodsCategories);
  },
  // 用来请求动态参数
  computed: {
    csId() {
      return this.goods_form.goods_cat[this.goods_form.goods_cat.length - 1];
    },
  },
  watch: {},
};
</script>
<style lang='scss' scoped>
::v-deep .el-step__title {
  font-size: 14px;
}
</style>