import service from "utils/request";
/**
 * 列表{
categoryId: 分类ID（number）
startTiem: 开始时间（string）
endTime: 结束时间（string）
title: 标题（string）
id: 信息ID（number）
pageNumber: 页码（number）*
pageSize: 条数（number）*
}
 */
export function GetList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data
  });
}
/**
 * 新增信息{
categoryId: 分类ID（number）*
title: 标题（string）*
imgUrl: 标题（string）*
createDate: 日期（string）*
status: 是否发布（string）（1：否，2：是）*
content: 内容
}
 */
export function AddInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data
  });
}
/**
 * 编辑{
id: 信息ID（string）
categoryId: 分类ID（string）
title: 标题（string）
updateDate: 日期（string）
content: 内容（string）
imgUrl: 缩略图（string）第22-1学时新增
}
 */
export function EdidInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data
  });
}
/**
 * 删除{
id: 信息ID（array）
}
 */
export function DeleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data
  });
}

/**
 * 一级分类添加{
categoryName：分类名称
}
 */
export function AddFristCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}
/**
 * 子级分类添加{
categoryName：分类名称*
parentId：父级ID*
}
 */
export function AddChildrenCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data
  });
}
/**
 * 获取分类
 */
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data
  });
}

/**
 * 获取全部分类（包含子级）
 */
export function GetCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data
  });
}
/**
 * 修改分类{
id：分类ID*
categoryName：分类名称*
}
 */
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data
  });
}
/**
 * 删除分类{
categoryId：分类ID*
}
 */
export function DeleteCategory(params) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data: { categoryId: params }
  });
}
