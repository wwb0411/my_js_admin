import request from "./request";

export function loginApi(data) {
  return request({
    url: "login",
    method: "POST",
    data,
  });
}
export function menuApi() {
  return request({
    url: "/menus",
    method: "GET",
    data: sessionStorage.getItem("token"),
  });
}
export function getusersApi(params) {
  return request({
    url: "/users",
    method: "GET",
    params,
  });
}
export function changeState(uid, type) {
  return request({
    url: `/users/${uid}/state/${type}`,
    method: "PUT",
  });
}
export function addUser(data) {
  return request({
    url: "/users",
    method: "POST",
    data
  });
}

export function delUser(id) {
  return request({
    url: `/users/${id}`,
    method: "DELETE"
  });
}

export function editUser(data) {
  return request({
    url: `/users/${data.id}`,
    method: "PUT",
    data
  });
}
// 分配权限
export function rolesId(id) {
  return request({
    url: `/roles/${id}`,
    method: "GET"
  });
}
