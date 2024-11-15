<template>
  <div>
    <el-dialog top="5%">
      <el-form label-width="120px">
        <el-form-item label="轮播图名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="轮播图列表">
          <div class="item-box">
            <div class="item-column">
              <span class="item-name">序号：</span>
              <el-input-number :step="1" :precision="0" :min="1" :max="5"></el-input-number>
            </div>
            <div class="item-column">
              <span class="item-name">标题：</span>
              <el-input placeholder="请输入" maxlength="50"></el-input>
            </div>
            <div class="item-column">
              <span class="item-name">图片：</span>
              <ImgUpload />
            </div>
            <div class="item-column">
              <span class="item-name">音乐：</span>
              <el-select placeholder="请选择" filterable></el-select>
            </div>
          </div>
        </el-form-item>
        <div class="footer-box">
          <el-button>关闭</el-button>
          <el-button>确认</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
  </template>

  <script>
  export default {
    props: {
      musicList: [

      ]
    }
  }
  </script>
  
  <style scoped lang="scss">
  .item-box {
    margin-bottom: 20px;
  }
  
  .item-column {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  
    .item-name {
      margin-right: 10px;
    }
  }
  
  .footer-box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  