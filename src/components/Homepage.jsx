import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoAPI";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";
import { useEffect } from "react";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  // console.log(data)
  if (isFetching) return <Loader />;
  return (
    <>
      <div className="routes">
        <Title level={2} className="heading">
          Global Crypto Stats
        </Title>
        <Row>
          <Col span={12}>
            <Statistic
              title="total cryptocurrencies"
              value={globalStats.total}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="total exchanges"
              value={millify(globalStats.totalExchanges)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="total market cap"
              value={millify(globalStats.totalMarketCap)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="total 24h volume"
              value={millify(globalStats.total24hVolume)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="total markets"
              value={millify(globalStats.totalMarkets)}
            />
          </Col>
        </Row>
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Top 10 Cryptocurrencies in the world
          </Title>
          <Title level={3} className="show-more">
            <Link to="/cryptocurrencies">See More</Link>
          </Title>
        </div>
        <Cryptocurrencies simplified />
        <div className="home-heading-container">
          <Title level={2} className="home-title">
            Latest Crypto News
          </Title>
          <Title level={3} className="show-more">
            <Link to="/news">See More</Link>
          </Title>
        </div>
        <News simplified />
      </div>
    </>
  );
};

export default Homepage;
