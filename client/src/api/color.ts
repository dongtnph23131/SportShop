import { IColor } from "../interfaces/color";
import instance from "./instance";
export const getColors = () => {
  return instance.get("/colors");
};
export const getColorById = (_id: number | string) => {
  return instance.get(`/colors/${_id}`);
};
export const addColor = (color: IColor) => {
  return instance.post("/colors", color);
};
export const updateColor = (color: IColor) => {
  return instance.patch(`/colors/${color._id}`, color);
};
export const deleteColor = (_id: number | string) => {
  return instance.delete(`/colors/${_id}`);
};