<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hy' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt16">
      <!-- 搜索框添加用户按钮 -->
      <el-row :gutter="10">
        <el-col :span="8">
          <el-button type="primary" @click="add">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 数据表格 -->
      <el-table class="mt16" :data="cateList" border style="width: 100%" row-key="cat_id" :tree-props="props">
        <el-table-column type="index" label="#" width="80">
          <template slot-scope="scope">
            <div>
              {{scope.row.index}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称">
        </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <div>
              <i v-if="!scope.row.cat_deleted" class="el-icon-circle-check"></i>
              <i v-else class="el-icon-circle-close"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.cat_level == 0" >一级</el-tag>
            <el-tag size="mini" v-if="scope.row.cat_level == 1" type="success">二级</el-tag>
            <el-tag size="mini" v-if="scope.row.cat_level == 2" type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">  
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">
              编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mt16"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cateQuery.pagenum"
        :page-sizes="[2,4,6,8]"
        :page-size="cateQuery.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑分类" :visible.sync="isEdit">
      <el-form :model="editForm">
        <el-form-item label="分类名称">
          <el-input v-model="editForm.editCatName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isEdit = false">取 消</el-button>
        <el-button type="primary" @click="doEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加模态框 -->
    <el-dialog title="添加分类" :visible.sync="isAdd">
      <el-form :model="addForm">
        <el-form-item label="分类名称">
          <el-input v-model="addForm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
          ref="cascader"
          :options="options"
          :props="props1"
          @change="change"
          clearable></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAdd = false">取 消</el-button>
        <el-button type="primary" @click="addCateok">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      cateList: [],
      total: 0,
      cateQuery: {
        pagenum: 1,
        pagesize: 2,
      },
      cateQuery1: {
        type: "2",
      },
      isEdit: false,
      isAdd: false,
      editForm: {
        editCatName: "",
        cat_id: 0,
      },
      addForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      catId:[],
      options: [],
      // 树形结构参数
      props: {
        children: "children",
        hasChildren: "hasChildren",
      },
      props1: {
        expandTrigger: "hover",
        label: "cat_name",
        children: "children",
        value: "cat_id",
        checkStrictly: true,
      },
    };
  },
  created() {
    this.getCate();
  },
  methods: {
    // 确定添加分类
    async addCateok() {
      if (!this.catId.length) {
        this.addForm.cat_level = 0;
      } else if (this.catId.length == 1) {
        this.addForm.cat_pid = this.catId[0]
        this.addForm.cat_level = 1;
      } else if (this.catId.length == 2) {
        this.addForm.cat_pid = this.catId[this.catId.length-1]
        this.addForm.cat_level = 2;
      }
      await this.$api.addCategories(this.addForm);
      this.getCate();
      console.log(this.addForm);
      this.isAdd = false;
    },
    change(e) {
      this.$refs.cascader.dropDownVisible = false;
      this.catId = e;
    },
    async add() {
      let res = await this.$api.getCategories(this.cateQuery1);
      this.options = res;
      console.log(this.options);
      this.isAdd = true;
    },
    async doEdit() {
      console.log(this.editForm);
      await this.$api.editCategories(this.editForm);
      this.getCate();
      this.isEdit = false;
    },
    // 打开编辑模态框 数据回填
    edit(row) {
      console.log(row);
      this.editForm.editCatName = row.cat_name;
      this.editForm.cat_id = row.cat_id;
      this.isEdit = true;
    },
    // 分页
    handleSizeChange(val) {
      this.cateQuery.pagesize = val;
      this.getCate();
    },
    handleCurrentChange(val) {
      this.cateQuery.pagenum = val;
      this.getCate();
    },
    // 获取分类列表
    async getCate() {
      let res = await this.$api.getCategories(this.cateQuery);
      this.cateList = res.result;
      this.cateList.forEach((item, index) => {
        item.index = index + 1;
      });
      this.total = res.total;
    },
    // 删除分类
    del(row) {
      this.$confirm("你确定要删除这个分类吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$api.delCategories(row.cat_id);
          this.getCate();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>
<style lang='scss' scoped>
.el-icon-circle-close {
  color: pink;
}
.el-icon-circle-check {
  color: goldenrod;
}
</style>
<style>
.el-cascader-node > .el-radio {
  position: absolute;
  width: 100%;
}
.el-radio__inner {
  display: none;
}
</style>
