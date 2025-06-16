<script setup lang="ts">
import { NLayout, NLayoutContent, NConfigProvider, NMessageProvider } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import WebRTCProvider from '@/components/WebRTCProvider.vue'

</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <WebRTCProvider>
          <n-layout >
            <n-layout-content content-style="padding: 24px;">
              <RouterView />
            </n-layout-content>
          </n-layout>
      </WebRTCProvider>
    </n-message-provider>
  </n-config-provider>

</template>
<style scoped>
.n-layout-header,
.n-layout-footer {
  background: rgba(128, 128, 128, 0.5);
  padding: 24px;
}

.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
  background: rgba(128, 128, 128, 0.4);
}
</style>
