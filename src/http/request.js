//引入axios
import axios from "axios";
import { Message } from "element-ui";
//引入env
import encConfig from "./env";

//创建axios实例
const service = axios.create({
  // 设置基地址
  baseURL: encConfig.jdz.baseURL,
  // 请求超时时间
  timeout: 5000,
});

//创建请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers.Authorization = sessionStorage.getItem('token')
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//创建响应拦截器
service.interceptors.response.use(
  (res) => {
    // 解构赋值 从res.data拿数据
    const {
      meta: { msg, status: code },
      data: result,
    } = res.data;
    // 这是三个成功的状态码
    const successCode = [200, 201, 204];
    // 判断 如果成功就提示成功
    if (successCode.includes(code)) {
      Message({
        message: msg,
        type: "success",
      });
      // 如果是登陆页面就在本地存储一个令牌
      if (res.config.url === "login") {
        sessionStorage.setItem("token", result.token);
      }
      // 返回请求成功的结果
      return result;
    }
    // 请求失败后提示
    Message({
      message: msg,
      type: "error",
    });
    // 直接返回
    return Promise.reject(msg);
  },
  (error) => {

    return Promise.reject(error);
  }
);
// 将axios实例抛出
export default service;
