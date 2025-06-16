<script setup lang="ts">
import { inject, ref } from 'vue'
import type { peerProviderOptions } from '@/hooks/peerTypes'
import { NDescriptions, NDescriptionsItem, NButton, NIcon } from 'naive-ui'
import { Add } from '@vicons/ionicons5'
import AddModal from '@/components/AddModal.vue'
import LinksPanls from '@/components/LinksPanls.vue'
const peerOptions = inject<peerProviderOptions>('peerOptions')


const showAddModal = ref(false)
const add = () => {
  showAddModal.value = true
}

const addAction = async (id: string) => {
  await peerOptions?.connectionActions?.connect(id)
  showAddModal.value = false
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
        <div class="flex justify-between items-center">
          <span>链接</span>
          <n-button quaternary type="primary" @click="add">
            <template #icon>
              <NIcon>
                <Add />
              </NIcon>
            </template>
            发起链接
          </n-button>
        </div>
      </template>
      <LinksPanls />
    </n-descriptions-item>
  </n-descriptions>
  <AddModal v-model:show="showAddModal" @submit="addAction" />
</template>
