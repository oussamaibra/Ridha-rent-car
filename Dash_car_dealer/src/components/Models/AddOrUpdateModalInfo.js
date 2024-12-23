/* eslint-disable no-useless-concat */
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { notification } from "antd";
import axios from "axios";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import getEnvValue, { getJSON } from "../../utils";
import _, { isNil } from "lodash";
const { Option } = Select;

const AddOrUpdateModalInfo = (props) => {
  const { visible, onCancel } = props;
  const [Loading, setLoading] = useState(false);
  const [filelist, setfilelist] = useState([]);

  const serverURL = "https://www.ridharentcar.online";

  const [form] = useForm();

  const [token, setToken] = useState(getJSON(localStorage.getItem("token")));
  const [data, setData] = useState();

  const config = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    axios
      .get(
        "https://www.ridharentcar.online/api/financing/info/" + props.record._id,
        config
      )
      .then((response) => {
        if (response.data) {
          setData(response.data);
          form.setFieldsValue({
            ...props.record,
            assurance: response.data.assurance,
            vidange: response.data.vidange,
          });
        } else {
          notification.error({ message: "No Data Found" });
          form.setFieldsValue({});
          form.resetFields()
        }
      });
  }, [form, props.record, props.visible]);

  const handleonfinish = async (val) => {
    const config = {
      headers: {
        authorization: getJSON(localStorage.getItem("token")),
      },
    };

    let user = JSON.parse(localStorage.getItem("user"));
    const values = {
      ...val,
      id: props.record._id,
    };

    if (props.type === "EDIT") {
      await axios
        .put(
          "https://www.ridharentcar.online/api/financing/info/" + values.id,
          {
            carId: values.id,
            vidange: values.vidange,
            assurance: values.assurance,
          },
          config
        )
        .then((response) => {
          notification.success({ message: "Update Done  " });
          props.refetech();
          onCancel();
        })
        .catch(function (err) {
          props.refetech();
          onCancel();
        });
    }
  };
  return (
    <Form
      form={form}
      onFinish={handleonfinish}
      preserve={props.type === "EDIT" ? true : false}
    >
      <div className="site-card-border-less-wrapper">
        <Modal
          title={props.type === "EDIT" ? "UPDATE" : "CREATE"}
          visible={visible}
          destroyOnClose
          onOk={() => {
            form.submit();
          }}
          width={1000}
          onCancel={onCancel}
        >
          <Card hoverable>
            <Row>
              <Col span={24}>
                {Loading ? (
                  <Row justify="center">
                    <Spin />
                  </Row>
                ) : (
                  <img
                    src={props?.record?.images && props?.record?.images[0]}
                  ></img>
                )}
              </Col>
            </Row>
          </Card>

          <Row>
            <Card
              centered
              style={{
                width: "100%",
                height: "100%",
              }}
              hoverable
            >
              <Col span={12}>
                <label> Please input Vidange:</label>
                <Form.Item
                  name="vidange"
                  rules={[
                    {
                      required: true,
                      message: "Please input your vidange!",
                    },
                  ]}
                >
                  <Input placeholder="vidange" type="vidange" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <label> Please input Assurance:</label>
                <Form.Item
                  name="assurance"
                  rules={[
                    {
                      required: true,
                      message: "Please input your assurance!",
                    },
                  ]}
                >
                  <Input placeholder="assurance" type="assurance" />
                </Form.Item>
              </Col>
            </Card>
          </Row>
        </Modal>
      </div>
    </Form>
  );
};

export default AddOrUpdateModalInfo;
