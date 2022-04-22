<template>
    <div class="box">
        <div class="tou">
            <div class="left">
                <img src="../assets/imgs/屏幕截图 2022-04-18 155051.png" />
            </div>
            <div class="center">新建居民档案</div>
            <div></div>
        </div>
        <div class="xinxi">
            <div>居民用户信息</div>
        </div>
        <div class="context">
            <div class="item">
                <div class="name">真实姓名*</div>
                <input type="text" placeholder="请填写居民的真实姓名">
            </div>
            <div class="item">
                <div class="name">身份证号*</div>
                <input type="text" placeholder="请填写居民的身份证号">
            </div>
            <div class="item">
                <div class="name">身份证号*</div>
                <input type="text" placeholder="请填写居民的身份证号">
                <div class="jt" style="float:right;">
                    >
                </div>
            </div>
            <div class="item">
                <div class="name">身份证号*</div>
                <input type="text" placeholder="请填写居民的身份证号">
                <div class="jt" style="float:right;">
                    >
                </div>
            </div>
            <div class="item">
                <div class="name">手机号码*</div>
                <input type="text" placeholder="居民登录账号，请正确填写">
            </div>
            <div class="item">
                <div class="name">登陆密码*</div>
                <input type="text" placeholder="8位以上的数字和字母的组合">
            </div>
            <div class="item">
                <div class="name">现居地</div>
                <input type="text" placeholder="点击选择居民地址">
            </div>
            <div style="height:10px;background:#dfeef3;"></div>
            <div class="item">
                <div class="name">居民标签</div>
                <input type="text" placeholder="点击选择居民标签">
            </div>
            <div class="b">
                <div class="bb">高血压</div>
                <div class="bb">冠心病</div>
                <div class="bb">高血糖</div>
                <div class="bb">高血脂</div>
                <div class="bb">高血压</div>
                <div class="bb">冠心病</div>
                <div class="bb">高血糖</div>
                <div class="bb">高血脂</div>
                </div>
            <div class="item">
                <div class="name">关联家人</div>
                <input type="text" placeholder="请选择该居民家人信息">
                <div class="jt" style="float:right;">
                    >
                </div>
            </div>
            <div class="item">
                <div class="name">立即签约</div>
                <img style="width:40px;height:25px;float:right;margin-top:5px;margin-left:250px;" src="../assets/imgs/微信图片_20220418164027.png" alt="">
            </div>
            <div class="item">
                <button>下一步</button>
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
  .xinxi {
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    background-color: #dfeef3;
  }
  .context {
    background-color: #fff;
    .item {
      display: flex;
      border-bottom: 1px solid #eee;
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      button {
        margin-right: 10px;
        height: 40px;
        width: 100%;
        border: 0;
        background-color: #ddd;
        border-radius: 5px;
        font-size: 18px;
        color: #fff;
      }
      .name {
        width: 100px;
      }
      input {
        outline: 0;
        border: 0;
      }
      .jt {
        margin-left: 105px;
      }
    }
    .b {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      background-color: #fff;
      .bb {
        width: 18%;
        padding: 5px;
        margin: 2%;
        border: 1px solid #ddd;
        border-radius: 5px;
        color: #999999;
        font-size: 15px;
        text-align: center;
      }
    }
    .item:nth-child(7) {
      border-bottom: 0;
    }
    .item:nth-child(12) {
      height: 60px;
    }
  }
}
</style>