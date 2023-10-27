
import { ICategory } from "../interfaces/categort";
import instance from "./instance";
export const getCategories = () => {
  return instance.get("/categories");
};
export const getCategoryById = (_id: number | string) => {
  return instance.get(`/categories/${_id}`);
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
