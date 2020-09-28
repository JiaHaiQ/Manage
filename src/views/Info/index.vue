<template>
  <div>
    <!-- search start-->
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="warp-content">
            <el-select
              style="width: 100%;"
              size="small"
              v-model="category_value"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker
              style="width: 100%;"
              size="small"
              v-model="date_value"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              range-separator="至"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
              clearable
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap key-word">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-select
              style="width: 100%;"
              size="small"
              v-model="search_key"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in search_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-input
          style="width: 100%;"
          size="small"
          v-model="search_keyWord"
          placeholder="请输入内容"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button
          style="width: 100%;"
          size="small"
          type="primary"
          icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="2">
        <el-button
          class="pull-right"
          type="success"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="dialog_add = true"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <!-- table start -->
    <div class="black-space-30"></div>
    <el-table :data="table_data" border style="width: 100%">
      <el-table-column type="selection" width="45"> </el-table-column>
      <el-table-column prop="title" label="标题" width="530"> </el-table-column>
      <el-table-column prop="type" label="类型" width="130"> </el-table-column>
      <el-table-column prop="date" label="日期" width="220"> </el-table-column>
      <el-table-column prop="user" label="管理员" width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteItem"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="black-space-30"></div>
    <el-row>
      <el-col :span="12">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click="deleteAll"
          >批量删除</el-button
        >
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 新增 -->
    <DialogAdd :flag.sync="dialog_add" />
    <!-- end -->
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
import DialogAdd from "./dialog/add";
import { global } from "utils/global";
export default {
  name: "infoIndex",
  components: { DialogAdd },
  setup(props, { root }) {
    const { confirm } = global();
    /** data */
    // 搜索
    const category_value = ref("");
    const options = reactive([
      { value: "1", label: "国际信息" },
      { value: "2", label: "国内信息" },
      { value: "3", label: "行业信息" }
    ]);
    const date_value = ref("");
    const search_options = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" }
    ]);
    const search_key = ref("ID");
    const search_keyWord = ref("");
    // 表格
    const table_data = reactive([
      {
        date: "2016-05-02",
        user: "王虎",
        title: "上海",
        type: "方法"
      },
      {
        date: "2016-05-04",
        user: "王小",
        title: "上海市",
        type: "发放"
      },
      {
        date: "2016-05-01",
        user: "小虎",
        title: "上海市普陀",
        type: "更改"
      },
      {
        date: "2016-05-03",
        user: "王小虎",
        title: "上海市普陀区金沙",
        type: "广告"
      }
    ]);
    // 分页
    const total = ref(12);
    //新增
    const dialog_add = ref(false);
    /** methods */
    const handleSizeChange = () => {};
    const handleCurrentChange = () => {};
    /** 删除 */
    const deleteItem = () => {
      confirm({
        content: "此操作将永久删除该文件, 是否继续?"
      });
    };
    /** 批量删除 */
    const deleteAll = () => {
      confirm({
        content: "确认删除选择的数据，确认后将无法恢复！",
        tip: "警告"
      });
    };
    return {
      //ref
      category_value,
      date_value,
      search_key,
      search_keyWord,
      total,
      dialog_add,
      //reactive
      options,
      search_options,
      table_data,
      //methods
      handleSizeChange,
      handleCurrentChange,
      deleteItem,
      deleteAll
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-word {
    @include labelDom(right, 99, 40);
  }
}
</style>
