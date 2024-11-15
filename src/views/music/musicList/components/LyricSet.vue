<template>
  <el-dialog>
    <div class="content-box">
      <el-form size="small">
        <el-form-item label="歌词">
          <el-input maxlength="100000" type="textarea" rows="30" placeholder="请输入歌词" show-word-limit />
        </el-form-item>
      </el-form>
    </div>
    <div class="footer-box">
      <el-button>关闭</el-button>
      <el-button type="primary">确认</el-button>
    </div>
  </el-dialog>

  </template>
  
  <script>
  export default {

  };
  </script>
  
  <style lang="scss" scoped>
  /* Scoped styles for this component */
  .content-box {
    /* Your styles for content-box class here */
  }
  
  .footer-box {
    /* Your styles for footer-box class here */
  }
  </style>
  