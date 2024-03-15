import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";


export default function UpdateWareHo() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const {houseId} = useParams();
  console.log(formData);

  
  const navigate = useNavigate();

//get warehouse using id 
  useEffect(() => {
    try {
      const fetchouse = async () => {
        const res = await fetch(
          `/api/warehouse/gethouse?WareHouseId=${houseId}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedhouse = data.house.find(
            (hous) => hous._id === houseId
          );
          if (selectedhouse) {
            setFormData(selectedhouse);
          }
        }
      };
      fetchouse();
    } catch (error) {
      console.log(error.message);
    }
  }, [houseId]);
 
  
        
       
       






  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };


  //updatewareHouse
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/warehouse/updatehouse/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create New Warehouse 
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            className=" flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
            type="text"
            placeholder="Ware House Name"
            required
            id="Hname"
            onChange={(e) => setFormData({ ...formData, Hname: e.target.value })}
            value={formData.Hname}
          />
          <input
            type="text"
            placeholder="Ware House Locaton"
            required
            id="Hlocation"
            className="flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
            onChange={(e) => setFormData({ ...formData, Hlocation: e.target.value })}
            value={formData.Hlocation}
          />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 bg-white rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            className=" w-40 h-10 rounded-lg bg-blue-500 text-white hover:opacity-90"
            size="sm"
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
        {imageUploadError && (
          <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
            {imageUploadError}
          </p>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Contact"
            required
            id="Hcontact"
            className="flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
            onChange={(e) => setFormData({ ...formData, Hcontact: e.target.value })}
            value={formData.Hcontact}
          />

          
        </div>

        <button
          type="submit"
          className=" bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90 lg:w-full"
        >
          Update WareHouse
        </button>
        {publishError && (
          <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
            {publishError}
          </p>
        )}
      </form>
    </div>
  );
}
