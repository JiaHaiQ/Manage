<template>
  <el-dialog
    title="新增"
    :visible.sync="dialog_add_flag"
    @close="close"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域" clearable>
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" clearable></el-input>
      </el-form-item>

      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" clearable></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button
        type="danger"
        icon="el-icon-circle-close"
        @click="close"
        >取 消</el-button
      >
      <el-button
        type="success"
        icon="el-icon-circle-check"
        @click="close"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { reactive, ref, watchEffect } from "@vue/composition-api";
export default {
  name: "dialogAdd",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { root, emit }) {
    // data
    const dialog_add_flag = ref(false);
    const formLabelWidth = ref("70px");
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });
    // watch
    watchEffect(() => (dialog_add_flag.value = props.flag));
    // methods
    const close = () => {
      dialog_add_flag.value = false;
      emit("update:flag", false);
    };
    return {
      // ref
      dialog_add_flag,
      formLabelWidth,
      // reactive
      form,
      // methods
      close
    };
  }
};
</script>
<style lang="scss" scoped>
</style>
