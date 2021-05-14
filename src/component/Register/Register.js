import React, { useState, useCallback, useRef, useEffect } from "react";
import "./Register.css";
import db, { storage } from "../../Data/FirebaseConfig";
import user from "../Images/user.png";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Model from "../UI/Modal/Modal";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { empAddUpdateAction } from "../../store/empAddUpdate";
import axiosInstance from "../../axios";
//Image Crop
function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.download = "cropPreview.png";
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    "image/png",
    1
  );
}
export default function Register({ setShowModal }) {
  const imageRef = React.useRef();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [EidField, setEidField] = useState("");
  const [error, setError] = useState("");
  const [upImg, setUpImg] = useState();
  const [imgUrl, setimgUrl] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [selected, setSelected] = useState(false);
  const [profileImage, setProfileImage] = useState(user);
  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    console.log("clicked");
    var image = imageRef.current.files[0];
    if (image) {
      var storageRef = storage.ref().child(`images/${formData.EmiratesId}`);
      storageRef.put(image).then((snapshot) => {
        snapshot.ref.getDownloadURL().then(async (url) => {
          console.log(url);
          setimgUrl(url)
        });
        // console.log('Uploaded a blob or file!');
      });
    } else {
      const url =
        "https://firebasestorage.googleapis.com/v0/b/vaccine-9e17d.appspot.com/o/images%2FaddEmployee.png?alt=media&token=ac8c7ac6-773d-44ff-afa0-1aa76ea1d3d7";
        setimgUrl(url)
      }
    axiosInstance
      .post("api/empcreate/", {
        name: formData.username,
        emiratesID: formData.EmiratesId,
        avatarURL: {imgUrl},
      })
      .then(function (response) {
        dispatch(empAddUpdateAction.added());
        console.log(response);
        formData.username = "";
        formData.PhoneNumber = "";
        formData.EmiratesId = "";
        setShowModal(false);
      });

    //     }
    //   );
    // } else {
    //   setError("Image not selected");
    // }
  };
  const EidChangeHandler = (event) => {
    const Eid = event.target.value;
    if (Eid.length < 19) {
      let tempValue = "";
      for (let x in Eid) {
        if (Eid.charAt(x).match(/^[0-9]+$/)) {
          tempValue += Eid.charAt(x);
        }
      }
      let finalValue = "";
      for (let x in tempValue) {
        if (x == 3 || x == 7 || x == 14) {
          finalValue += "-";
          finalValue += tempValue.charAt(x);
        } else {
          finalValue += tempValue.charAt(x);
        }
      }
      setEidField(finalValue);
    }
  };
  //image Crop
  const onSelectFile = (e) => {
    console.log(imageRef.current.files[0]);
    setProfileImage( URL.createObjectURL(e.target.files[0]));
    const supportedFormat = ["jpeg", "jpg", "png"];

    // if (supportedFormat.includes(e.target.files[0].type.split("/")[1])) {
    //   if (e.target.files && e.target.files.length > 0) {
    //     setProfileImage();
    //     setSelected(true);
    //     const reader = new FileReader();
    //     reader.addEventListener("load", () => setUpImg(reader.result));
    //     reader.readAsDataURL(e.target.files[0]);
    //   }
    // } else {
    //   alert("invalid file format,supported format's jpeg, jpg, png");
    // }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  return (
    <div className='register'>
      <label>
        <input
          type='file'
          id='file'
          name='image'
          required
          ref={imageRef}
          onChange={onSelectFile}></input>
        <img src={profileImage} className='imgFile' alt='img' />
      </label>
      <p className='error'>{error}</p>
      {selected ? (
        <>
          <div className='Crop'>
            <ReactCrop
              className='fileimage'
              style={{ width: "100%", height: "90%" }}
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            />
          </div>
          <button
            className='btn btn-primary'
            onClick={() => setSelected(false)}>
            Crop
          </button>
        </>
      ) : (
        <form className='addform' onSubmit={submitData}>
          <div className='form_box'>
            <label>Name</label>
            <input
              type='text'
              placeholder='Name'
              name='username'
              required
              className='inputField'
              onChange={handleChange}
            />
          </div>
          <div className='form_box'>
            <label>Mob Number</label>
            <input
              type='text'
              placeholder='Phone Number'
              name='PhoneNumber'
              required
              className='inputField'
              onChange={handleChange}
            />
          </div>
          <div className='form_box'>
            <label>Emirates Id</label>
            <input
              type='text'
              placeholder='Emirates Id'
              name='EmiratesId'
              required
              className='inputField'
              onChange={(e) => {
                EidChangeHandler(e);
                handleChange(e);
              }}
              value={EidField}
            />
          </div>

          <input type='submit' className=' regButton' value='Submit' />
        </form>
      )}
    </div>
  );
}
