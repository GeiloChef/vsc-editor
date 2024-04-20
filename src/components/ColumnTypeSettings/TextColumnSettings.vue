<template>
  <div
    v-if="currentColumnToEdit"
    class="flex flex-col gap-4 mt-4 pl-4">
    <div class="columnSettingsRow">
      <div>
        {{ $t('text-type') }}
      </div>
      <div class="flex flex-row">
        <SelectButton
          v-model="currentColumnToEdit.columnTypeSettings_Text.textType"
          :options="selectableTextTypeOption"
          :allowEmpty="false"
          optionLabel="name"
          optionValue="value"/>
      </div>
    </div>

    <div class="columnSettingsRow">
      <div class="flex flex-row gap-2">
        <div>
          {{ $t('min-characters') }}
        </div>
        <InputSwitch v-model="currentColumnToEdit.columnTypeSettings_Text.hasMinLength" />
      </div>
      <div class="flex flex-row">
        <InputText
          class="text-right"
          v-model="currentColumnToEdit.columnTypeSettings_Text.minLength" />
      </div>
    </div>

    <div class="columnSettingsRow">
      <div class="flex flex-row gap-2">
        <div>
          {{ $t('max-characters') }}
        </div>
        <InputSwitch v-model="currentColumnToEdit.columnTypeSettings_Text.hasMaxLength" />
      </div>
      <div class="flex flex-row">
        <InputText
          class="text-right"
          v-model="currentColumnToEdit.columnTypeSettings_Text.maxLength" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import InputSwitch from 'primevue/inputswitch';
  import InputText from 'primevue/inputtext';
  import SelectButton from 'primevue/selectbutton';
  import { computed } from 'vue';

  import type { TextColumnTypeSelection } from '@/models/columnSettings';
  import { useColumnEditStore } from '@/stores/columnEditStore';
  import { getSelectableTextColumnTypes } from '@/utils/ColumnUtils';


  const columnEditStore = useColumnEditStore();
  const { currentColumnToEdit } = storeToRefs(columnEditStore);

  const selectableTextTypeOption = computed((): TextColumnTypeSelection[] => {
    return getSelectableTextColumnTypes();
  });
</script>

<style lang="css">
.columnSettingsRow {
  @apply flex flex-col gap-2
}
</style>