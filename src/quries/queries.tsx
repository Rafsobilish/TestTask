import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type {
  IGetProduct,
  IGetReviews,
  IOrderData,
  IPostOrder,
} from "./queriesTypes";

export const baseUrl = "http://o-complex.com:1337";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//queries

export const GetReviews = async () => {
  const res: AxiosResponse<IGetReviews> = await axiosInstance.get("/reviews");
  return res.data;
};
export const GetProducts = async (page: number, pageSize: number = 60) => {
  const res: AxiosResponse<IGetProduct> = await axiosInstance.get(
    `/products?page=${page}&page_size=${pageSize}`
  );
  return res.data;
};

//Mutation
export const PostOrder = async (orderData: IOrderData) => {
  const res: AxiosResponse<IPostOrder> = await axiosInstance.post(
    `/order`,
    orderData
  );
  return res.data;
};
