import React, { useState } from "react";
import Modal from "../../../component/UI/Modal/Modal";
import "./TestPage.css";
import { useSpring, animated } from "react-spring";
import avatar from '../../../assets/images/user1.png'

import { Table, Tag, Space } from 'antd';






export default function TestPage() {
  const [isHovered, setIsHovered] = useState(false);
  const styles = useSpring({
    width: isHovered ? 200 : 0,
    height: isHovered ? 100 : 0,
    scale: isHovered ? 1 : 0,
    transform: 'translate3d(0px,0,0) scale(1) rotateX(0deg)',
    backgroundColor: isHovered ? "white" : "green",
    borderRadius: 10,
    boxShadow: 5,
  });

  const animation_on_button = () => {
    const temp = isHovered;
    setIsHovered(!temp);
  };

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
<Table dataSource={dataSource} columns={columns} />
    </>
  );
}
