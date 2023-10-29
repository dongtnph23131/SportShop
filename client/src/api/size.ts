import { ISize } from "../interfaces/size";
import instance from "./instance";
export const getSizes = () => {
  return instance.get("/sizes");
};
export const getSizeById = (_id: number | string) => {
  return instance.get(`/sizes/${_id}`);
};
export const addSize = (Size: ISize) => {
  return instance.post("/sizes", Size);
};
export const updateSize = (Size: ISize) => {
  return instance.patch(`/sizes/${Size._id}`, Size);
};
export const deleteSize = (_id: number | string) => {
  return instance.delete(`/sizes/${_id}`);
};