<script setup lang="ts">
import { inject, ref } from 'vue'
import type { peerProviderOptions } from '@/hooks/peerTypes'
import { NDescriptions, NDescriptionsItem, NTabs, NTabPane } from 'naive-ui'

const peerOptions: peerProviderOptions | undefined = inject('peerOptions')
const test = () => {
  console.log(peerOptions)
}



</script>

<template>

  <n-descriptions label-placement="top" bordered :column="3">
    <n-descriptions-item label="用户名">
      {{ peerOptions?.userInfo?.username }}
    </n-descriptions-item>
    <n-descriptions-item label="id">
      {{ peerOptions?.userInfo?.id }}
    </n-descriptions-item>
    <n-descriptions-item label="状态">
      {{ peerOptions?.connectionState }}
    </n-descriptions-item>
    <n-descriptions-item>
      <template #label>
        <div class="flex items-center">
          <div class="w-[50px] h-[30px]">链接：</div>
          <n-tabs type="line" animated>
            <n-tab-pane name="oasis" tab="Oasis">
            </n-tab-pane>
            <n-tab-pane name="the beatles" tab="the Beatles">
            </n-tab-pane>
            <n-tab-pane name="jay chou" tab="周杰伦">
            </n-tab-pane>
          </n-tabs>

        </div>

      </template>
      {{ peerOptions?.connectionState }}
    </n-descriptions-item>
  </n-descriptions>

</template>
