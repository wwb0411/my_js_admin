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
    // data: sessionStorage.getItem("token"),
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
// 添加用户
export function addUser(data) {
  return request({
    url: "/users",
    method: "POST",
    data
  });
}
// 删除用户
export function delUser(id) {
  return request({
    url: `/users/${id}`,
    method: "DELETE"
  });
}
// 编辑用户
export function editUser(data) {
  return request({
    url: `/users/${data.id}`,
    method: "PUT",
    data
  });
}
// 获取角色列表
export function rolesId() {
  return request({
    url: `/roles`,
    method: "GET"
  });
}

// 分配权限
export function changeRole(id,rid){
  return request({
    url: `users/${id}/role`,
    method: "PUT",
    data:{rid:rid}
  });
}

// 获取权限列表
export function getRights(){
  return request({
    url: `rights/list`,
    method: "GET",
  });
}

// 添加角色
export function addRoles(data) {
  return request({
    url: "/roles",
    method: "POST",
    data
  });
}


// 编辑角色
export function editRoles(data) {
  console.log("编辑 ")
  return request({
    url: `/roles/${data.id}`,
    method: "PUT",
    data
  });
}


// 删除用户
export function delRoles(id) {
  return request({
    url: `/roles/${id}`,
    method: "DELETE"
  });
}


// 获取商品列表
export function getGoodsApi(params) {
  return request({
    url: `/goods`,
    method: "GET",
    params
  });
}