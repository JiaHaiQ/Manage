import { reactive } from '@vue/composition-api';
/** 分页 */
export function paginationHook() {
    const pageData = reactive({
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pageSizes: [10, 15, 30, 50]
    });
    // 统计数据
    const totalCount = (val) => pageData.total = val; // 总条数
    const handleSizeChange = (val) => pageData.pageSize = val// 页条数
    const handleCurrentChange = (val) => pageData.currentPage = val // 页码
    return {
        pageData,
        handleSizeChange,
        handleCurrentChange,
        totalCount
    }
}