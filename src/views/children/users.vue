<template>
    <div>
        <!-- 头部面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/hy' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt16">
            <!-- 搜索框添加用户按钮 -->
            <el-row :gutter="10">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" clearable @input="search" @clear="search" v-model="userQuery.query" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="isShow = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 数据表格 -->
            <el-table class="mt16" :data="userList" border style="width: 100%">
                <el-table-column prop="date" type="index" label="#" width="80">
                </el-table-column>
                <el-table-column prop="username" label="姓名">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="mobile" label="电话">
                </el-table-column>
                <el-table-column prop="role_name" label="角色">
                </el-table-column>
                <el-table-column prop="mg_state" label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change="stateChange(scope)" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="edit(scope)">
                            编辑</el-button>
                        <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
                        <el-button size="mini" type="success" @click="userRole(scope.row)">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
            class="mt16"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="userQuery.pagenum"
                :page-sizes="[2, 4, 6, 8,14,28]"
                :page-size="userQuery.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
         <!-- 添加表单 -->
            <el-dialog title="添加用户" :visible.sync="isShow">
                <el-form ref="forms" label-width="80px" :rules="rules" :model="form" >
                    <el-form-item label="用户名:" prop="username">
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="email">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" prop="mobile">
                        <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="isShow = false">取 消</el-button>
                    <el-button type="primary" @click="addUsers">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 编辑表单 -->
            <el-dialog title="编辑用户" :visible.sync="isShow1">
                <el-form ref="forms1" label-width="80px" :rules="rules1" :model="form1" >
                    <el-form-item label="用户名:" prop="username">
                        <el-input disabled v-model="form1.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="email">
                        <el-input v-model="form1.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" prop="mobile">
                        <el-input v-model="form1.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="isShow1 = false">取 消</el-button>
                    <el-button type="primary" @click="doEdit">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 分配权限表单 -->
            <el-dialog title="分配权限" :visible.sync="isShow2">
                <el-form ref="forms1" label-width="120px">
                    <el-form-item label="当前的用户:" >
                      <span>{{qx.username}}</span>
                    </el-form-item>
                    <el-form-item label="当前的角色:" >
                      <span>{{qx.role_name}}</span>
                    </el-form-item>
                    <el-form-item label="分配新角色:" >
                      <el-select v-model="rid" placeholder="请选择">
                        <el-option
                          v-for="item in qx.relos"
                          :key="item.id"
                          :value="item.id"
                          :label="item.roleName"
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="isShow2 = false">取 消</el-button>
                    <el-button type="primary" @click="changeRelos">确 定</el-button>
                </div>
            </el-dialog>
    </div>
</template>
<script>
import _ from "lodash";
import {
  getusersApi,
  changeState,
  addUser,
  delUser,
  editUser,
  rolesId,
  changeRole,
} from "@/http/api.js";
export default {
  data() {
    return {
      userList: [],
      userQuery: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total: 0,
      //   打开添加模态框
      isShow: false,
      //  打开编辑模态框
      isShow1: false,
      //  打开分配权限模态框
      isShow2: false,
      // 分配权限的数据
      qx: {
        username: "",
        roleName: "",
        relos: [],
      },
      // 权限id
      rid: "",
      //   模态框的表单内容
      form: {
        username: "",
        email: "",
        password: "",
        mobile: "",
      },
      //   编辑模态框的表单内容
      form1: {
        username: "",
        email: "",
        password: "",
        mobile: "",
      },
      //   添加表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "请输入 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "请输入 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      },
      //   编辑表单验证规则
      rules1: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //   渲染页面
    async getUsers() {
      const res = await getusersApi(this.userQuery);
      console.log(res);
      this.total = res.total;
      this.userList = res.users;
    },
    // 编辑
    edit(scope) {
      //   数据回填
      this.form1 = {
        username: scope.row.username,
        mobile: scope.row.mobile,
        email: scope.row.email,
        password: scope.row.password,
        id: scope.row.id,
      };
      this.isShow1 = true;
    },
    // 确定编辑
    async doEdit() {
      this.$refs.forms1.validate(async (valid) => {
        if (!valid) return false;
        let res = await editUser(this.form1);
        console.log(res);
        this.isShow1 = false;
        this.getUsers();
        this.form1 = {
          username: "",
          password: "",
          email: "",
          mobile: "",
        };
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(val);
      this.userQuery.pagesize = val;
      this.getUsers();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.userQuery.pagenum = val;
      this.getUsers();
    },
    // 搜索
    search: _.debounce(function() {
      this.getUsers();
    }, 500),
    // 添加用户
    async stateChange(scope) {
      console.log(scope.row.id);
      let res = await changeState(scope.row.id, scope.row.mg_state);
      console.log(res);
    },
    addUsers() {
      this.$refs.forms.validate(async (valid) => {
        if (!valid) return false;
        let res = await addUser(this.form);
        console.log(res);
        this.getUsers();
        this.form = {
          username: "",
          password: "",
          email: "",
          mobile: "",
        };
        this.isShow = false;
      });
    },
    // 删除用户
    del(scope) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delUser(scope.row.id);
          console.log(res);
          this.getUsers();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 分配权限
    async userRole(row) {
      let res = await rolesId();
      this.qx = row;
      this.qx.relos = res;
      this.isShow2 = true;
    },
    // 调用接口
    async changeRelos() {
      console.log(this.rid, this.qx.id);
      let res = await changeRole(this.qx.id, this.rid);
      console.log(res);
      this.rid = "";
      this.isShow2 = false;
      this.getUsers();
    },
  },
  // 在页面创建的时候调用方法渲染页面
  created() {
    this.getUsers();
  },
  computed: {},
  watch: {},
};
</script>
<style lang='scss' scoped>
</style>