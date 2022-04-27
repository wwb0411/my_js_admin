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
    method: "GET"
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
export function getRights(type = "list"){
  return request({
    url: `rights/${type}`,
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


// 删除角色
export function delRoles(id) {
  return request({
    url: `/roles/${id}`,
    method: "DELETE"
  });
}

// 删除授权权限
export function delRightsId(roleId,rightId) {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: "DELETE"
  });
}

// 角色授权
export function addRightsId(roleid,rids) {
  return request({
    url: `roles/${roleid}/rights`,
    method: "POST",
    data:{rids}
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



// 删除商品
export function delGoods(id) {
  return request({
    url: `/goods/${id}`,
    method: "DELETE"
  });
}

// 获取商品分类列表
export function getCategories() {
  return request({
    url: '/categories',
    method: "GET"
  });
}

