import React from 'react';
import { Avatar, Col, Collapse, Row } from 'antd';
import { useGetExchangesQuery } from '../services/cryptoAPI';
import HTMLReactParser from 'html-react-parser';
import { Typography } from 'antd';
import millify from 'millify';
import Loader from './Loader';

const Exchanges = () => {

   const { Panel } = Collapse;
   const { Title, Text, Paragraph } = Typography;

   const { data: exchanges, isFetching } = useGetExchangesQuery();
   if (isFetching) return <Loader />;
   console.log(exchanges);

   // console.log(Object.values(exchanges?.data?.exchanges)[0].uuid);
   return (
      <>
         <Row style={{textAlign:'center'}} >
            <Col span={6}>
               <Title level={5}>Exchange</Title>
            </Col>
            <Col span={6}>
               <Title level={5}>24h Trade Volume</Title>
            </Col>
            <Col span={6}>
               <Title level={5}>Markets</Title>
            </Col>
            <Col span={6}>
               <Title level={5}>Change</Title>
            </Col>
         </Row>
         <Row>
            {exchanges?.data?.exchanges.map((exchange) => (
               <Col span={24}>

                  <Collapse accordion defaultActiveKey={`${Object.values(exchanges?.data?.exchanges)[0].uuid}`}>
                     <Panel
                        showArrow={false}
                        key={`${exchange.uuid}`}
                        header={(
                           <Row >
                              <Col span={6}>
                                 <Text strong>{exchange.rank}. </Text>
                                 <Avatar src={exchange.iconUrl} className='exchange-image' />
                                 <Text strong> {exchange.name}</Text>
                              </Col>
                              <Col span={6} style={{textAlign:'center'}}>
                                 <Text>${millify(exchange.volume)}</Text>
                              </Col>
                              <Col span={6} style={{textAlign:'center'}}>
                                 {millify(exchange.numberOfMarkets)}
                              </Col>
                              <Col span={6} style={{textAlign:'center'}}>
                                 {millify(exchange.marketShare)}%
                              </Col>
                           </Row>
                        )}
                     >
                        <Paragraph>{HTMLReactParser(exchange.description || 'Description Unavailable')}</Paragraph>
                     </Panel>
                  </Collapse>
               </Col>
            ))}
         </Row>
      </ >
   )
}

export default Exchanges
