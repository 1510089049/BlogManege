<template>
  <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('page-change', page);
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
