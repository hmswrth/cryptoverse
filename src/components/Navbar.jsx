import React, { useState, useEffect } from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../assets/cryptocurrency.png';

function Navbar() {
   // const logo = './assets/cryptocurrency.png'
   const [activeMenu, setActiveMenu] = useState(true);
   const [screenSize, setScreenSize] = useState(null);

   useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);

   }, []);

   useEffect(() => {
      if (screenSize < 800) {
         setActiveMenu(false);
      }
      else {
         setActiveMenu(true);
      }
   }, [screenSize])

   const handleNavBarToggle = () => {
      if(screenSize < 800) setActiveMenu(!activeMenu);
   }

   return (
      <div className='nav-container'>
         <div className='logo-container'>
            <Avatar src={logo} size='large' />
            <Typography.Title level={2} className='logo'>
               <Link to='/'>cryptoverse</Link>
            </Typography.Title>
            {/* include a button class here */}
            <Button className='menu-control-container' onClick = {() => handleNavBarToggle()}>
               <MenuOutlined />
            </Button>
         </div>
         {activeMenu && (
            <Menu theme='dark'>
               <Menu.Item icon={<HomeOutlined />} key='home' onClick = {() => handleNavBarToggle()}>
                  <Link to='/'>home</Link>
               </Menu.Item>
               <Menu.Item icon={<FundOutlined />} key='cryptocurrencies' onClick = {() => handleNavBarToggle()}>
                  <Link to='/cryptocurrencies'>cryptocurrrencies</Link>
               </Menu.Item>
               <Menu.Item icon={<MoneyCollectOutlined />} key='exchanges' onClick = {() => handleNavBarToggle()}>
                  <Link to='/exchanges'>exchanges</Link>
               </Menu.Item>
               <Menu.Item icon={<BulbOutlined />} key='news' onClick = {() => handleNavBarToggle()}>
                  <Link to='/news'>news</Link>
               </Menu.Item>
            </Menu>
         )}
      </div>
   )
}

export default Navbar
