<template>
  <div v-if="currentColumnInfoOfFieldToEdit">
    <InputNumber
      v-if="isInteger"
      v-model="newFieldValue" />

    <InputNumber
      v-if="isFloat"
      v-model="newFieldValue"
      :min-fraction-digits="minFractionDigits"
      :max-fraction-digits="maxFractionDigits" />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import InputNumber from 'primevue/inputnumber';
  import { computed } from 'vue';

  import { NumberColumnSettings, NumberColumnType } from '@/models/columnSettings';
  import { useCellEditStore } from '@/stores/cellEditStore';



  const cellEditStore = useCellEditStore();
  const { newFieldValue, currentColumnInfoOfFieldToEdit, isNewFieldValueValid } = storeToRefs(cellEditStore);

  const columnNumberSettings = computed((): NumberColumnSettings => {
    if (!currentColumnInfoOfFieldToEdit.value) return new NumberColumnSettings();

    return currentColumnInfoOfFieldToEdit.value.columnTypeSettings_Number;
  });

  const isInteger = computed((): boolean => {
    return columnNumberSettings.value.numberType === NumberColumnType.Integer;
  });

  const isFloat = computed((): boolean => {

    return columnNumberSettings.value.numberType === NumberColumnType.Float;
  });

  const minFractionDigits = computed((): number => {
    if (columnNumberSettings.value.hasMinFloatFractions) {
      return columnNumberSettings.value.minFloatFractions;
    } else {
      return 0;
    }
  });

  const maxFractionDigits = computed((): number => {
    if (columnNumberSettings.value.hasMaxFloatFractions) {
      return columnNumberSettings.value.maxFloatFractions;
    } else {
      return 20;
    }
  });
</script>