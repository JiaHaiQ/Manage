<template>
  <div id="category">
    <el-button type="success" icon="el-icon-circle-plus-outline" size="small"
      >添加一级分类</el-button
    >
    <hr class="dividingLine" />
    <div class="black-space-30"></div>
    <div>
      <el-row :gutter="30">
        <!-- 左边start -->
        <el-col :span="8">
          <div class="category-warp">
            <div class="category">
              <!--一级分类-->
              <h4>
                <svg-icon icon-class="plus" />
                新闻
                <div class="button-group">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    round
                    >编辑</el-button
                  >
                  <el-button
                    type="success"
                    size="mini"
                    icon="el-icon-plus"
                    round
                    >添加子集</el-button
                  >
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    round
                    >删除</el-button
                  >
                </div>
              </h4>
              <!--子级分类-->
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-edit"
                      round
                      >编辑</el-button
                    >

                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      round
                      >删除</el-button
                    >
                  </div>
                </li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
                <li>国内</li>
              </ul>
            </div>
          </div>
        </el-col>
        <!-- 右边start -->
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form label-width="142px" class="from-wrap">
            <el-form-item label="一级分类名称：">
              <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称：">
              <el-input v-model="form.secCategoryName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-circle-check" size="small"
                >确定</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "infoCategory",
  setup() {
    const form = reactive({
      categoryName: "一级",
      secCategoryName: "二级"
    });
    return {
      // reactive
      form
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/config.scss";
// 分割线
.dividingLine {
  width: calc(100% + 60px);
  margin-left: -30px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
}
// 左边
.category-warp {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    svg {
      position: absolute;
      left: 14px;
      top: 14px;
      background-color: #fff;
      font-size: 17px;
    }
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    &:hover {
      @include webkit(transition, all 0.5s ease 0s);
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
// 左边子按钮
.button-group {
  display: none;
  position: absolute;
  z-index: 2;
  right: 11px;
  top: -1px;
  button {
    font-size: 12px;
  }
}
// 右边
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.from-wrap {
  width: 410px;
  padding-top: 26px;
}
</style>
