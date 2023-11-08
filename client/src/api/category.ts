import { ICategory } from "../interfaces/category";
import instance from "./instance";
export const getCategories = () => {
  return instance.get("/categories");
};
export const getCategoryById = (
  _id: number | string,
  sort: any,
  order: any,
  page: any
) => {
  return instance.get(
    `/categories/${_id}?&_limit=4&_page=${page}${sort ? `&_sort=${sort}` : ``}${
      order ? `&_order=${order}` : ``
    }`
  );
};
export const addCategory = (category: ICategory) => {
  return instance.post("/categories", category);
};
export const updateCategory = (category: ICategory) => {
  return instance.patch(`/categories/${category._id}`, category);
};
export const deleteCategories = (_id: number | string) => {
  return instance.delete(`/categories/${_id}`);
};
export const getCategoryByIdNopage = (
  _id: number | string,
  sort: any,
  order: any
) => {
  return instance.get(
    `/categories/${_id}?${sort ? `&_sort=${sort}` : ``}${
      order ? `&_order=${order}` : ``
    }`
  );
};
