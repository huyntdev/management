export type TSidebarLink = {
  title: string;
  icon: JSX.Element;
  path: string;
};

export type TQuery = {
  page?: number | string;
  limit?: number | string;
  search?: string;
  status?: string;
};
