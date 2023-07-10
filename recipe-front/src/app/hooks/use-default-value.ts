import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { RecipeType } from '@/app/rtk/api/server';

export const useDefaultValue = (
  formMethods: UseFormReturn,
  data: RecipeType | undefined
) => {
  const { reset } = formMethods;

  useEffect(() => {
    reset(data);
  }, [data, reset]);
};
