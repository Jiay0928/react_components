import React from 'react'
import './dragDropComponent.css';
import { useEffect,useState } from 'react';
export default function DragDropComponent() {
  const [innerText, setInnerText] = useState("+")

  let handleEvent = (event) => {
    event.stopPropagation();
    event.preventDefault()
    let files = event.dataTransfer.files;
    setInnerText(files[0].name)
  }

  useEffect(() => {
    let dropTarget = document.getElementById("dropTarget")
    dropTarget.addEventListener("drop", handleEvent)
    // chrome need dragover for drop to work
    dropTarget.addEventListener("dragover", (e)=>e.preventDefault())
    return () => {
      dropTarget.removeEventListener("drop",handleEvent)
    }
  }, [])
  
  return (
    <>
    <div className="wrapper" id="dropTarget">{innerText}</div>
    </>
  )
}
