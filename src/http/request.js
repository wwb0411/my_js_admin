//引入axios
import axios from "axios";
import { Message } from "element-ui";
//引入env
import encConfig from "./env";

//创建axios实例
const service = axios.create({
  baseURL: encConfig.jdz.baseURL,
  timeout: 5000,
});

//创建请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//创建响应拦截器
service.interceptors.response.use(
  (res) => {
    const {
      meta: { msg, status: code },
      data: result,
    } = res.data;
    const successCode = [200, 201, 204];
    if (successCode.includes(code)) {
      Message({
        message: msg,
        type: "success",
      });
      if (res.config.url === "login") {
        console.log("令牌", result.token);
        sessionStorage.setItem("token", result.token);
      }
      return result;
    }
    Message({
      message: msg,
      type: "error",
    });
    return Promise.reject(msg);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
