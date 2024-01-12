<template>
  <div class="main-container">
    <Menu />
    <div class="body-container">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu from '@/components/Menu.vue';

export default defineComponent({
  name: 'TemplateDefault',
  components: {
    Menu,
  },
});
</script>

<style lang="scss">
.main-container {
  display: flex;
}

.body-container {
  width: 100%;
  background: #ececec;
  overflow: hidden;
}
</style>
