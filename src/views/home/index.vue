<template>
  <div class="home-box">
    <Menu />
    <div class="content-box">
      <NavigationBar />
      <div class="router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
};
</script>

<style scoped lang="scss">
.home-box {
  // Styles for the root container
}

.content-box {
  // Styles for the content area
}

.router-view {
  // Styles for the router-view area
}
</style>