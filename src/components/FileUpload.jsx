import React from "react";
import "../css/file_upload.css";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const result = await axios.post(
      "http://localhost:4000/userAuth/upload",
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );

    const uploadedImage = await axios.get(
      "http://localhost:4000/userAuth/getFile",
      {
        headers: {
          "content-type": "multipart/form-data",
        },
        // responseType: "blob",
      }
    );

    console.log(uploadedImage);
    // var image = Buffer.from(uploadedImage.data, "binary").toString("base64");
    // console.log("onClick -> image", image);

    setUploadedFile(uploadedImage.data.img);
    console.log(uploadedImage.data.img);

    // const urlCreator = window.URL || window.webkitURL;
    // const url = urlCreator.createObjectURL(uploadedImage);
    // const mediaStream = new MediaStream(uploadedImage.data);
    // console.log("onClick -> mediaStream", mediaStream);

    // setUploadedFile(uploadedImage.data);

    console.log(result);
  };

  return (
    <React.Fragment>
      <div className="mainWrapperFileUploader">
        <h4>
          <i class="fab fa-react react-logo"></i> React File Upload
        </h4>
        <div className="fileUploadSection">
          {/* <input type="text" value="Choose File" className="fileNameSection" /> */}
          <p className="fileNameSection">{fileName}</p>
          <input
            type="file"
            className="fileUploadCta"
            id="customFile"
            onChange={onChange}
          />
          <label htmlFor="customFile" className="browseCta">
            Browse
          </label>
        </div>
        <button className="sendCta" onClick={onClick}>
          Upload
        </button>
        <img src="http://localhost:4000/userauth/getFile"></img>
        {uploadedFile ? (
          <img src={`data:image/png;base64, ${uploadedFile}`} />
        ) : null}
        {/* {uploadedFile ? <img src = "http://localhost:4000/userauth/getFile"></img>} */}
      </div>
    </React.Fragment>
  );
};

export default FileUpload;
