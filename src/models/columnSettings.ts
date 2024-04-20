import type { DictionaryItem } from '@/models/core';
import { getTextColumnTypeSelectionByValue } from '@/utils/ColumnUtils';

export enum TextColumnType {
  ShortText = 'SHORT_TEXT',
  LongText = 'LONG_TEXT',
}

export interface TextColumnTypeSelection extends DictionaryItem<TextColumnType>  {
  name: string
  value: TextColumnType
}
export class TextColumnSettings {
  textType: TextColumnType;
  hasMinLength: boolean;
  maxLength: number | null;
  hasMaxLength: boolean;
  minLength: number | null;

  constructor() {
    this.textType = getTextColumnTypeSelectionByValue(TextColumnType.ShortText).value;
    this.maxLength = 45;
    this.minLength = 0;
    this.hasMinLength = false;
    this.hasMaxLength = false;
  }
}