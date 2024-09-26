import { Dayjs } from "dayjs";
export interface IProduct {
  id: number;
  title: string;
  rules?: IRule[];
}

export interface IRule {
  id: string;
  title: string;
  start_date?: Dayjs;
  end_date?: Dayjs;
  buy_from?: number;
  buy_to?: number;
  discount?: number;
}

export type TProductProps = {
  total: number;
  data: IProduct[];
};
