<template>
  <div class="box">
      <div class="header">
          <div class="left">
              <img src="../assets/imgs/屏幕截图 2022-04-18 155051.png" />
          </div>
          <div class="center">签约详情</div>
          <div class="right">查看协议</div>
      </div>
      <div class="tiao">
          审核通过，提醒居民支付中
      </div>
      <div class="xx">
          <div class="title">居民信息</div>
            <div class="card">
                <div class="content">
                    <div class="name">姓名</div>
                    <div class="name">身份证号</div>
                    <div class="name">性别</div>
                    <div class="name">年龄</div>
                    <div class="name">联系电话</div>
                    <div class="name">现居地</div>
                </div>
                <div class="content1">
                    <div class="name1">王安然</div>
                    <div class="name1">371456198908090543</div>
                    <div class="name1">女</div>
                    <div class="name1">26</div>
                    <div class="name1">15678909900</div>
                    <div class="name1">怀柔区洛西县建设小路青莲小区6-601</div>
                </div>
            </div>
      </div>
       <div class="xx">
          <div class="title">签约信息</div>
            <div class="card">
                <div class="content">
                    <div class="name">签约状态</div>
                    <div class="name">签约机构</div>
                    <div class="name">签约团队</div>
                    <div class="name">签约医生</div>
                    <div class="name">服务包</div>
                    <div class="name">签约周期</div>
                    <div class="name">生效时间</div>
                </div>
                <div class="content1">
                    <div class="name1" style="color:yellow;">待审核</div>
                    <div class="name1">洛西社区卫生服务站</div>
                    <div class="name1">李明明团队</div>
                    <div class="name1">李明明</div>
                    <div class="name1">老人服务包</div>
                    <div class="name1">1年</div>
                    <div class="name1">2020/10/09</div>
                </div>
            </div>
      </div>
      <div class="xx" style="padding-bottom:60px;">
          <div class="title">签约信息</div>
            <div class="card">
                <div class="content">
                    <div class="name">签约状态</div>
                    <div class="name">签约机构</div>
                    <div class="name">签约团队</div>
                    <div class="name">签约医生</div>
                    <div class="name">服务包</div>
                    <div class="name">签约周期</div>
                    <div class="name">生效时间</div>
                </div>
                <div class="content1">
                    <div class="name1" style="color:yellow;">待审核</div>
                    <div class="name1">洛西社区卫生服务站</div>
                    <div class="name1">李明明团队</div>
                    <div class="name1">李明明</div>
                    <div class="name1">老人服务包</div>
                    <div class="name1">1年</div>
                    <div class="name1">2020/10/09</div>
                </div>
            </div>
      </div>
      <div class="tab">
          <button class="btn">提醒支付</button>
      </div>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  setup(props) {
    let data = reactive({});
    return {};
  }
};
</script>
<style lang='scss' scoped >
.box {
  width: 100%;
  background-color: #f7fafd;
  .header {
    background-color: #fff;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
    .left {
      margin-top: 8px;
    }
    .center {
      font-size: 24px;
    }
    .right {
      color: goldenrod;
    }
  }
  .tiao {
    height: 40px;
    line-height: 40px;
    background-color: yellowgreen;
    color: #fff;
    padding: 0 20px;
    font-size: 14px;
  }
  .xx {
    //
    background-color: #dfeef3;
    .title {
      padding: 0 20px;
      height: 60px;
      font-size: 22px;
      line-height: 60px;
    }
    .card {
      margin-left: 20px;
      background-color: #fff;
      padding: 20px 10px;
      box-sizing: border-box;
      width: 90%;
      display: flex;
      .content {
        width: 20%;
        .name {
          height: 30px;
          line-height: 30px;
          color: rgb(124, 75, 75);
          font-size: 14px;
        }
      }
      .content1 {
        margin-left: 20px;
        .name1 {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
  }
  .tab {
    width: 100%;
    height: 60px;
    line-height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 0 10px;
    background-color: #fff;
    .btn {
      width: 90%;
      border: 0;
      height: 50px;
      border-radius: 10px;
      margin-left: 10px;
      font-size: 16px;
      background-color: rgb(180, 176, 164);
      color: #fff;
    }
  }
}
</style>