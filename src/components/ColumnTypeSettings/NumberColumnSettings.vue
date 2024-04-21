<template>
  <div
    v-if="currentColumnToEdit"
    class="flex flex-col gap-4 mt-4 pl-4">
    <div class="columnSettingsRow">
      <div>
        {{ $t('number-type') }}
      </div>
      <div class="flex flex-row">
        <SelectButton
          v-model="currentColumnToEdit.columnTypeSettings_Number.numberType"
          :options="selectableNumberTypeOption"
          :allowEmpty="false"
          optionLabel="name"
          optionValue="value"/>
      </div>
    </div>

    <div
      v-if="isFloatColumnType"
      class="columnSettingsRow">
      <div class="flex flex-row gap-2">
        <div>
          {{ $t('min-fraction-digits') }}
        </div>
        <InputSwitch v-model="currentColumnToEdit.columnTypeSettings_Number.hasMinFloatFractions" />
      </div>
      <div class="flex flex-row">
        <InputNumber
          class="text-right"
          min="0"
          max="14"
          v-model="currentColumnToEdit.columnTypeSettings_Number.minFloatFractions" />
      </div>
    </div>

    <div
      v-if="isFloatColumnType"
      class="columnSettingsRow">
      <div class="flex flex-row gap-2">
        <div>
          {{ $t('max-fraction-digits') }}
        </div>
        <InputSwitch v-model="currentColumnToEdit.columnTypeSettings_Number.hasMaxFloatFractions" />
      </div>
      <div class="flex flex-row">
        <InputNumber
          class="text-right"
          :min="currentColumnToEdit.columnTypeSettings_Number.minFloatFractions"
          max="14"
          v-model="currentColumnToEdit.columnTypeSettings_Number.maxFloatFractions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import InputNumber from 'primevue/inputnumber';
  import InputSwitch from 'primevue/inputswitch';
  import SelectButton from 'primevue/selectbutton';
  import { computed, watch } from 'vue';

  import {
    NumberColumnSettings,
    NumberColumnType,
    type NumberColumnTypeSelection
  } from '@/models/columnSettings';
  import { useColumnEditStore } from '@/stores/columnEditStore';
  import { getSelectableNumberColumnTypes } from '@/utils/ColumnUtils';


  const columnEditStore = useColumnEditStore();
  const { currentColumnToEdit } = storeToRefs(columnEditStore);

  const selectableNumberTypeOption = computed((): NumberColumnTypeSelection[] => {
    return getSelectableNumberColumnTypes();
  });

  const columnSettings = computed((): NumberColumnSettings => {
    if (!currentColumnToEdit.value) return new NumberColumnSettings();

    return currentColumnToEdit.value.columnTypeSettings_Number;
  });

  const isFloatColumnType = computed((): boolean => {
    return columnSettings.value.numberType === NumberColumnType.Float;
  });

  const adjustMaxFractionDigits = (): void => {
    if (columnSettings.value.maxFloatFractions < columnSettings.value.minFloatFractions) {
      columnSettings.value.maxFloatFractions = columnSettings.value.minFloatFractions;
    }
  };

  watch(columnSettings, () => {
    adjustMaxFractionDigits();
  }, { deep: true });
</script>