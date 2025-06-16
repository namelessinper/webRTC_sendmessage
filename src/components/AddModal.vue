<template>
    <n-modal v-model:show="showModal" title="发起链接" preset="dialog" draggable :style="{ width: '800px' }">
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large">
            <n-form-item label="目标id" path="targetPeerId">
                <n-input v-model:value="formValue.targetPeerId" placeholder="输入目标id" />
            </n-form-item>
        </n-form>

        <template #action>
            <n-button :loading="submiLoading" @click="submit">确定</n-button>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { defineModel, useTemplateRef, reactive, ref, watch } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, useMessage, type FormRules } from 'naive-ui'
const message = useMessage()


const formRef = useTemplateRef('formRef')
const rules: FormRules = {
    targetPeerId: [{
        required: true,
        message: '请输入目标id',
        trigger: 'blur'
    }]
}
const showModal = defineModel<boolean>('show')

const formValue = reactive({
    targetPeerId: ''
})

const emit = defineEmits<{
    (e: 'submit', value: string): void
}>()

const submiLoading = ref(false)
const submit = async () => {
    formRef.value?.validate((errors) => {
        if (!errors) {
            submiLoading.value = true
            emit('submit', formValue.targetPeerId)
        }
        else {
            message.error('请输入目标id')
        }
    })
}

watch(showModal, (val) => {
    if (!val) {
        formValue.targetPeerId = ''
        submiLoading.value = false
    }
})
</script>