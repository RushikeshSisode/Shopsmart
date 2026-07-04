import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";
import { ICategory } from "../../types";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<ICategory, { name: string }>({
      query: (newCategory) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation<ICategory, { categoryId: string; updatedCategory: { name: string } }>({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),
    deleteCategory: builder.mutation<ICategory, string>({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),
    fetchCategories: builder.query<ICategory[], void>({
      query: () => `${CATEGORY_URL}/categories`,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} = categoryApiSlice;