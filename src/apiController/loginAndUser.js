// 1、引入axios实例=============================================================================
import { apirequest } from "@/axios";
// 2、封装axios请求api==========================================================================
const loginAndUserApi = {
  // ①请求路径常量---------------------------------------------------
  // loginUrl: '/nologin/login',

  // ②请求方法函数封装------------------------------------------------
  // 登录方法
  login: data =>
    apirequest({
      url: "/mliang/nologin/login",
      method: "POST",
      data
    }),
  // 获取用户列表
  userList: userId =>
    apirequest({
      url: `/mliang/getUserList`,
      method: "GET"
    }),
  // 用户登录
  register: data =>
    apirequest({
      url: `/mliang/save`,
      method: "POST",
      data
    }),
  // 获取所有角色下拉表
  getRoleList: () =>
    apirequest({
      url: `/mliang/getRoleList`,
      method: "GET",
    }),
  // 根据角色，用户名，手机号搜索
  searchUserList: data =>
    apirequest({
      url: `/mliang/searchUserList`,
      method: "POST",
      data
    }),
  // 根据用户id去获取用户详情
  getUserDetailById: id =>
    apirequest({
      url: `/mliang/getRoleList/${id}`,
      method: "GET"
    })
};

export { loginAndUserApi };
