import { Modal, Button, Typography, Result, Card } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import Loader from './Loader';
import Lottie from 'react-lottie-player';
import loadingAnimation from "../assets/loadingAnimation.json";

const { Text, Title } = Typography;

const NewsModal = ({ isModalOpen, title, onCancel, url , body}) => {
   const [isLoading, setIsLoading] = useState(false)
   const [isIframeError, setIsIframeError] = useState(false)

   const getData = async () => {
      setIsLoading(true)
      fetch(url, {
         mode: 'no-cors',
         headers: {
           'Access-Control-Allow-Origin':'*'
         }
       })
         .then((response) => {
            if (response.status >= 200 && response.status < 300) {
               setIsIframeError(false)
               const iframe = document.getElementById('newsIframe')
               iframe.src = url
            }
         })
         .catch((error) => {
            setIsIframeError(true)
         })
         .finally(setIsLoading(false))
   }

   useEffect(() => {
      if (!url) return
      getData()
   }, [url])

   return (
      <Modal destroyOnClose centered footer={null} width={1300} title={title} visible={isModalOpen} onCancel={onCancel}>
         {isLoading && (
            <div style={{ height: '70vh' }}>
               <Lottie
                  style={{ height: "100%", width: "100%" }}
                  animationData={loadingAnimation}
                  play
                  loop
                  speed={2}
               />
            </div>
         )}
         {!isIframeError ? (
            <div style={{ height: '70vh', width: '100%', display: isLoading ? 'none' : 'block' }}>
               <iframe id='newsIframe' noborder="0" seamless height='100%' width='100%'></iframe>
            </div>
         ) : (
            <>
            <Card>
            <p>{body}</p>
            </Card>
            <Result
               status="warning"
               title="This link can't be viewed. Click the button below to open in new tab."
               extra={
                  <a href={url} target="_blank" rel="noreferrer">
                 
                  <Button type="primary" key="console">
                     Open Extenal Link
                  </Button>
                  </a>
               }
            />
            </>
         )}
      </Modal>
   )
}

export default NewsModal