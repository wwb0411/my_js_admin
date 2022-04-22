<template>
  <div class="box">
      <div class="header">
          <div class="left">
              <img src="../assets/imgs/屏幕截图 2022-04-18 155051.png" />
          </div>
          <div class="center">关联家人信息</div>
          <div class="right">完成</div>
      </div>
      <div class="xinxi">
          家人信息
      </div>
      <div class="inp">
          <div class="title">选择家人</div>
          <input type="text" placeholder="请选择该居民家人信息">
          <div class="youj">></div>
      </div>
      <div class="inp">
          <div class="title">与本人关系</div>
          <input type="text" placeholder="请选择家人与该居民关系">
          <div class="youj">></div>
      </div>
      <div class="news">+新增关联家人</div>
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
.box{
    width: 100%;
    background-color: #f7fafd;
    .header{
        background-color: #fff;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        box-sizing: border-box;
        .left{
            margin-top: 8px;
        }
        .center{
            font-size: 24px;
        }
        .right{
            color: goldenrod;
        }
    }
    .xinxi{
        padding: 0 20px;
        height: 70px;
        line-height: 70px;
        color: #cccccc;
    }
    .inp{
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        input{
            width: 240px;
            color: #cccccc;
            border: 0;
            outline: 0;
            height: 30px;
            margin-top: 3px;
        }
        .youj{
            color: #cccccc;
        }
    }
    .news{
        font-size: 16px;
        color: gold;
        text-align: center;
        margin-top: 20px;
    }
}
</style>