<template>
  <div>
    <!-- 头部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hy' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt16">
      <!-- 搜索框添加角色按钮 -->
      <el-button type="primary" @click="isShow1 = true">添加角色</el-button>
      <!-- 数据表格 -->
      <el-table class="mt16" :data="rolesList" border style="width: 100%">
        <el-table-column width="80" type="expand">
          <template slot-scope="scope">
            <div v-for="(item,index) in rolesList[scope.$index].children" :key="index">
             c <el-row>
              <el-col :span="8" style="text-align:center;">
                  <el-tag closable effect="dark" >{{item.authName}}</el-tag>
                </el-col>
              <el-col :span="16">
                <div v-for="(ite,ind) in item.children" :key="ind">
                  <el-tag closable effect="dark" type="success" style="margin-right:30px;" >{{ite.authName}}</el-tag>
                  <el-tag closable style="margin:0 10px;" effect="dark" type="success" v-for="(ele,i) in ite.children" :key="i">{{ele.authName}}</el-tag>
                </div>
              </el-col>
            </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" type="index" label="#" width="80">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
            <el-button size="mini" type="success" @click="userRole(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加角色" :visible.sync="isShow1">
      <el-form ref="form" label-width="100px" :rules="rules1" :model="addRole" >
          <el-form-item label="角色名称:" prop="roleName">
              <el-input v-model="addRole.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述:" prop="roleDesc">
              <el-input v-model="addRole.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="isShow1 = false">取 消</el-button>
          <el-button type="primary" @click="doAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色" :visible.sync="isShow">
      <el-form ref="form" label-width="100px" :rules="rules1" :model="addRole1" >
          <el-form-item label="角色名称:" prop="roleName">
              <el-input v-model="addRole1.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述:" prop="roleDesc">
              <el-input v-model="addRole1.roleDesc" autocomplete="off"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="isShow = false">取 消</el-button>
          <el-button type="primary" @click="doEdit">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
  import {
    rolesId,
    addRoles,
    editRoles,
    delRoles
  } from '@/http/api'
  export default {
    data() {
      return {
        // 角色数据列表
        rolesList: [],
        // 添加角色模态框显示隐藏
        isShow1:false,
        // 编辑角色模态框显示隐藏
        isShow:false,
        // 添加角色模态框表单数据
        addRole:{},
        addRole1:{},
        rules1:{
          roleName: [
            { required: true, message: "请输入角色名", trigger: "blur" },
            {min: 2,max: 8,message: "请输入 2 到 8 个字符",trigger: "blur"},
          ],
          roleDesc: [
            { required: true, message: "请输入角色描述", trigger: "blur" }
          ],
        }
      };
    },
    methods: {
      ss(ite){
        console.log(ite)
      },
      async getRole() {
        let res = await rolesId()
        this.rolesList = res
        console.log(this.rolesList)
      },
      async doAdd(){
        let res = await addRoles(this.addRole)
        console.log(res)
        this.getRole()
        this.isShow1 = false
      },
      edit(row){
        console.log(row)
        this.addRole1 = {
          roleName:row.roleName,
          roleDesc:row.roleDesc,
          id:row.id
        }
        this.isShow = true
      },
      async doEdit(){
         let res = await editRoles(this.addRole1)
         console.log(res)
         this.isShow = false
         this.getRole()
      },
      del(id){
        this.$confirm('你确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let res = await delRoles(id)
          console.log(res)
          this.getRole()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      }
    },
    mounted() {
      this.getRole()
    },
    computed: {},
    watch: {},
  };
</script>
<style lang='scss' scoped>

</style>