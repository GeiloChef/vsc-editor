import type { DictionaryItem } from '@/models/core';
import { getNumberColumnTypeSelectionByValue, getTextColumnTypeSelectionByValue } from '@/utils/ColumnUtils';

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

export enum NumberColumnType {
  Integer = 'INTEGER',
  Float = 'FLOAT',
}

export interface NumberColumnTypeSelection extends DictionaryItem<NumberColumnType>  {
  name: string
  value: NumberColumnType
}

export class NumberColumnSettings {
  numberType: NumberColumnType;
  minFloatFractions: number;
  maxFloatFractions: number;
  hasMinFloatFractions: boolean;
  hasMaxFloatFractions: boolean;

  constructor() {
    this.numberType = getNumberColumnTypeSelectionByValue(NumberColumnType.Float).value;
    this.minFloatFractions = 0;
    this.maxFloatFractions = 0;
    this.hasMinFloatFractions = false;
    this.hasMaxFloatFractions = false;
  }
}
