import React, { useEffect, useState } from "react";
import { Typography, Select, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoAPI";
import Loader from "./Loader";
import NewsModal from "./NewsModal";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = "https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";
const NEWS_MODAL_PROPS = {
  isModalOpen : false,
  title: '',
  onCancel : ()=>{},
  urlL:'',
  body : ''
}

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [newsModalProps, setNewsModalProps] = useState(NEWS_MODAL_PROPS)
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 20,
  });
  const { data } = useGetCryptosQuery(100);

  const handleNewsClick = ({title, url, body}) => {
    setNewsModalProps((prev) => ({
      ...prev,
      isModalOpen : true,
      title,
      url,
      body,
      onCancel : () => setNewsModalProps(NEWS_MODAL_PROPS)
    }))
  }

  // onError callback for image
  const handleImageFallBack = (e) => {
    e.target.src = demoImage
  }

  if (isFetching) return <Loader />;

  return (
    <>
     <NewsModal {...newsModalProps} />
      <div className="routes">
        <Row gutter={[24, 24]}>
          {!simplified && (
            <Col span={24}>
              <Select
                showSearch
                className="select-news"
                placeholder="Select a Crypto"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Cryptocurency">Cryptocurrency</Option>
                {data?.data?.coins?.map((currency) => (
                  <Option value={currency.name}>{currency.name}</Option>
                ))}
              </Select>
            </Col>
          )}
          {cryptoNews?.news?.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card" onClick={() => handleNewsClick(news)}>
                {/* <a href={news.url} target="_blank" rel="noreferrer"> */}
                  <div className="news-image-container">
                    <Title
                      className="news-title"
                      level={5}
                      style={{ marginRight: "4px" }}
                    >
                      {news.title}
                    </Title>
                    <img
                      className="news-image"
                      src={news?.image || demoImage}
                      alt=""
                      onError={handleImageFallBack}
                    />
                  </div>
                  <p>
                    {news.body.length > 100
                      ? `${news.body.substring(0, 100)}...`
                      : news.body}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar
                        src={demoImage}
                        alt=""
                      />
                      <Text className="provider-name">
                        {news.source}
                      </Text>
                    </div>
                    <Text className="provider-name">
                      {moment(news.date).startOf("ss").fromNow()}
                    </Text>
                  </div>
                {/* </a> */}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default News;
