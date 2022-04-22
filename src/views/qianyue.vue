<template>
  <div class="box">
    <div class="tou">
      <div class="left">
        <img src="../assets/imgs/屏幕截图 2022-04-18 155051.png" />
      </div>
      <div class="center">填写签约信息</div>
      <div></div>
    </div>
    <div class="xinxi">签约信息</div>
    <div class="item">
      <div class="left">签约机构</div>
      <div class="center">
        <input type="text" placeholder="洛西社区卫生服务站">
      </div>
      <div class="right">></div>
    </div>
    <div class="item">
      <div class="left">签约团队</div>
      <div class="center">
        <input type="text" placeholder="李明明团队">
      </div>
      <div class="right">></div>
    </div>
    <div class="item">
      <div class="left">签约医生</div>
      <div class="center">
        <input type="text" placeholder="李明明">
      </div>
      <div class="right"></div>
    </div>
    <div class="item">
      <div class="left">服务包</div>
      <div class="center">
        <input type="text" placeholder="老人服务包">
      </div>
      <div class="right">></div>
    </div>
    <div class="item">
      <div class="left">签约周期</div>
      <div class="center">
        <input type="text" placeholder="1年">
      </div>
      <div class="right"></div>
    </div>
    <div class="item">
      <div class="left">生效日期</div>
      <div class="center">
        <input type="text" placeholder="2020年09月01日">
      </div>
      <div class="right">></div>
    </div>
    <div class="item">
      <div class="left">费用</div>
      <div class="center">
        <input type="text" placeholder="￥120">
      </div>
      <div class="right"></div>
    </div>
    <div class="item" style="height:160px">
      <div class="left">备注</div>
      <div class="center">
        <textarea cols="40" rows="10" placeholder="请输入备注"></textarea>
      </div>
    </div>
    <div class="btn">
      <button>提交</button>
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
    }
  }
  .xinxi{
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    width: 100%;
    background-color: #dfeef3;
    font-size: 22px;
  }
  .item{
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    padding-bottom: 2px;
    border-bottom: 1px solid #ddd;
    .left{
      color: #ccc;
      font-size: 18px;
    }
    .center{
      margin-right: 30px;
      textarea{
        background-color: #ccc;
        border-radius: 20px;
        padding-top: 10px;
        padding-left: 20px;
      }
      input{
        border: 0;
        outline: 0;
        font-size: 16px;
        height: 100%;
        color: #000;
      }
    }
  }
  .btn{
    width: 100%;
    button{
      height: 40px;
      border: 0;
      width: 80%;
      margin-left:45px ;
      margin-top: 120px;
      border-radius: 15px;
      background-color: burlywood;
    }
  }
}
</style>