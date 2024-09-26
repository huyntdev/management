import { Button, Form, Input, Modal } from "antd";
import { formatNumber, removeNonNumericCharacters } from "../../utils/helper";
import { UploadImage } from "../../components/upload";
import { toast } from "react-toastify";
interface IFormProduct {
  title: string;
  price: string | number;
  image?: string;
  description?: string;
}
const ModalAdd = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (product: IFormProduct) => {
    const data = {
      ...product,
      price: removeNonNumericCharacters(product.price),
    };
    console.log("🚀 ~ handleSubmit ~ data:", data);
    toast.success(`Thêm sản phẩm: ${data.title} thành công`);
  };

  return (
    <Modal
      title="Add product"
      open={open}
      footer={false}
      onCancel={() => setOpen(false)}
      centered
      okText="Save"
      cancelText="Cancel"
      className="modal-product"
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
        <Form.Item
          label="Title"
          name="title"
          labelAlign="left"
          className="font-medium mb-3"
          labelCol={{
            span: 24,
          }}
          rules={[
            {
              required: true,
              message: "The title field is required.",
            },
          ]}
        >
          <Input allowClear placeholder="Enter your title..." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: "The price field is required.",
            },
          ]}
        >
          <Input
            allowClear
            placeholder="Enter your price..."
            type="text"
            name="price"
            onChange={(e) =>
              form.setFieldValue("price", formatNumber(e.target.value))
            }
          />
        </Form.Item>
        <Form.Item
          name="image"
          label={<p className="font-extrabold flex-shrink-0 text-lg">Image</p>}
        >
          <UploadImage
            images={Form.useWatch("image", form)}
            setImages={(image: File) => form.setFieldValue("image", image)}
            title="Add image"
            width="100%"
            height="130px"
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          labelAlign="left"
          className="font-medium mb-3"
          labelCol={{
            span: 24,
          }}
        >
          <Input.TextArea allowClear placeholder="Enter your description" />
        </Form.Item>
        <div className="flex justify-end gap-x-3">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
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

export default ModalAdd;
