import React, { useEffect, useState } from "react";
import { GetPostCode } from "../Api/Api";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../Store/Slice";
const EditForm = ({
  pan,
  name,
  mail,
  number,
  address,
  city,
  state,
  postcode,
  setedit,
}) => {
  const [mobile, setMobile] = useState(number);
  const [fullName, setFullName] = useState(name);
  const [email, setEmail] = useState(mail);
  const [postCode, setPostCode] = useState(postcode);

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");

  const [fulladdress, setFullAddress] = useState(address || "");

  const [newCity, setCity] = useState([]);
  const [newState, setState] = useState([]);

  const [selectedcity, setSelectedCity] = useState(city);
  const [selectedstate, setSelectedState] = useState(state);

  const [loadCode, setLoadCode] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  //fetchingapi when code change
  const postCodeChange = async () => {
    if (postCode.length === 6) {
      setLoadCode(true);
      const resp = await GetPostCode(postCode);
      if (resp.statusCode === 200) {
        console.log(resp);
        setLoadCode(false);
        console.log(resp.postcode == postCode);
        if (resp.postcode == postCode) {
          setAddressLine1(fulladdress);
          setCity(resp.city[0]);
          setState(resp.state[0]);
          setSelectedCity(resp.city[0]?.name || "");
          setSelectedState(resp.state[0]?.name || "");
        }
      }
    }
  };

  useEffect(() => {
    postCodeChange();
  }, [postCode]);


  //function for updating data 
  const updateForm = (e) => {

    e.preventDefault();
    //checks
    if (
      !fullName ||
      !email ||
      !fulladdress ||
      !mobile ||
      mobile.length !== 10 ||
      !postCode ||
      !selectedcity ||
      !selectedstate
    ) 
    {
      return alert(
        "Please fill all the required fields and mobile number is 10 digits."
      );
    } else {
      setFullAddress(addressLine1 + " " + addressLine2);
      dispatch(
        editUser({
          pan,
          fullName,
          email,
          fulladdress,
          mobile,
          postCode,
          selectedcity,
          selectedstate,
        })
      );
      alert("Updated");
      setedit(false);
    //empty the data of updating
      setMobile("");
      setPan("");
      setFullName("");
      setEmail("");
      setPostCode("");
      setAddressLine1("");
      setAddressLine2("");
      setCity([]);
      setState([]);
      setSelectedCity("Select City");
      setSelectedState("Select State");
    }
  };

  return (
    <div className="flex m-5 justify-center items-center">
      <div className=" border-1-black max-w-full w-full shadow-[50%] bg-white rounded flex p-3 gap-2 ">
        <form className="flex flex-col gap-4  p-4" onSubmit={updateForm}>
          <div className="flex justify-center w-full">
            <label
              htmlFor="pan"
              className="border border text-center  rounded-md w-full p-2 required "
            >
              <h1 className="text-2xl">Update Pan Number : <span className="text-green-500 text-2xl">{pan}</span></h1>
            </label>
          </div>

          <div className="grid grid-col-2 m-2 gap-4">
            <div className="flex m-2 gap-4">
              <div className="flex w-full md:w-1/2">
                <input
                  placeholder="Enter Full Name"
                  maxLength={140}
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  className={`border rounded-md w-full p-2 h-12 required ${
                    fullName.length === 0
                      ? "outline outline-red-500"
                      : "outline outline-green-500"
                  }`}
                  required
                />
              </div>

              <div className="flex w-full md:w-1/2">
                <input
                  placeholder="Enter Gmail in Correct Format"
                  maxLength={255}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className={`border rounded-md w-full p-2 h-12 required ${
                    email.length === 0
                      ? "outline outline-red-500"
                      : "outline outline-green-500"
                  }`}
                  required
                />
              </div>

              <div className="flex w-full md:w-1/2">
                <div
                  className={`border rounded-md w-full p-2 h-12 required flex justify-center items-center ${
                    mobile.length !== 10
                      ? "border border-red-500"
                      : "border border-green-500"
                  }`}
                >
                  <span className="mr-2">+91</span>
                  <input
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    type="text"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => { const value = e.target.value; (!isNaN(value) && value.length <= 10) ? setMobile(value) : ""; }}
                    className={`${
                      mobile.length === 10
                        ? "border-green-500 "
                        : "border"
                    } rounded-md w-full p-2 h-10 required`}
                    required
                  />
                </div>
              </div>

              <div className="flex w-full md:w-1/2">
                <input
                  placeholder="Enter Address Line 1"
                  maxLength={255}
                  type="text"
                  id="addressLine1"
                  value={addressLine1}
                  onChange={(e) => {
                    setAddressLine1(e.target.value);
                  }}
                  className={`border rounded-md w-full p-2 h-12 required ${
                    addressLine1.length === 0
                      ? "outline outline-red-500"
                      : "outline outline-green-500"
                  }`}
                  required
                />
              </div>
            </div>

            <div className="flex m-2 gap-4">
              <div className="flex w-full md:w-1/2">
                <input
                  placeholder="Enter Address Line 2"
                  maxLength={255}
                  type="text"
                  id="addressLine2"
                  value={addressLine2}
                  onChange={(e) => {
                    setAddressLine2(e.target.value);
                  }}
                  className={`border rounded-md w-full p-2 h-12 required ${
                    addressLine2.length === 0
                      ? "outline outline-red-500"
                      : "outline outline-green-500"
                  }`}
                />
              </div>

              <div className="flex w-full md:w-1/2">
                <input
                  placeholder="Enter Post Code"
                  maxLength={6}
                  type="text"
                  id="postCode"
                  value={postCode}
                  onChange={(e) => {
                    setPostCode(e.target.value);
                  }}
                  className={`border rounded-md w-full p-2 h-12 required ${
                    postCode.length === 0
                      ? "outline outline-red-500"
                      : "outline outline-green-500"
                  }`}
                  required
                />
                {loadCode ? <Loader /> : ""}
              </div>

              <div className="flex w-full md:w-1/2">
                <select
                  id="city"
                  value={selectedcity}
                  onChange={(e) => {
                    setSelectedCity(
                      !selectedcity ? e.target.value : newCity.name
                    );
                  }}
                  className={`${
                    newCity.length === 10
                      ? "border border-red-500"
                      : "border border-green-500"
                  } border rounded-md w-full p-2 h-12 required`}
                >
                  {newCity && newCity.length > 0 ? (
                    newCity.map((data, index) => (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    ))
                  ) : (
                    <option value={selectedcity}>{selectedcity}</option>
                  )}
                </select>
              </div>

              <div className="flex w-full md:w-1/2">
                <select
                  id="state"
                  value={selectedstate}
                  onChange={(e) => {
                    setSelectedState(
                      !selectedstate ? e.target.value : newState.name
                    );
                  }}
                  className={`${
                    newState.length === 0
                      ? "border border-red-500"
                      : "border border-green-500"
                  } border rounded-md w-full p-2 h-12 required`}
                >
                  {newState && newState.length > 0 ? (
                    newState.map((data, index) => (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    ))
                  ) : (
                    <option value={selectedstate}>{selectedstate}</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-white hover:text-green-500 hover:outline hover:outilne-green-100 text-white font-bold p-2  rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
