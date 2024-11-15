<template>
  <div class="container-box">
    <el-button class="config" type="primary" plain>配置</el-button>
    <el-carousel class="banner-box" :interval="5000" type="card" trigger="click">
      <el-carousel-item>
        <el-image class="img" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>

</template>
  
  <script>

  </script>
  
  <style scoped lang="scss">
  .container-box {
    /* Styles for the container box */
  }

  .config {
    /* Styles for the config button */
  }

  .banner-box {
    /* Styles for the banner box */
  }

  .img {
    /* Styles for the carousel item image */
  }
  </style>
  