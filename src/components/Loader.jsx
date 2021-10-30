import React from 'react';
import {Spin} from 'antd';

function Loader() {
   return (
      <div style={{height: '80vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
         <Spin />
      </div>
   )
}

export default Loader
