import moment from "moment";
import { TQuery } from "../types/general.types";
import { IProduct, TProductProps } from "../types/product.types";
import { v4 } from "uuid";
import dayjs from "dayjs";

export const fakeProducts = (products: IProduct[], queries: TQuery) => {
  const data: TProductProps = {
    total: 0,
    data: [],
  };
  const { page, limit, search, status } = queries;
  if (products.length > 0) {
    let filteredProducts = products.map((product, index) => ({
      id: product.id,
      title: product.title,
      image: `https://picsum.photos/id/${index}/200/300`,
      rules:
        index % 2 === 0
          ? [
              {
                id: v4(),
                title: "Campaign 1",
                start_date: dayjs().subtract(1, "day"),
                end_date: dayjs(),
                buy_from: 2,
                buy_to: 5,
                discount: 10,
              },
            ]
          : [],
      updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    }));

    // Lọc theo search
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Lọc theo status
    if (status === "active") {
      filteredProducts = filteredProducts.filter(
        (product) => product.rules.length > 0
      );
    } else if (status === "no_rule") {
      filteredProducts = filteredProducts.filter(
        (product) => product.rules.length === 0
      );
    }

    data.total = filteredProducts.length;

    const currentPage = page ? Number(page) : 1;
    const currentLimit = limit ? Number(limit) : 20;

    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;

    data.data = filteredProducts.slice(startIndex, endIndex);
  }

  return data;
};
