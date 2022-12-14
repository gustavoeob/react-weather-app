import React from 'react'
import "./background.scss"
const Background = ({ data }) => {
  
  return (
    <div className="background">
      <video className="bg-video" src={`assets/backgrounds/${data.weather[0].icon}.mp4`} alt="weather background" autoPlay={true} loop ></video>
    </div>
  )
}

export default Background