import request from "./request";

export function loginApi(data) {
  return request({
    url: "login",
    method: "POST",
    data,
  });
}
