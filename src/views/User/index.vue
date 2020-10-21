<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div class="label-wrap">
          <label>关键字：</label>
          <div class="warp-content">
            <el-row :gutter="16">
              <el-col :span="3"
                ><SelectVue
                  :config="data.configOption"
                  :selectData.sync="data.selectData"
              /></el-col>
              <el-col :span="8"
                ><el-input placeholder="请输入关键字"></el-input
              ></el-col>
              <el-col :span="9"
                ><el-button type="primary" icon="el-icon-search" size="small"
                  >搜索</el-button
                ></el-col
              >
            </el-row>
          </div>
        </div>
      </el-col>

      <el-col :span="4"
        ><el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="data.dialogAdd = true"
          >添加用户</el-button
        ></el-col
      >
    </el-row>
    <div class="black-space-30"></div>
    <!-- table组件 -->
    <TableVue ref="userTable" :config="data.configTable" :tableRow.sync="data.tableRow">
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.status"
          active-value="2"
          inactive-value="1"
          antive-color="#13c66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="deleteItem(slotData.data)"
          >编辑</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="deleteItem(slotData.data)"
          >删除</el-button
        >
      </template>
      <template v-slot:tableFooterLeft>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="deleteAll"
          >批量删除</el-button
        >
      </template>
    </TableVue>
    <!-- 新增 -->
    <DialogAdd :flag.sync="data.dialogAdd" />
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import { UserDel } from "api/user";
import { global } from "utils/global";
import SelectVue from "@c/Select";
import TableVue from "@c/Table";
import DialogAdd from "./dialog/add";
export default {
  name: "userIndex",
  components: { SelectVue, TableVue, DialogAdd },
  setup(props, { root, refs }) {
    const { confirm } = global(); //MessageBox提示
    const data = reactive({
      // 新增
      dialogAdd: false,
      // 下接菜单的数据
      configOption: {
        init: ["truename", "phone"]
      },
      selectData: {},
      // table选择的数据
      tableRow: {},
      //table配置
      configTable: {
        tableLoading: true,
        // height: 500,
        // 多选
        // selection: false,
        //表头
        tHead: [
          { label: "邮箱", rowKey: "username", width: 200 },
          { label: "姓名", rowKey: "truename", width: 120 },
          { label: "号码", rowKey: "phone", width: 150 },
          { label: "地区", rowKey: "region", width: 280 },
          { label: "角色", rowKey: "role" },
          {
            label: "禁启用",
            rowKey: "status",
            width: 80,
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "operation"
          }
        ],
        requestData: {
          url: "getUserList",
          data: {
            pageNumber: 1,
            pageSize: 10
          }
        }
      }
    });
    // methods
    // 删除单条
    const deleteItem = params => {
      data.tableRow.idItem = [params.id];
      confirm({
        content: "确认删除当前用户信息，确认后将无法恢复！",
        tip: "警告",
        fn: deleteUser
      });
    };
    // 批量删除
    const deleteAll = () => {
      let userId = data.tableRow.idItem;
      if (!userId || userId.length === 0) {
        root.$message.error("请勾选需要删除的用户！");
        return false;
      }
      confirm({
        content: "确认删除当前所选用户信息，确认后将无法恢复！",
        tip: "警告",
        fn: deleteUser
      });
    };
    /** 删除用户 */
    const deleteUser = () => {
      UserDel({ id: data.tableRow.idItem }).then(res => {
        root.$message.success(res.data.message);
        refs.userTable.refreshData()
      });
    };
    return {
      data,
      deleteItem,
      deleteAll,
      deleteUser
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.label-wrap {
  @include labelDom(right, 60, 40);
}
</style>
