/**
 * Created by liweiliang 406320591@QQ.com on 2026/5/27 14:17.
 */
// import { subsystemCode } from "@/environment";

const getters = {
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  permissions: (state) => state.user.permissions,
  permissionsCode: (state) => state.user.permissionsCode,
  userId: (state) => state.user.user.userid,
  user: (state) => state.user.user,
  // language: (state) => state.user.language[subsystemCode]
};
export default getters;
