<template>
    <n-tabs type="card" animated v-if="peerOptions?.connects.length" :value="tabValue" :on-update:value="tabClick">

        <n-tab-pane v-for="item in peerOptions?.connects" :name="item.userInfo?.id || ''" display-directive="show:lazy"
            :tab="item.userInfo?.username">
            <n-list>

                <n-list-item v-for="receivedData in item.reciveData">
                    {{ receivedData.data }}
                </n-list-item>

            </n-list>
        </n-tab-pane>
    </n-tabs>
    <n-empty v-else description="暂无链接" />

</template>


<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import { NTabs, NTabPane, NList, NListItem, NEmpty } from 'naive-ui'
import type { peerProviderOptions } from '@/hooks/peerTypes'

const peerOptions = inject<peerProviderOptions>('peerOptions')


const tabValue = ref<string>('')

const tabClick = (val: string) => {
    tabValue.value = val
}

watchEffect(() => {
    if (tabValue.value === '') tabValue.value = peerOptions?.connects[0]?.userInfo?.id || ''
})
</script>