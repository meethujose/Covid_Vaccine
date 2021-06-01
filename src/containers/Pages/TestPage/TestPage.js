import React, {useState} from 'react'
import ImageCropper from '../../../component/ImageCropper/ImageCropper'

export default function TestPage() {
  const [cropppedImage, setCropppedImage] = useState(null)
  return (
    <div>
      <h1>Halo</h1>
      <ImageCropper setCropppedImage = {setCropppedImage}/>
      <img src={cropppedImage} alt="" />
    </div>
  )
}
