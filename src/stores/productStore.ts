import { create } from "zustand";
import { RepositoryRemote } from "../services";
import { IProduct } from "../types/product.types";
import { TQuery } from "../types/general.types";
import { fakeProducts } from "../utils/fakeProducts";

interface ProductState {
  products: {
    total: number;
    data: IProduct[];
  };
  loading: boolean;
  getListProducts: (params?: {
    queries?: TQuery;
    onSuccess?: (data: { total: number; data: IProduct[] }) => void;
    onFail?: (msg: string) => void;
  }) => void;
}

export const useProductsStore = create<ProductState>((set) => ({
  products: {
    total: 0,
    data: [],
  },
  loading: false,
  getListProducts: async (params = {}) => {
    const { queries = {}, onSuccess = () => {}, onFail = () => {} } = params;

    try {
      set({ loading: true });
      const response = await RepositoryRemote.products.getListProducts();
      const { total, data } = fakeProducts(response.data, queries);
      const products = {
        total,
        data,
      };
      set({ products });
      onSuccess(products);
    } catch (err) {
      onFail(`Error: ${JSON.stringify(err)}`);
    }
    set({ loading: false });
  },
}));
