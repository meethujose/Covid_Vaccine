import React, { useContext, useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import getAxiosInstance from "../../axiosInstance";
import { Table, Input, Button, Popconfirm, Form, Space } from "antd";
import TestDetails from '../UI/TestDetails/TestDetails';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default function TestResult(props) {

  const [testData, setTestData] = useState([]);

  const [addTestData, setAddTestData] = useState(false);


  const [temp, setTemp] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    getAxiosInstance().then(async (axiosInstance) => {
      await axiosInstance
        .get("vaccineapi/selftestlist/")
        .then((res) => {
          setTestData(res.data);
          setTemp(res.data);
          console.log("userData", testData);
        })
        .catch((err) => console.error(err));
    });
  };
  const [columns, setColumns] = useState([
    {
      title: "Sl.No",
      dataIndex: "Sl.No",
      key: "Sl.No",
    },
    {
      title: "test_date",
      dataIndex: "test_date",
      width: "30%",
    },
    {
      title: "test_result",
      dataIndex: "test_result",
    },
    {
      title: "remarks",
      dataIndex: "remarks",
    },
    {
      title: "atachments",
      dataIndex: "atachments",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size='middle'>
          <a className='ant-dropdown-link'>Delete</a>
        </Space>
      ),
    },
   
  ]);
  let Data = [];
  testData.map((value, index) => {
    let obj = {};
    obj["Sl.No"] = index + 1;
    obj["test_date"] = value.test_date;
    obj["test_result"] = value.test_result;
    obj["remarks"] = value.remarks;
    obj["atachments"] = value.atachments;

    Data.push(obj);
  });

  const [state, setState] = useState({
    dataSource: [
      {
        key: "0",
        name: "Edward King 0",
        age: "32",
        address: "London, Park Lane no. 0",
      },
      {
        key: "1",
        name: "Edward King 1",
        age: "32",
        address: "London, Park Lane no. 1",
      },
    ],
    count: 2,
  });

  const handleDelete = (key) => {
    const dataSource = [...state.dataSource];
    setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  const AddNewTestDataHandler = () => {
    setAddTestData(!addTestData);
  };
  const handleAdd = () => {};
  const handleSave = (row) => {
    const newData = [...state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setState({
      dataSource: newData,
    });
  };

  const { dataSource } = state;
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const _columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <div>
      <Button
        onClick={() => AddNewTestDataHandler()}
        type='primary'
        style={{
          marginBottom: 16,
        }}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={Data}
        columns={_columns}
      />
      {addTestData?<TestDetails  setAddTestData={setAddTestData} addTestData={addTestData}/> :null}
    </div>
  );
}
