import React, { useState, useEffect } from "react";

export default function LazyLoading({ imgList, loadingInterval}) {
  const [urlList, setUrlList] = useState(imgList.slice(0,loadingInterval))
  let scrollHandler = (e) => {
      if (urlList.length === imgList.length){
          return
      }
      if (window.scrollY > document.documentElement.clientHeight){
          const newList = imgList.slice(0,urlList.length + loadingInterval)
          setUrlList([...newList])
      }

  }
  let throttle = (fn, ms, context) => {
      let lastEventTimeStamp = null;
      return function (...args) {
          const self = context || this;
          const now = Date.now();
          if (!lastEventTimeStamp || now - lastEventTimeStamp >= ms){
              lastEventTimeStamp = now
              fn.apply(self,args)
          }

      }

  }
  let scrollWithThrottle = () => {
      throttle(scrollHandler,250,this )
  }
  useEffect(() => {
    window.addEventListener("scroll",scrollHandler)

    return () => {
      window.removeEventListener("scroll", scrollHandler)

    }
  }, [urlList])
  
  

  return (
    <div>
      {urlList.map((ImgUrl, index) => {
        return (
          <img
            src={ImgUrl}
            alt="random img for lazy loading"
            key={index}
          />
        );
      })}
    </div>
  );
}
