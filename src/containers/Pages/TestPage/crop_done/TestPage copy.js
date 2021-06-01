import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./TestPage.css";
// import "./test1.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { useSpring, animated } from "react-spring";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export default function TestPage() {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState(null);
  const [modal, setModal] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const [maximizeStyle, setMaximizeStyle] = useState(null);
  const styles = useSpring({ opacity: modal ? 1 : 0,
                              width: modal ? 100 : 0 });
  console.log(watch());
  const imageChange = (event) => {
    const reader = new FileReader();
    event.preventDefault();
    const uploadedFile = event.target.files[0];
    // document.getElementById("image-input").reset()
    if (uploadedFile.name.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
      setModal(true);
      // event.
      // event.target.reset();
    } else {
      swal({
        title: "Oops...",
        text: "The selected file is not an image!",
        icon: "error",
      });
    }
    console.log(uploadedFile);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
    // let files;
    // if (event.dataTransfer) {
    //   files = event.dataTransfer.files;
    // } else if (event.target) {
    //   files = event.target.files;
    // }
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setImage(reader.result);
    // };
    // reader.readAsDataURL(files[0]);
  };
  const modalClose = (event) => {
    setModal(false);
    reset({ imageInput: null });
    // form.reset();
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      console.log(cropData);
    }
  };
  const maximize = (event) => {
    if (maximizeStyle === null) {
      setMaximizeStyle({
        transform: "translate({width : 100%})",

        // position: "fixed",
        // width: "100%",
        // height: "100%",
        // left: 0,
        // top: 0
      });
    } else {
      setMaximizeStyle(null);
    }
  };
  return (
    <div>
      <hr className='line' />

      <input {...register("imageInput")} onChange={imageChange} type='file' />
      {modal ? (
        <>
          <div className='backdrop' onClick={modalClose}></div>
          <div className='container'>
              <div className='modal' style={maximizeStyle}>
                <div className='panel'>
                  <h4 className='text-muted'>Profile photo</h4>
                  <section>
                    <div className='ball red'></div>
                    <div className='ball yellow' onClick={maximize}></div>
                  </section>
                </div>
                <Cropper
                className = 'cropper'
                  // style={{ marginTop: "55%", height: "60%", width: "100%" }}
                  zoomTo={0.5}
                  aspectRatio={1}
                  preview='.img-preview'
                  src={image}
                  viewMode={1}
                  guides={true}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                />
                <div>
                  <button style={{ float: "right" }} onClick={getCropData}>
                    Crop Image
                  </button>
                </div>
                <div className='box' style={{ width: "50%", float: "right" }}>
                  <h3>Preview</h3>
                  <div
                    className='img-preview'
                    style={{
                      position: "relative",
                      width: "100px",
                      float: "left",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
