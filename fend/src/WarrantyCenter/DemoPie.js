import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = () => {
  const data = [
    {
      type: 'Sản phẩm tốt',
      value: 85,
    },
    {
      type: 'Sản phẩm lỗi',
      value: 15,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return (
  <Pie {...config} />
  )
}; 
  //ReactDOM.render(<DemoPie />, document.getElementById('container'));

    export default DemoPie
