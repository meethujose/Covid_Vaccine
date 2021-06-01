import React, { useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

export default function ImageCropper(props) {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();

  const onChange = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const uploadedFile = e.target.files[0];
    if (uploadedFile.name.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
      showModal();
    } else {
      swal({
        title: "Oops...",
        text: "The selected file is not an image!",
        icon: "error",
      });
    }
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    reset({ imageInput: null })
    setIsModalVisible(false);
    getCropData();
  };

  const handleCancel = () => {
    reset({ imageInput: null })
    setIsModalVisible(false);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  useEffect(()=>{
    props.setCropppedImage(cropData)
  },[cropData])
  return (
    <div>
      <div style={{ width: "100%" }}>
      <input className="form-control form-control-sm" id="customFile" {...register("imageInput")} onChange={onChange} type='file' />

        <Modal
          title='Crop the Profile Picture'
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Cropper
            style={{ height: 380, width: "100%" }}
            zoomTo={1}
            initialAspectRatio={1}
            preview='.img-preview'
            src={image}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} 
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <br />
          <p>Scroll for zooming in and out...</p>
        </Modal>
      </div>
    </div>
  );
}