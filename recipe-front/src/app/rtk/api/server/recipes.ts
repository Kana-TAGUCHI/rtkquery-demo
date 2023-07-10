import { serverApi } from '@/app/rtk/api/setting';

export type RecipeType = {
  id: number;
  title: string;
  description: string;
  picture: string | null;
  createdAt: string;
  updatedAt: string;
};

type CreateRecipeType = {
  title: string;
  description: string;
  picture: string | null;
};

type UpdateRecipeBodyType = {
  title?: string;
  description?: string;
  picture?: string | null;
};

export const recipesApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipeType[], void>({
      query: () => ({
        url: `/recipes`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                (data) => ({ type: 'Recipes', id: data.id } as const)
              ),
              { type: 'Recipes', id: 'LIST' },
            ]
          : [{ type: 'Recipes', id: 'LIST' }],
    }),
    getRecipe: builder.query<RecipeType, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
      }),
      providesTags: (result, _error, _arg) => [
        { type: 'Recipes', id: result?.id },
      ],
    }),
    createRecipe: builder.mutation<RecipeType, CreateRecipeType>({
      query: (body) => ({
        url: `/recipes`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [{ type: 'Recipes', id: 'LIST' }],
    }),
    updateRecipe: builder.mutation<
      RecipeType,
      { id: number; body: UpdateRecipeBodyType }
    >({
      query: ({ id, body }) => ({
        url: `/recipes/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: (_result, error, arg) =>
        error ? [] : [{ type: 'Recipes', id: arg.id }],
    }),
    deleteRecipe: builder.mutation<void, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, error) =>
        error ? [] : [{ type: 'Recipes', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRecipesQuery,
  useGetRecipeQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApi;
