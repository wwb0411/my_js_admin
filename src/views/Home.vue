<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="title">
          <h2>后台管理系统</h2>
        </div>
        <el-button style="height:40px;" @click="tc" type="info">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="flag ? '65px' : '200px ' ">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#333744" text-color="#fff" active-text-color="#ffd04b" router :collapse-transition="false" unique-opened :collapse="flag">
              <header @click="open">|||</header>
              <el-submenu :index="index+''" v-for="(item,index) in menus" :key="index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">{{item.authName}}</span>
                </template>
                <el-menu-item-group v-for="(ite,ind) in item.children" :key="ind">
                  <el-menu-item :index="'/'+ite.path">{{ite.authName}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menuApi } from "@/http/api";
export default {
  data() {
    return {
      flag: false,
      menus: [],
    };
  },
  methods: {
    tc() {
      this.$confirm("你确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("token");
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    open() {
      this.flag = !this.flag;
    },
  },
  async mounted() {
    let res = await menuApi();
    this.menus = res;
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      width: 100%;
      height: 60px;
      background-color: #373d41;
      .title {
        text-align: center;
        float: left;
        margin-left: 850px;
        color: #fff;
      }
      .el-button {
        margin-top: 10px;
        float: right;
      }
    }
    .el-aside {
      height: 100%;
      .el-menu {
        height: 100%;
        header {
          text-align: center;
          color: #fff;
        }
        header:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>