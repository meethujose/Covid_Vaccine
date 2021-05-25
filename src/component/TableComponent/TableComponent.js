import { Table, Switch, Radio, Form, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import getAxiosInstance from "../../axiosInstance";

// const expandable = { expandedRowRender: record => <p>{record.description}</p> };
// const title = () => 'Here is title';
// const showHeader = true;
// const footer = () => 'Here is footer';
// const pagination = { position: 'bottom' };

export default function TableComponent() { 
  
  const [userData, setUserData] = useState([]);
  const [temp, setTemp] = useState([]);
  const [  bordered, setbordered] = useState(false);
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState();
const [size, setsize] = useState('small');
    // size: 'small',
    // expandable,
const [title, settitle] = useState(undefined);
const [showHeader, setshowHeader] = useState();
const [footer, setfooter] = useState();
const [rowSelection, setrowSelection] = useState({});
const [scroll, setscroll] = useState(undefined);
const [hasData, sethasData] = useState(true)
const [tableLayout, settableLayout] = useState(undefined);
const [top, settop] = useState('none')
const [bottom, setbottom] = useState('bottomRight')

useEffect(() => {
  getData();
}, []);
const getData = async () => {
  getAxiosInstance().then(async (axiosInstance) => {
    await axiosInstance
      .get("userapi/accounts/")
      .then((res) => {
        setUserData(res.data);
        setTemp(res.data); 
        console.log("userData",userData);   
      })
      .catch((err) => console.error(err));
  });
};

const columns = [

  {
    title: 'Sl.No',
    dataIndex: 'Sl.No',
    key: 'Sl.No',
  },
  // {
  //   title: 'avatar',
  //   dataIndex: 'avatar',
  //   key: 'avatar',
  // },
 
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'emiratesID',
    dataIndex: 'emiratesID',
    key: 'emiratesID',
  },
  {
    title: 'first_name',
    dataIndex: 'first_name',
    key: 'first_name',
    sorter: (a, b) => a.first_name.localeCompare(b.first_name),
  },
  {
    title: 'last_name',
    dataIndex: 'last_name',
    key: 'last_name',
    sorter: (a, b) => a.last_name.localeCompare(b.last_name),
  },
  {
    title: 'vaccine_dose',
    dataIndex: 'vaccine_dose',
    key: 'vaccine_dose',
    filters: [
            {
              text: 'first Dose',
              value: 'first Dose',
            },
            {
              text: 'Second Dose',
              value: 'Second Dose',
            },
          ],
          onFilter: (value, record) => record.vaccine_dose.indexOf(value) === 0,
  },
  {
    title: 'covid_status',
    dataIndex: 'covid_status',
    key: 'covid_status',
    filters: [
      {
        text: 'Positive',
        value: 'Positive',
      },
      {
        text: 'Negative',
        value: 'Negative',
      },
      {
        text: 'NA',
        value: 'NA',
      },
    ],
    onFilter: (value, record) => record.covid_status.indexOf(value) === 0,
  },
  {
        title: 'Action',
        key: 'action',
        render: () => (
          <Space size="middle">
            <a className="ant-dropdown-link">
              Edit
            </a>
          </Space>
        ),
      },
  
];



// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     sorter: (a, b) => a.age - b.age,
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     filters: [
//       {
//         text: 'London',
//         value: 'London',
//       },
//       {
//         text: 'New York',
//         value: 'New York',
//       },
//     ],
//     onFilter: (value, record) => record.address.indexOf(value) === 0,
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     sorter: true,
//     render: () => (
//       <Space size="middle">
//         <a>Delete</a>
//         <a className="ant-dropdown-link">
//           More actions <DownOutlined />
//         </a>
//       </Space>
//     ),
//   },
// ];

// const data = [];
// for (let i = 1; i <= 10; i++) {
//   data.push({
//     key: i,
//     name: 'John Brown',
//     age: `${i}2`,
//     address: `New York No. ${i} Lake Park`,
//     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
//   });
// }
 
let Data = [];
userData.map((value, index) =>{
  let obj = {}
  obj['Sl.No'] = index+1
  obj['avatar'] = value.avatar
  obj['email'] = value.email
  obj['emiratesID'] = value.emiratesID
  obj['first_name'] = value.first_name
  obj['last_name'] = value.last_name
  obj['vaccine_dose'] =(!value.first_dose && !value.second_dose)? "Not vaccinated" : (value.first_dose && !value.second_dose)  ? "first Dose"    : "Second Dose"
  obj['covid_status']=  value.covid_status
  Data.push(obj)
  
})



const  handleToggle = (prop) => enable => {
    this.setState({ [prop]: enable });
  };

 const handleSizeChange =(e) => {
   setsize(e.target.value);
  };

 const handleTableLayoutChange = e => {
    settableLayout(e.target.value );
  };

  // handleExpandChange = enable => {
  //   this.setState({ expandable: enable ? expandable : undefined });
  // };

 const handleEllipsisChange = enable => {
    this.setState({ ellipsis: enable });
  };

 const handleTitleChange = enable => {
    settitle(enable ? title : undefined );
  };

 const handleHeaderChange = enable => {
    this.setState({ showHeader: enable ? showHeader : false });
  };

 const handleFooterChange = enable => {
    this.setState({ footer: enable ? footer : undefined });
  };

 const handleRowSelectionChange = enable => {
    this.setState({ rowSelection: enable ? {} : undefined });
  };

// const  handleYScrollChange = enable => {
//     setyScroll(enable);
//   };

 const handleXScrollChange = e => {
    this.setState({ xScroll: e.target.value });
  };

 const handleDataChange = hasData => {
    this.setState({ hasData });
  };

  
    // const { xScroll, yScroll, ...state } = this.state;

    // const tblscroll = {};
    // if (yScroll) {
    //   tblscroll.y = 240;
    // }
    // if (xScroll) {
    //   tblscroll.x = '100vw';
    // }

    // const tableColumns = columns.map(item => ({ ...item, ellipsis: state.ellipsis }));
    // if (xScroll === 'fixed') {
    //   tableColumns[0].fixed = true;
    //   tableColumns[tableColumns.length - 1].fixed = 'right';
  

    return (
      <>
        {/* <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 16 }}
        > */}
          {/* <Form.Item label="Bordered">
            <Switch checked={state.bordered} onChange={this.handleToggle('bordered')} />
          </Form.Item>
          <Form.Item label="loading">
            <Switch checked={state.loading} onChange={this.handleToggle('loading')} />
          </Form.Item>
          <Form.Item label="Title">
            <Switch checked={!!state.title} onChange={this.handleTitleChange} />
          </Form.Item>
          <Form.Item label="Column Header">
            <Switch checked={!!state.showHeader} onChange={this.handleHeaderChange} />
          </Form.Item>
          <Form.Item label="Footer">
            <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
          </Form.Item>
          <Form.Item label="Expandable">
            <Switch checked={!!state.expandable} onChange={this.handleExpandChange} />
          </Form.Item>
          <Form.Item label="Checkbox">
            <Switch checked={!!state.rowSelection} onChange={this.handleRowSelectionChange} />
          </Form.Item>
          <Form.Item label="Fixed Header">
            <Switch checked={!!yScroll} onChange={this.handleYScrollChange} />
          </Form.Item>
          <Form.Item label="Has Data">
            <Switch checked={!!state.hasData} onChange={this.handleDataChange} />
          </Form.Item>
          <Form.Item label="Ellipsis">
            <Switch checked={!!state.ellipsis} onChange={this.handleEllipsisChange} />
          </Form.Item>
          <Form.Item label="Size">
            <Radio.Group value={state.size} onChange={this.handleSizeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="middle">Middle</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Table Scroll">
            <Radio.Group value={xScroll} onChange={this.handleXScrollChange}>
              <Radio.Button value={undefined}>Unset</Radio.Button>
              <Radio.Button value="scroll">Scroll</Radio.Button>
              <Radio.Button value="fixed">Fixed Columns</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Table Layout">
            <Radio.Group value={state.tableLayout} onChange={this.handleTableLayoutChange}>
              <Radio.Button value={undefined}>Unset</Radio.Button>
              <Radio.Button value="fixed">Fixed</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Pagination Top">
            <Radio.Group
              value={this.state.top}
              onChange={e => {
                this.setState({ top: e.target.value });
              }}
            >
              <Radio.Button value="topLeft">TopLeft</Radio.Button>
              <Radio.Button value="topCenter">TopCenter</Radio.Button>
              <Radio.Button value="topRight">TopRight</Radio.Button>
              <Radio.Button value="none">None</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Pagination Bottom">
            <Radio.Group
              value={this.state.bottom}
              onChange={e => {
                this.setState({ bottom: e.target.value });
              }}
            >
              <Radio.Button value="bottomLeft">BottomLeft</Radio.Button>
              <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
              <Radio.Button value="bottomRight">BottomRight</Radio.Button>
              <Radio.Button value="none">None</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form> */}




        <Table
          // {...this.state}
          // pagination={{ position: [top, bottom] }}
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
          columns={columns}
          dataSource={Data}
          scroll={scroll}
        />
      </>
    );
  }


// ReactDOM.render(<Demo />, mountNode);