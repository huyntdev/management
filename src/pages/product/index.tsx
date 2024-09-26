import { useCallback, useEffect, useState } from "react";
import { useProductsStore } from "../../stores/productStore";
import { useSearchParams } from "react-router-dom";
import history from "../../history";
import { Button, Image, Input, Select, Table, TableProps } from "antd";
import { TQuery } from "../../types/general.types";
import { IProduct } from "../../types/product.types";
import { IconPlus, IconSearch } from "../../components/icons";
import { Key, TablePaginationConfig } from "antd/es/table/interface";
import { productStatus } from "../../constants/genaral.const";
import debounce from "lodash.debounce";
import ModalAdd from "./ModalAdd";
import ModalRule from "./ModalRule";

const ProductPage = () => {
  const { loading, products, getListProducts } = useProductsStore(
    (state) => state
  );
  const [searchParams] = useSearchParams();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      pageSize: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : 20,
    },
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
  });
  const [searchInput, setSearchInput] = useState<string>(tableParams.search);
  const [openModalAdd, setOpenModalAdd] = useState<boolean>(false);
  const [selectedProductRule, setSelectedProductRule] = useState<IProduct>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams((prevTableParams) => ({
      ...prevTableParams,
      pagination: {
        ...prevTableParams.pagination,
        current:
          pagination.pageSize != prevTableParams.pagination.pageSize
            ? 1
            : Number(pagination.current),
        pageSize: Number(pagination.pageSize),
      },
    }));
  };

  const productsTable: TableProps<{
    key: number;
    id: number;
    title: string;
  }>["columns"] = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      align: "center",
      width: 150,
      render: (image) => {
        return (
          <Image
            src={image}
            width={70}
            height={70}
            className="rounded-md object-cover"
          ></Image>
        );
      },
    },
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
      width: 300,
      sorter: (product1, product2) =>
        (product1.title || "").localeCompare(product2.title || ""),
      render: (title: string) => (
        <p className="font-medium cursor-pointer line-clamp-1 ">{title}</p>
      ),
    },
    {
      title: "Rule(s)",
      dataIndex: "rules",
      key: "rules",
      width: 150,
      render: (rules) => <>{rules.length}</>,
    },
    {
      title: "Last update",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 250,
      render: (updated_at) => <p>{updated_at}</p>,
    },
    {
      title: "Status",
      dataIndex: "rules",
      key: "rules",
      width: 200,
      render: (rules) => (
        <div className="text-sm">
          {rules.length > 0 ? (
            <span className="py-[6px] px-3 bg-[#CDFEE1] text-[#0C5132] rounded-lg">
              Active
            </span>
          ) : (
            <span className="py-[6px] px-3 bg-[rgba(0,0,0,0.06)] text-[#616161] rounded-lg">
              No rule
            </span>
          )}
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      fixed: "right",
      align: "center",
      width: 180,
      render: (product) => {
        return (
          <Button
            type="text"
            size="middle"
            icon={<IconPlus />}
            className="bg-[rgba(48,48,48,1)] text-grayEB"
            onClick={() => setSelectedProductRule(product)}
          >
            Add Rule
          </Button>
        );
      },
    },
  ];

  const handleSelectChange = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleChangeStatus = (value: string) => {
    setTableParams((prevTableParams) => ({
      ...prevTableParams,
      pagination: {
        ...prevTableParams.pagination,
        current: 1,
      },
      status: value,
    }));
  };

  const debounceCallBack = useCallback(
    debounce((data) => {
      setTableParams((prevTableParams) => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          current: 1,
        },
        search: data,
      }));
    }, 500),
    []
  );

  const handleSearch = (data: string) => {
    setSearchInput(data);
    debounceCallBack(data);
  };

  const dataSource = (products: { data: IProduct[] }) => {
    if (products?.data.length > 0) {
      return products.data.map((product) => ({
        ...product,
        key: product.id,
      }));
    }
    return [];
  };

  const getQueries = ({
    page = 1,
    limit = 20,
    search = "",
    status = "",
  }: TQuery) => {
    let queries = `?page=${page}&limit=${limit}`;

    if (search) {
      queries += `&search=${search}`;
    }

    if (status) {
      queries += `&status=${status}`;
    }

    history.push(`/products${queries}`);

    return {
      page,
      limit,
      search,
      status,
    };
  };

  const fetchDataTable = () => {
    const queries = getQueries({
      page: tableParams.pagination.current,
      limit: tableParams.pagination.pageSize,
      search: tableParams.search,
      status: tableParams.status,
    });

    getListProducts({
      queries,
      onSuccess: (response) => {
        setTableParams((prevTableParams) => ({
          ...prevTableParams,
          pagination: {
            ...prevTableParams.pagination,
            total: response.total,
          },
        }));
      },
    });
  };

  useEffect(() => {
    fetchDataTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tableParams.pagination.current,
    tableParams.pagination.pageSize,
    tableParams.search,
    tableParams.status,
  ]);

  return (
    <>
      <div className="flex justify-between gap-x-3 py-4">
        <h3 className="text-2xl font-semibold">Products</h3>
        <Button
          type="text"
          className="bg-[#E3E3E3] text-dark30 text-sm font-medium"
          onClick={() => setOpenModalAdd(true)}
        >
          Add Product
        </Button>
      </div>
      <div>
        <Table
          rowClassName="editable-row"
          columns={productsTable}
          scroll={{
            x: 1200,
            y: 660,
          }}
          size="middle"
          dataSource={dataSource(products)}
          loading={loading}
          onChange={handleTableChange}
          rowSelection={{
            selectedRowKeys,
            onChange: handleSelectChange,
          }}
          pagination={tableParams.pagination}
          className="border border-[rgba(227,227,227,1)] rounded-lg"
          title={() => (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <Select
                  style={{ width: 100 }}
                  value={tableParams.status}
                  options={productStatus}
                  onChange={handleChangeStatus}
                  placeholder="Giới tính"
                  variant="filled"
                />
                <span
                  className={`text-sm font-medium cursor-pointer px-3 py-[4px] rounded-md ${
                    tableParams.status === "active"
                      ? "bg-[rgba(0,0,0,0.08)]"
                      : ""
                  }`}
                  onClick={() => handleChangeStatus("active")}
                >
                  Active
                </span>
                <span
                  className={`text-sm font-medium cursor-pointer px-3 py-[4px] rounded-md ${
                    tableParams.status === "no_rule"
                      ? "bg-[rgba(0,0,0,0.08)]"
                      : ""
                  }`}
                  onClick={() => handleChangeStatus("no_rule")}
                >
                  No rule
                </span>
              </div>
              <div>
                {" "}
                <Input
                  className="w-[250px]"
                  placeholder="Tìm kiếm sản phẩm..."
                  prefix={<IconSearch />}
                  allowClear
                  value={searchInput}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          )}
        />
      </div>
      {openModalAdd ? (
        <ModalAdd open={openModalAdd} setOpen={setOpenModalAdd}></ModalAdd>
      ) : null}
      {selectedProductRule?.id ? (
        <ModalRule
          selectedProductRule={selectedProductRule}
          setSelectedProductRule={setSelectedProductRule}
        ></ModalRule>
      ) : null}
    </>
  );
};

export default ProductPage;
