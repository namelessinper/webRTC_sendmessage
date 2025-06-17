<template>
    <div>
        <n-tabs type="card" animated v-if="peerOptions?.connects.length" :value="tabValue" :on-update:value="tabClick">

            <n-tab-pane v-for="item in peerOptions?.connects" :name="item.userInfo?.id || ''"
                display-directive="show:lazy" :tab="item.userInfo?.username">
                <n-list>

                    <n-list-item v-for="receivedData in item.reciveData">
                        <template #prefix>
                            <n-tag :type="receivedData.data.status as any">{{ receivedData.data.status }}</n-tag>
                        </template>
                        <n-thing :title="receivedData.userInfo.username" :title-extra="receivedData.data.time">
                            <template v-if="receivedData.data.type === 'data'" #description>
                                <p :class="receivedData.userInfo.id === tabValue ? '' : 'text-right'"
                                    class="pr-40 text-3xl">{{
                                        receivedData.data.data }}
                                </p>
                            </template>
                        </n-thing>
                    </n-list-item>

                </n-list>
                <n-input v-model:value="sendMessage" type="textarea" placeholder="回复消息">
                    <template #suffix>
                        <n-button quaternary type="primary" circle @click="handleSend">
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

const handleSend = () => {
    console.log('handleSend')
    if (!sendMessage.value) return
    if (peerOptions?.actions?.sendData !== null) peerOptions?.actions?.sendData(tabValue.value, sendMessage.value)

    sendMessage.value = ''
}
</script>