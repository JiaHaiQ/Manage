<template>
  <el-form
    ref="form"
    :model="form"
    label-width="120px"
    v-loading="allData.formLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, .5)"
  >
    <el-form-item label="信息分类：">
      <el-select v-model="form.categoryId" style="width: 270px;">
        <el-option
          v-for="item in allData.category"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="发布日期：">
      <el-date-picker
        type="date"
        placeholder="请选择日期"
        style="width: 270px;"
        v-model="form.createDate"
        disabled
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="缩列图片：">
      <UploadImg :imgUrl.sync="form.imgUrl" :config="uploadImgConfig" />
    </el-form-item>

    <el-form-item label="新闻标题：">
      <el-input v-model="form.title" clearable></el-input>
    </el-form-item>

    <el-form-item label="详情内容：">
      <quillEditor
        v-model="form.content"
        ref="myQuillEditor"
        :options="allData.editorOption"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        icon="el-icon-circle-check"
        :loading="allData.submitLoading"
        @click="submitEdit"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
import { EdidInfo, GetList } from "api/info";
import { timestampToTime, filterNullVal } from "utils/commonUtils";
import UploadImg from "@c/UploadImg";
//富文本
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  name: "detailed",
  components: { quillEditor, UploadImg },
  setup(props, { root }) {
    //data
    // 图片上传配置
    const {
      VUE_APP_UPLOADIMG_URL,
      VUE_APP_QINIU_AK,
      VUE_APP_QINIU_SK,
      VUE_APP_QINIU_BUCKETY
    } = process.env;
    const uploadImgConfig = reactive({
      action: VUE_APP_UPLOADIMG_URL,
      accesskey: VUE_APP_QINIU_AK,
      secretkey: VUE_APP_QINIU_SK,
      buckety: VUE_APP_QINIU_BUCKETY
    });
    const allData = reactive({
      id: root.$route.params.id || root.$store.getters["infoDetailed/infoId"],
      title:
        root.$route.params.title ||
        root.$store.getters["infoDetailed/infoTitle"],
      category: [],
      editorOption: {},
      formLoading: true,
      submitLoading: false
    });
    // form data
    const form = reactive({
      categoryId: "",
      title: "",
      createDate: "",
      content: "",
      imgUrl: ""
    });
    // methods
    /** 获取id详情 */
    const getInfo = () => {
      let request = {
        id: allData.id,
        pageNumber: 1,
        pageSize: 10
      };
      GetList(request)
        .then(res => {
          allData.formLoading = false;
          let resData = res.data.data.data[0];
          form.categoryId = resData.categoryId;
          form.title = resData.title;
          form.createDate = timestampToTime(resData.createDate);
          form.content = resData.content;
          form.imgUrl = resData.imgUrl;
        })
        .catch(error => {
          allData.formLoading = false;
        });
    };
    /** 提交修改 */
    const submitEdit = () => {
      form.id = allData.id;
      if (!form.title) {
        root.$message.error("请输入标题！");
        return false;
      }
      if (!form.content) {
        root.$message.error("请输入内容！");
        return false;
      }
      allData.submitLoading = true;
      EdidInfo(filterNullVal(form))
        .then(res => {
          root.$message.success(res.data.message);
          allData.submitLoading = false;
        })
        .catch(error => {
          allData.submitLoading = false;
        });
    };

    // onMounted
    onMounted(() => {
      // 获取分类
      root.$store.dispatch("common/getInfoCategory").then(res => {
        allData.category = res;
      });
      getInfo();
    });
    return {
      // reactive
      uploadImgConfig,
      allData,
      form,
      // methods
      submitEdit
    };
  }
};
</script>
<style lang="scss" scoped></style>
