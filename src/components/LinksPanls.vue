<template>
    <div>
        <n-tabs type="card" animated v-if="peerOptions?.connects.length" :value="tabValue" :on-update:value="tabClick">

            <n-tab-pane v-for="item in peerOptions?.connects" :name="item.userInfo?.id || ''"
                display-directive="show:lazy" :tab="item.userInfo?.username">
                <n-list>

                    <n-list-item v-for="receivedData in item.reciveData">
                        <template #prefix>
                            <n-tag :type="receivedData.data.status as any ">{{ receivedData.data.status }}</n-tag>
                        </template>
                        <n-thing :title="receivedData.data.type" :title-extra="receivedData.data.time"
                            :description="receivedData.data.data">

                        </n-thing>
                    </n-list-item>

                </n-list>
                <n-input v-model:value="sendMessage" type="textarea" placeholder="基本的 Textarea">
                    <template #suffix>
                        <n-button quaternary type="primary" circle>
                            <template #icon>
                                <n-icon class="cursor-pointer" :component="NavigateOutline" />

                            </template>
                        </n-button>
                    </template></n-input>
            </n-tab-pane>
        </n-tabs>
        <n-empty v-else description="暂无链接" />
    </div>


</template>


<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import { NTabs, NTabPane, NList, NListItem, NEmpty, NTag, NThing, NInput, NIcon, NButton } from 'naive-ui'
import type { peerProviderOptions } from '@/hooks/peerTypes'
import { NavigateOutline } from '@vicons/ionicons5'

const peerOptions = inject<peerProviderOptions>('peerOptions')


const tabValue = ref<string>('')
const sendMessage = ref<string>('')
const tabClick = (val: string) => {
    tabValue.value = val
}

watchEffect(() => {
    if (tabValue.value === '') tabValue.value = peerOptions?.connects[0]?.userInfo?.id || ''
})
</script>