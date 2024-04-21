import { useI18n } from 'vue-i18n';

import { i18n } from '@/i18n/config';
import type { NumberColumnTypeSelection, TextColumnTypeSelection } from '@/models/columnSettings';
import { NumberColumnType, TextColumnType } from '@/models/columnSettings';
import { ColumnType, type ColumnTypeSelectionOption } from '@/models/core';

export const getSelectableColumnTypes = () : ColumnTypeSelectionOption[] => {
  const { t } = useI18n();

  return [
    {
      name: t('number'),
      value: ColumnType.Number
    },
    {
      name: t('text'),
      value: ColumnType.Text
    },
  ];
};

export const getSelectableTextColumnTypes = () : TextColumnTypeSelection[] => {
  const t= i18n.global.t;

  return [
    {
      name: t('short-text'),
      value: TextColumnType.ShortText
    },
    {
      name: t('long-text'),
      value: TextColumnType.LongText
    },
  ];
};

export const getTextColumnTypeSelectionByValue = (value: TextColumnType): TextColumnTypeSelection => {
  const textColumnTypes = getSelectableTextColumnTypes();

  return textColumnTypes.find((type) => type.value === value) ?? textColumnTypes[0];
};

export const getSelectableNumberColumnTypes = () : NumberColumnTypeSelection[] => {
  const t= i18n.global.t;

  return [
    {
      name: t('integer'),
      value: NumberColumnType.Integer
    },
    {
      name: t('float'),
      value: NumberColumnType.Float
    },
  ];
};

export const getNumberColumnTypeSelectionByValue = (value: NumberColumnType): NumberColumnTypeSelection => {
  const numberColumnTypes = getSelectableNumberColumnTypes();

  return numberColumnTypes.find((type) => type.value === value) ?? numberColumnTypes[0];
};


