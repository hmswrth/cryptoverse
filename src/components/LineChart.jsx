import React, { useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import { Col, Row,  Typography } from 'antd';

const {Title} = Typography;

const LineChart = ({coinHistory, currentPrice, coinName}) => {
   const coinPrice = [];
   const coinTimeStamp = [];

   //process the timestamp and coin price for the price chart
   coinHistory?.data?.history?.forEach((item, _) => {
      coinPrice.push(item?.price)
      coinTimeStamp.push(new Date(item?.timestamp * 1000).toLocaleDateString())
   })


   const data = {
      labels : coinTimeStamp,
      datasets: [
         {
            label: 'price in USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
         },
      ],
   };

   const options = {
      scales: {
         yAxes: [
            {
               ticks:{
                  beginAtZero: true,
               },
            },
         ],
      },
   };

   return (
      <>
         <Row className='chart-header'>
            <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
            <Col className='price-container'>
               <Title level={5} className='price-change'>Change: {coinHistory?.data?.change}%</Title>
               <Title level={5} className='current-price'>Current {coinName} Price : $ {currentPrice}</Title>
            </Col>
         </Row>
         <Line data={data} options={options} />
      </>
   )
}

export default LineChart;
