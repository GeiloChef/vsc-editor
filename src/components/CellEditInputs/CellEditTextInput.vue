<template>
  <ValidationWrapper
    ref="ValidationWrapper_Ref"
    :field-rules="validationRules"
    :field-rules-options="validationRuleOptions"
    field-name="newFieldValue"
    :field-value="newFieldValue">
    <InputText
      v-if="isShortTextType"
      :invalid="!isNewFieldValueValid"
      v-model="newFieldValue" />
    <Textarea
      v-if="isLongTextType"
      :invalid="!isNewFieldValueValid"
      v-model="newFieldValue"
      rows="5"
      cols="30" />
  </ValidationWrapper>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import { computed, nextTick, type Ref, ref, watch } from 'vue';

  import ValidationWrapper from '@/components/elements/ValidationWrapper.vue';
  import { TextColumnSettings, TextColumnType } from '@/models/columnSettings';
  import { useCellEditStore } from '@/stores/cellEditStore';
  import {
    ValidationRules,
    type ValidationRulesOptionCreation,
    ValidationRulesOptions
  } from '@/validation/validationRules';

  const cellEditStore = useCellEditStore();
  const { newFieldValue, currentColumnInfoOfFieldToEdit, isNewFieldValueValid } = storeToRefs(cellEditStore);

  const ValidationWrapper_Ref: Ref<typeof ValidationWrapper | null> = ref(null);

  const columnSettings = computed((): TextColumnSettings => {
    if (currentColumnInfoOfFieldToEdit.value) {
      return currentColumnInfoOfFieldToEdit.value.columnTypeSettings_Text;
    } else {
      return new TextColumnSettings();
    }
  });

  const isLongTextType = computed((): boolean => {
    return columnSettings.value.textType === TextColumnType.LongText;
  });

  const isShortTextType = computed((): boolean => {
    return columnSettings.value.textType === TextColumnType.ShortText;
  });

  const validationRules = computed((): ValidationRules[] => {
    const rules: ValidationRules[] = [];

    if (columnSettings.value.hasMinLength) {
      rules.push(ValidationRules.Min);
    }

    if (columnSettings.value.hasMaxLength) {
      rules.push(ValidationRules.Max);
    }

    return rules;
  });

  const validationRuleOptions = computed((): ValidationRulesOptions => {
    if (!currentColumnInfoOfFieldToEdit.value) return new ValidationRulesOptions();

    const validationRulesOptionSettings: ValidationRulesOptionCreation = {
      minCharacters: columnSettings.value.minLength,
      maxCharacters: columnSettings.value.maxLength
    };

    return new ValidationRulesOptions(validationRulesOptionSettings);
  });

  watch(newFieldValue, (newValue) => {
    nextTick(() => {
      if (ValidationWrapper_Ref.value) {
        isNewFieldValueValid.value = ValidationWrapper_Ref.value.isFieldValueValid;
      }
    });
  }, { deep: true, immediate: true });
</script>