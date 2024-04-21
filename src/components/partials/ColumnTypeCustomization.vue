<template>
  <template v-if="currentColumnToEdit">
    <div v-if="currentColumnToEdit.columnType === ColumnType.Text">
      <TextColumnSettings />
    </div>
    <div v-if="currentColumnToEdit.columnType === ColumnType.Number">
      <NumberColumnSettings />
    </div>
  </template>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';

  import NumberColumnSettings from '@/components/ColumnTypeSettings/NumberColumnSettings.vue';
  import TextColumnSettings from '@/components/ColumnTypeSettings/TextColumnSettings.vue';
  import { ColumnType } from '@/models/core';
  import { useColumnEditStore } from '@/stores/columnEditStore';

  const columnEditStore = useColumnEditStore();
  const { currentColumnToEdit } = storeToRefs(columnEditStore);
</script>