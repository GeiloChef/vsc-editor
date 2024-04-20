<template>
  <div>
    <slot/>
    <div
      class="text-red-500 italic text-sm mt-1 ml-1"
      v-show="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type PropType, ref, toRefs, watch } from 'vue';

  import { max, min, required, ValidationRules, ValidationRulesOptions } from '@/validation/validationRules';

  const props = defineProps({
    fieldName: {
      type: String,
      required: true
    },
    fieldRules: {
      type: Array as PropType<Array<ValidationRules>>,
      required: true
    },
    fieldRulesOptions: {
      type: Object as PropType<ValidationRulesOptions>,
      required: false,
      default: new ValidationRulesOptions()
    },
    fieldValue: {
      required: true
    }
  });

  const { fieldRules, fieldRulesOptions } = toRefs(props);

  const isFieldValueValid = ref(true);
  const errorMessage = ref();

  defineExpose({
    isFieldValueValid
  });

  watch(props, (newProps) => {
    if (fieldRules.value.length) {
      let validation: string | boolean = true;

      fieldRules.value.forEach((validationRule: ValidationRules) => {

        if (validation !== true) return;

        switch (validationRule) {
          case ValidationRules.Required:
            validation = required(props.fieldValue);
            break;
          case ValidationRules.Min:
            validation = min(props.fieldValue, fieldRulesOptions.value.minCharacters);
            break;
          case ValidationRules.Max:
            validation = max(props.fieldValue, fieldRulesOptions.value.maxCharacters);
            break;
          default:
            break;
        }

        if (validation === true) {
          isFieldValueValid.value = true;
          errorMessage.value = '';
        } else if (typeof validation === 'string') {
          isFieldValueValid.value = false;
          errorMessage.value = validation;
        }
      });
    }
  }, { immediate: true });
</script>