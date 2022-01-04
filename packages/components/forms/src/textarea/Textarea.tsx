import React, { useEffect } from 'react';
import { cx } from 'emotion';

import { BaseInput } from '../BaseInput';
import type { BaseInputProps } from '../BaseInput';
import { useFormControl } from '../FormControl/FormControlContext';
import { getStyles } from './Textarea.styles';
import { ExpandProps } from '@contentful/f36-core';

export type TextareaProps = Omit<
  BaseInputProps<'textarea'>,
  'as' | 'type' | 'size'
>;

const _Textarea = (
  {
    className,
    isDisabled,
    isInvalid,
    isRequired,
    isReadOnly,
    onChange,
    testId = 'cf-ui-textarea',
    id,
    resize = 'vertical',
    maxLength,
    ...otherProps
  }: ExpandProps<TextareaProps>,
  ref: React.Ref<HTMLTextAreaElement>,
) => {
  const styles = getStyles();

  const {
    setMaxLength,
    maxLength: contextMaxLength,
    setInputValue,
    inputValue: contextInputValue,
    ...formProps
  } = useFormControl({
    id,
    isInvalid,
    isDisabled,
    isRequired,
    isReadOnly,
  });

  useEffect(() => {
    if (maxLength !== undefined && typeof setMaxLength === 'function') {
      setMaxLength(maxLength);
    }
  }, [maxLength, setMaxLength]);

  const handleOnChange = (event) => {
    if (typeof setInputValue === 'function') {
      setInputValue(event.target.value);
    }
    onChange?.(event);
  };

  return (
    <BaseInput
      {...otherProps}
      {...formProps}
      testId={testId}
      as="textarea"
      ref={ref}
      className={cx(className, {
        [styles.disabled]: isDisabled,
        [styles.error]: isInvalid,
      })}
      maxLength={maxLength}
      resize={resize}
      onChange={maxLength ? handleOnChange : onChange}
    />
  );
};

/**
 * Textarea is a form component that allows the user to enter a sizeable amount of multi-line plain text.
 */
export const Textarea = React.forwardRef(_Textarea);
