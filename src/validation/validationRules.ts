import { i18n } from '@/i18n/config';

export type ValidationMethod = (value: any) => boolean | string;

export interface ValidationRulesOptionCreation {
  minCharacters?: number | null | undefined;
  maxCharacters?: number | null | undefined;
}

export const required = (value: any): boolean | string => {
  if (!value || !value.length) {
    return i18n.global.t('validation-error-message.required');
  }

  return true;
};

export class ValidationRulesOptions {
  minCharacters: number = 0;
  maxCharacters: number = 0;

  constructor(optionCreationObject?: ValidationRulesOptionCreation) {
    if (optionCreationObject) {
      this.minCharacters = optionCreationObject.minCharacters ?? 0;
      this.maxCharacters = optionCreationObject.maxCharacters ?? 0;
    }
  }
}

export const minCharacters = (value: any, minCharacter: number): boolean | string => {
  if (minCharacter <= 0) {
    return true;
  }

  if (!value || !value.length || value.length < minCharacter) {
    return i18n.global.t('validation-error-message.min-characters', { min: minCharacter });
  }

  return true;
};

export const maxCharacters = (value: any, maxCharacter: number): boolean | string => {
  if (maxCharacter <= 0) {
    return true;
  }

  if (value && value.length && value.length > maxCharacter) {
    return i18n.global.t('validation-error-message.max-characters', { max: maxCharacter });
  }

  return true;
};


export enum ValidationRules {
  Required = 'Required',
  Min = 'MinimumCharacter',
  Max = 'MaximumCharacter'
}