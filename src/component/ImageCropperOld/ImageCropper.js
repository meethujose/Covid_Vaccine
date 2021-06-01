import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./ImageCropper.css";
// import "./test1.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import { Popover } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import profileImage, {updateImage} from '../../store/profileImage'

export default function ImageCropper(props) {
  const dispatch = useDispatch()
  const [width, setWidth] = useState(window.innerWidth);
  const [widthModal, setWidthModal] = useState(
    window.innerWidth > 600 ? window.innerWidth * 0.4 : window.innerWidth * 0.8
  );
  const [croppedImage, setCroppedImage] = useState(null)
  const [heightModal, setHeightModal] = useState(window.innerHeight * 0.35);
  const width1 = window.innerWidth;
  const height1 = window.innerHeight;
  const [toggle, setToggle] = useState(false);
  const [mountCropper, setMountCropper] = useState(false);
  const styles = useSpring({
    // to: { position: "relative", opacity: 1, width: width, height: height },
    // from: { position: "relative", opacity: 0, width: "0%" },
    opacity: toggle ? 1 : 0,
    width: toggle ? width : 0,
    height: toggle ? height1 : 0,
    delay: 50,
    reset: true,
    // reverse: toggle,
    config: { tension: 600, friction: 15 },
    // onStart : () => { setMountCropper(false); },
    // onRest : () => {setTimeout(function(){ setMountCropper(true); }, 3000);},
  });
  // const toggleClick = () => {
  //   setToggle(toggle ? false : true);
  // };
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState(null);
  const [modal, setModal] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  let tempWidth = 0;
  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    // window.addEventListener("resize", () => {
    //   tempWidth = window.innerWidth;
    //   tempWidth > 600 ? setWidthModal(window.innerWidth * 0.4) : setWidthModal(window.innerWidth * 0.8)
    // });

    window.addEventListener("resize", () =>
      setHeightModal(window.innerWidth > 600 ?  window.innerWidth * 0.4 : window.innerWidth * 0.8)
    );
    window.addEventListener("resize", () =>
      setHeightModal(window.innerHeight * 0.35)
    );
    setCropData(cropData)

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);
  useEffect (() => {
    dispatch(updateImage(cropData))
    console.log('effect in cropper dispatched', cropData)


  },[cropData])

  const imageChange = (event) => {
    setToggle(true);
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
    // e}
    // const reader = new FileReader();
    // readr.onload = () => {
    //   setImage(reader.result);
    // };
    // reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      // console.log(cropData);
      // dispatch(updateImage(cropData))
      setCroppedImage(cropData)
      closeModal()
      return cropData
    }
  };

  const closeModal = () => {
    reset({ imageInput: null })
    setToggle(false);
  };

  const openModal = () => {
    // props.cropimage()
    setToggle(true);
  };
  const multipleFunctions = () => {
    getCropData()
    console.log('from the cropping part', cropData)
    // dispatch(updateImage(getCropData()))
    props.setImage(cropData)

  }
  return (
    <div>
      {/* <button onClick={openModal}>Click </button> */}

      <div style={{ overflow: "hidden" }}>
        <animated.div style={styles}>
      {toggle ? <div className='backdrop' onClick={closeModal}></div> : null}

          <div className='container'>
            <div className='modal' style={{ height: heightModal * 2 }}>
              <div className='panel'>
                <div className='model-heading'>Profile photo</div>
                <section className='balls'>
                <Popover content="Close">
                  <div className='ball red' onClick={closeModal}>

                  </div>
                  </Popover>
                </section>
              </div>
              <div className='cropper-container'>
                <Cropper
                  style={{ minWidth: widthModal, minHeight: heightModal }}
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
              </div>
              <div>
                <div className="button-container">
                <button className = 'btn btn-success' style = {{margin:"auto"}} onClick={multipleFunctions}>
                  Crop Image
                </button>
                </div>
              </div>
              {/* <div className='box' style={{ width: "50%", float: "right" }}>
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
                  </div> */}
            </div>
          </div>
        </animated.div>
      </div>
      <input class="form-control" style = {{position:'absolute'}} id="customFile" {...register("imageInput")} onChange={imageChange} type='file' />

    </div>
  );
}
