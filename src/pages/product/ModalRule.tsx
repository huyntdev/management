import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { IRule, IProduct } from "../../types/product.types";
import { useState } from "react";
import { formatNumber, removeNonNumericCharacters } from "../../utils/helper";
import { IconDelete, IconPlus } from "../../components/icons";
import { v4 } from "uuid";
import { Dayjs } from "dayjs";
import { RuleObject } from "antd/es/form";
import { toast } from "react-toastify";

const initialRule: IRule = {
  id: v4(),
  title: "",
  start_date: undefined,
  end_date: undefined,
  buy_from: undefined,
  buy_to: undefined,
  discount: undefined,
};

const ModalRule = ({
  selectedProductRule,
  setSelectedProductRule,
}: {
  selectedProductRule: IProduct | undefined;
  setSelectedProductRule: (selectedProductRule: IProduct) => void;
}) => {
  const [form] = Form.useForm();
  const [rules, setRules] = useState<IRule[]>(() => {
    if (selectedProductRule?.rules && selectedProductRule.rules.length > 0) {
      return selectedProductRule?.rules;
    }

    return [initialRule];
  });

  const handleSubmit = () => {
    // Parse data to send BE
    const newRules = rules.map((rule) => ({
      ...rule,
      buy_from: removeNonNumericCharacters(rule.buy_from),
      buy_to: removeNonNumericCharacters(rule.buy_to),
      start_date: rule.start_date?.format("YYYY-MM-DD"),
      end_date: rule.end_date?.format("YYYY-MM-DD"),
    }));

    toast.success(
      `Product: ${selectedProductRule?.title} updated ${newRules.length} rules successfully`
    );
    console.log("🚀 ~ handleSubmit ~ value:", newRules);
  };

  //Handle Add Rule
  const handleAddRule = () => {
    setRules((prev) => {
      //Check element before having buy_to, if having to increase + 1
      const buyFromPrev = prev[prev.length - 1].buy_to
        ? Number(removeNonNumericCharacters(prev[prev.length - 1].buy_to)) + 1
        : undefined;
      return [...prev, { ...initialRule, id: v4(), buy_from: buyFromPrev }];
    });
  };

  //Handle Remove Rule
  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter((item) => item.id !== id));
  };

  //Handle Change Input
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setRules((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [name.split(id)[0]]: value } : item
      )
    );
  };
  //Handle Change Input Number
  const handleChangeInputNumber = (
    value: number | null,
    id: string,
    name: string
  ) => {
    setRules((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [name]: value } : item))
    );
  };
  //Handle Change Date
  const handleChangeDate = (date: Dayjs, id: string, name: string) => {
    setRules((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [name]: date } : item))
    );
  };

  //Cancel Modal
  const handleCancel = () => {
    setSelectedProductRule({
      id: 0,
      title: "",
    });
  };

  //Validate buy_from > buy_to before
  const validateBuyFrom = (
    _: RuleObject,
    value: number,
    id: string | undefined
  ) => {
    const buyToValueBefore = form.getFieldValue("buy_to" + id);
    if (!id || !value || value > buyToValueBefore) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Buy from must be greater than buy to before")
    );
  };
  //Validate buy_to > buy_from
  const validateBuyTo = (_: RuleObject, value: number, id: string) => {
    const buyFromValue = form.getFieldValue("buy_from" + id);
    if (!value || value > buyFromValue) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Buy to must be greater than buy from"));
  };
  //Validate end_date >= start_time
  const validateDate = (_: RuleObject, value: Dayjs, id: string) => {
    const startDate = form.getFieldValue("start_date" + id);

    if (
      !value ||
      !startDate ||
      value.startOf("day").isSame(startDate.startOf("day")) ||
      value.isAfter(startDate)
    ) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("End date must be greater than or equal start date")
    );
  };

  return (
    <Modal
      title="Add rule"
      open={selectedProductRule ? true : false}
      footer={false}
      onCancel={handleCancel}
      centered
      okText="Save"
      cancelText="Cancel"
      className="modal-product"
      width={700}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <div className="flex flex-col">
          {rules.map((rule, index: number) => (
            <div
              key={index}
              className={`flex items-end gap-3 pt-2 pb-4 ${
                index !== rules.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="grid grid-cols-3 gap-4">
                <Form.Item
                  label="Title campaign"
                  className="mb-0"
                  name={"title" + rule.id}
                  labelAlign="left"
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "The title field is required.",
                    },
                  ]}
                  initialValue={rule.title}
                >
                  <Input
                    name={"title" + rule.id}
                    allowClear
                    placeholder="Enter your title..."
                    onChange={(e) => handleChangeInput(e, rule.id)}
                  />
                </Form.Item>
                <Form.Item
                  name={"start_date" + rule.id}
                  className="mb-0"
                  label="Start date"
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "The start date field is required.",
                    },
                  ]}
                  initialValue={rule.start_date}
                >
                  <DatePicker
                    className="w-full"
                    placeholder="Enter start date..."
                    format="YYYY-MM-DD"
                    onChange={(date) =>
                      handleChangeDate(date, rule.id, "start_date")
                    }
                  />
                </Form.Item>
                <Form.Item
                  name={"end_date" + rule.id}
                  className="mb-0"
                  label="End date"
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "The end date field is required.",
                    },
                    {
                      validator: (_, value) => validateDate(_, value, rule.id),
                    },
                  ]}
                  initialValue={rule.end_date}
                >
                  <DatePicker
                    className="w-full"
                    placeholder="Enter end date..."
                    format="YYYY-MM-DD"
                    onChange={(date) =>
                      handleChangeDate(date, rule.id, "end_date")
                    }
                  />
                </Form.Item>
                <Form.Item
                  name={"buy_from" + rule.id}
                  className="mb-0"
                  label="Buy from"
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "The buy from field is required.",
                    },
                    {
                      validator: (_, value) =>
                        validateBuyFrom(
                          _,
                          value,
                          index > 0 ? rules[index - 1].id : undefined
                        ),
                    },
                  ]}
                  initialValue={rule.buy_from}
                >
                  <Input
                    name={"buy_from" + rule.id}
                    allowClear
                    placeholder="Enter the buy from..."
                    type="text"
                    onChange={(e) => {
                      handleChangeInput(e, rule.id);
                      form.setFieldValue(
                        "buy_from" + rule.id,
                        formatNumber(e.target.value)
                      );
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name={"buy_to" + rule.id}
                  className="mb-0"
                  label="Buy to"
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "The buy to field is required.",
                    },
                    {
                      validator: (_, value) => validateBuyTo(_, value, rule.id),
                    },
                  ]}
                  initialValue={rule.buy_to}
                >
                  <Input
                    name={"buy_to" + rule.id}
                    allowClear
                    placeholder="Enter the buy to..."
                    type="text"
                    onChange={(e) => {
                      form.setFieldValue(
                        "buy_to" + rule.id,
                        formatNumber(e.target.value)
                      );
                      handleChangeInput(e, rule.id);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name={"discount" + rule.id}
                  className="mb-0"
                  label="Discount per item(%)"
                  labelCol={{
                    span: 24,
                  }}
                  rules={[
                    {
                      required: true,
                      message: "The discount field is required.",
                    },
                  ]}
                  initialValue={rule.discount}
                >
                  <InputNumber
                    className="w-full"
                    placeholder="Enter discount..."
                    min={0}
                    max={100}
                    onChange={(value) =>
                      handleChangeInputNumber(value, rule.id, "discount")
                    }
                  />
                </Form.Item>
              </div>
              <div className="mb-2 flex-shrink-0">
                <IconDelete
                  className="w-4 h-4 cursor-pointer hover:scale-110 transition-all"
                  onClick={() => handleDeleteRule(rule.id)}
                ></IconDelete>
              </div>
            </div>
          ))}
        </div>
        <div>
          {" "}
          <Button
            type="text"
            size="middle"
            icon={<IconPlus />}
            className="bg-[rgba(48,48,48,1)] text-grayEB"
            onClick={handleAddRule}
          >
            Add Rule
          </Button>
        </div>
        <div className="flex justify-end gap-x-3">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            htmlType="submit"
            type="text"
            className="bg-dark30 text-grayEB"
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalRule;
