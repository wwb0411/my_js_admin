<template>
  <div class="box">
    <div class="tou">
      <div class="left">
        <img src="../assets/imgs/屏幕截图 2022-04-18 155051.png" />
      </div>
      <div class="center">结果</div>
      <div></div>
    </div>
    <div class="cg">
      <div class="imgs">
        <img src="../assets/imgs/提交成功.png" />
      </div>
      <div class="h">提交成功,等待居民支付</div>
      <div class="j">签约信息已提交,居民支付后可完成签约</div>
      <div class="btn">
          <button class="b1">查看签约进度</button>
          <button class="b2">返回首页</button>
      </div>
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
<style lang='scss' scoped>
.box {
  position: relative;
  .tou {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: 60px;
    line-height: 60px;
    .left {
      margin-top: 5px;
    }
    .center {
      font-size: 22px;
      margin-right: 20px;
    }
  }
  .cg {
    width: 100%;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .h {
      width: 270px;
      font-size: 26px;
      margin-top: 10px;
    }
    .j {
      width: 315px;
      color: #ccc;
      margin-top: 20px;
      font-size: 18px;
    }
    .btn {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
        button{
          width: 80%;
          height: 50px;
          margin-top: 20px;
          font-size: 18px;
          border: 0;
          border-radius: 10px;
        }
        .b1{
          background-color: rgb(151, 167, 130);
          color: #fff;
        }
        .b2{
          background-color: #fff;
          color: rgb(137, 161, 106);
          border: 1px solid #ccc;
        }
    }
  }
}
</style>