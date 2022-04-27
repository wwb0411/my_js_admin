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
              <el-row class="row_box" v-for="(item,index) in rolesList[scope.$index].children" :key="index">
              <el-col class="col_box" type="flex" :span="4" >
                  <el-tag @close="deltag(scope.row,item.id)" closable effect="dark" >{{item.authName}}</el-tag>
                </el-col>
              <el-col :span="20">
                <el-row v-for="(ite,ind) in item.children" :key="ind">
                  <el-col :span="6">
                    <el-tag @close="deltag(scope.row,ite.id)" closable effect="dark" type="success" >{{ite.authName}}</el-tag>
                  </el-col>
                  <el-col :span="18">
                    <el-tag @close="deltag(scope.row,ele.id)" closable effect="dark" type="success" v-for="(ele,i) in ite.children" :key="i">{{ele.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
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
            <el-button size="mini" type="success" @click="changeRights(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
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
    <!-- 编辑角色 -->
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
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="isShow2" :before-close="handleClose">
        <el-tree
        ref="treeRef"
          :data="rights"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="checkArr"
          :props="defaultProps ">
        </el-tree>
      <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="setRolesRoghts">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { rolesId, addRoles, editRoles, delRoles } from "@/http/api";
export default {
  data() {
    return {
      // 角色数据列表
      rolesList: [],
      // 选中的列表id数组
      checkArr:[],
      // 添加角色模态框显示隐藏
      isShow1: false,
      // 分配权限模态框显示隐藏
      isShow2: false,
      // 编辑角色模态框显示隐藏
      isShow: false,
      // 添加角色模态框表单数据
      addRole: {},
      addRole1: {},
      rules1: {
        roleName: [
          { required: true, message: "请输入角色名", trigger: "blur" },
          { min: 2, max: 8, message: "请输入 2 到 8 个字符", trigger: "blur" },
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
      rights:[],
      roleId:0,
      defaultProps:{
        children:'children',
        label:'authName'
      }
    };
  },
  methods: {
    async setRolesRoghts(){
      let checkAllArr =this.$refs.treeRef.getCheckedKeys()
      let checkHalfArr = this.$refs.treeRef.getHalfCheckedKeys()
      let check = []
      check.push(...checkAllArr,...checkHalfArr)
      let rids = check.join(',')
      await this.$api.addRightsId(this.roleId,rids)
      this.getRole()
      this.isShow2 = false
    },
    handleClose(){
      this.checkArr = []
      this.isShow2 = false
    },
    // 打开权限分配模态框
    async changeRights(row) {
      this.roleId = row.id
      this.dg(row,this.checkArr)
      let res = await this.$api.getRights('tree')
      this.rights = res
      this.isShow2 = true;
    },
    dg(row,checkArr){
      if(!row.children){
        return checkArr.push(row.id)
      }
      row.children.forEach(item=>{
        this.dg(item,checkArr)
      })

    },
    //删除角色授权权限
    deltag(row, rightsId) {

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
           let res = await this.$api.delRightsId(row.id, rightsId);
            row.children = res
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    async getRole() {
      let res = await rolesId();
      this.rolesList = res;
    },
    async doAdd() {
      let res = await addRoles(this.addRole);
      console.log(res);
      this.getRole();
      this.isShow1 = false;
    },
    edit(row) {
      console.log(row);
      this.addRole1 = {
        roleName: row.roleName,
        roleDesc: row.roleDesc,
        id: row.id,
      };
      this.isShow = true;
    },
    async doEdit() {
      let res = await editRoles(this.addRole1);
      console.log(res);
      this.isShow = false;
      this.getRole();
    },
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delRoles(id);
          console.log(res);
          this.getRole();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getRole();
  },
  computed: {},
  watch: {},
};
</script>
<style lang='scss' scoped>
.row_box {
  padding: 10px 20px;
  display: flex;
  align-items: center;
}
.el-tag {
  margin: 10px;
}
</style>