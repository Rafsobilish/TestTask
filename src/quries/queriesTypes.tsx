export type IGetReviews = {
  id: number;
  text: string;
}[];

export type IGetProduct = {
  page: number;
  amount: number;
  total: number;
  items: {
    id: number;
    image_url: string;
    title: string;
    description: string;
    price: number;
  }[];
};

export type IOrderData = {
  phone: string;
  cart: {
    id: number;
    quantity: number;
  }[];
};

export type IPostOrder = {
  success: number;
  error: string | null;
};
