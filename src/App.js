import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import {
   Navbar, Cryptocurrencies, CryptoDetails, Exchanges, Homepage
   , News
} from './components';

const app = () => {
   return (
         <div className='app'>
            <div className='navbar'>
               <Navbar />
            </div>
            <div className='main'>
               <Layout>
                  <div>
                     <Switch>
                        <Route exact path="/" >
                           <Homepage />
                        </Route>
                        <Route exact path="/cryptocurrencies" >
                           <Cryptocurrencies />
                        </Route>
                        <Route exact path="/crypto/:coinID" >
                           <CryptoDetails />
                        </Route>
                        <Route exact path="/exchanges" >
                           <Exchanges />
                        </Route>
                        <Route exact path="/news" >
                           <News />
                        </Route>
                     </Switch>
                  </div>
               </Layout>

               <div className='footer'>
                  <Typography.Title level={5} style={{ color: 'white', textAlign: 'Center' }}>
                     Cryptoverse <br/>
                     ©2021 Hemanth Mudra. All rights reserved.
                  </Typography.Title>
                  <Space>
                     <Link to='/'>Home</Link>
                     <Link to='/exchanges'>Exchanges</Link>
                     <Link to='/news'>News</Link>
                  </Space>
               </div>
            </div>
         </div>
   )
}

export default app
