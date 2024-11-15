<template>
  <div>
    <el-card class="box">
      <el-form label-width="110px">
        <el-form-item label="启动广告名称">
          <el-input placeholder="请输入" maxlength="50" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="启动广告图">
          <ImgUpload
              :line-height="'300px'"
              resource-type="image"
              :image-url="null"
              style="width: 300px; height: 300px;"
          ></ImgUpload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'ExampleComponent'
}
</script>

<style scoped lang="scss">
.box {
  // Component styles
}
</style>
