import service from "@/utils/request";
/**
 * 角色列表
 */
export function GetRole(data = {}) {
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}

/**
 * 添加
{
username：用户名（string）*
truename：真实姓名（string）
password：密码（string）*
phone：手机号（number）
region：地区（json）
status：禁启用状态（string）*
role：角色类型（string）*
}
 */
export function UserAdd(data = {}) {
    return service.request({
        method: "post",
        url: "/user/add/",
        data
    })
}
/**
 * 删除用户	
{
id: 用户ID（array）
}
 */
export function UserDel(data) {
    return service.request({
        method: "post",
        url: "/user/delete/",
        data
    })
}
/**
 * 用户禁启用{
id: 用户ID（number）
status: 状态（string）1：禁用，2：启用
}
 */
export function UserActives(data) {
    return service.request({
        method: "post",
        url: "/user/actives/",
        data
    })
}