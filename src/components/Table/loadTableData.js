import {
  reactive
} from "@vue/composition-api";
import {
  requestUrl
} from "api/requestUrl";
import {
  LoadTableData
} from "api/commonApi";
/** table逻辑组件 */
export function loadTableDataFunc() {
  const tableData = reactive({
    item: [],
    total: 0
  })
  const loadTableData = params => {
    let requestData = {
      url: requestUrl[params.url],
      data: params.data
    }
    // 获取表数据
    LoadTableData(requestData).then(res => {
      let resData = res.data.data.data;
      tableData.item = resData;
      tableData.total = resData.length === 0 ? 0 : res.data.data.total
    });
  }
  return {
    tableData,
    loadTableData
  }
}




// 说明：table逻辑组件