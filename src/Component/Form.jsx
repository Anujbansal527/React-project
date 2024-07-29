import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { GetPostCode, ValidatePan } from '../Api/Api';
import { addUser } from '../Store/Slice';
import { useDispatch, useSelector } from 'react-redux';

const Form = ({setAddData}) => {

  const [mobile, setMobile] = useState('');
  const [pan, setPan] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [postCode, setPostCode] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const [selectedcity, setSelectedCity] = useState('Select City');
  const [selectedstate, setSelectedState] = useState('Select State');

  const fulladdress = addressLine1 + addressLine2


  const dispatch = useDispatch()
  const data = useSelector((state) => state)

  const [loadPan, setloadPan] = useState(false)
  const [loadCode, setLoadCode] = useState(false);


  //if pan chnage then function
  const panChange = async (e) => {
    const pandetail = e.target.value;
    console.log(pandetail.toUpperCase())
    setPan(pandetail.toUpperCase())
    console.log(pan)
    //check for pan
    if (pandetail.length === 10) {
      setloadPan(true)
      const response = await ValidatePan(pandetail);
      console.log(response)

      //check for api calling
      if (response.statusCode === 200) {
        setloadPan(false)
        setFullName(response.fullName)
      }

      //validation
      //to do work adding gmail validation using regx
      if (response.isValid) {
        if (!pan || !fullName || !email || !fulladdress || !mobile || mobile.length !== 10 || !postCode || !selectedcity || !selectedstate) {
          return alert("Pan is verify. Now Fill All fields")
        }
      }
    }
  }

  //when post chnage fetching api
  const postCodeChange = async () => {
    //check for post code legth
    if (postCode.length === 6) {
      setLoadCode(true)
      const resp = await GetPostCode(postCode)
      //if resp then do work
      if (resp.statusCode === 200) {
        console.log(resp)
        setLoadCode(false)
        console.log(resp.postcode == postCode)

        //updating data of city and state
        if (resp.postcode == postCode) {
          setCity(resp.city[0])
          setState(resp.state[0])
          setSelectedCity(resp.city[0].name)
          setSelectedState(resp.state[0].name)
        }
      }
    }
  }

  useEffect(() => {
    postCodeChange()
  }, [postCode])


  //on submit form
  const submitForm = (e) => {
    e.preventDefault()
    //check if data fetched
    if (data.length >= 10) {
      return alert("Data Reach Its Limit")
    }
    //check is pan already availavable 
    else if(data.find(d => d.pan === pan)){
      setPan('')
      return alert("Pan Details Already Present")
    }
    //check for vlidatiion
    else if (!pan || !fullName || !email || !fulladdress || !mobile || mobile.length !== 10 || !postCode || !selectedcity || !selectedstate) {
      return alert("Please fill all the required fields and mobile number is 10 digits.")
    } else {
      console.log(data)
      //updating data for state
      dispatch(addUser({ pan, fullName, email, fulladdress, mobile, postCode, selectedcity, selectedstate }))
      alert("data submitted")
      setMobile('');
      setPan('');
      setFullName('');
      setEmail('');
      setPostCode('');
      setAddressLine1('');
      setAddressLine2('');
      setCity([]);
      setState([]);
      setSelectedCity('Select City');
      setSelectedState('Select State');
      setAddData(false)
    }
    
  }

  return (
    <div className='flex w-full justify-center items-center p-6'>
      <div className=' h-auto w-full border hover:scale-105 max-w-auto flex rounded-lg p-6 bg-white justify-center'>
        <form className='space-6' onSubmit={submitForm}>
          <div className="flex flex-col gap-2">

            <div className='grid grid-cols-2 gap-4'>
              <label htmlFor="pan" className={`mr-2 flex justify-center`} >Pan Details :</label>
              <div className='flex w-full'>
                <input placeholder='Enter PAN Number' maxLength={10} type='text' id="pan" value={pan} disabled={pan.length === 10} onChange={panChange} className={`${pan.length === 10 ? "  border-green-500" : "border"} border rounded-md w-full p-2 required`} required />
                <span className='ml-3'> {loadPan ? <Loader /> : ""} </span>
              </div>
            </div>

            <div className="grid grid-col-2 m-2 gap-4">

              <div className='flex flex-row gap-4'>

              <input placeholder='Enter Full Name' maxLength={140} type='text' id="fullName" value={fullName} onChange={(e) => { setFullName(e.target.value) }} className={`border rounded-md w-full p-2 required ${fullName.length === 0 ? "border border-red-500" : "border border-green-500"}`} required />

              <input placeholder='Enter Gmail in Correct Formate' maxLength={255} type='email' id="email" value={email} onChange={(e) => { setEmail(e.target.value); }} className={`border rounded-md w-full p-2 required ${email.length === 0 ? "border border-red-500" : "border border-green-500"}`} required />

              <div className="flex w-full ">
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

             </div>              
              <div className='grid grid-cols-2 gap-4 ml-0 m-3 items-center'>
              <label className={`mr-2 flex justify-center`}>Address :</label>
              <div className={`${addressLine1.length === 0 ? "border border-red-500" : "border border-green-500"} flex grid-row-2 gap-2 rounded-md w-full p-2 required`}>
                <input type='text' placeholder='Line 1' value={addressLine1} onChange={(e) => { setAddressLine1(e.target.value) }} className="w-full border rounded-md p-2" />
                <input type='text' placeholder='Line 2' value={addressLine2} onChange={(e) => { setAddressLine2(e.target.value) }} className="w-full border rounded-md p-2" />
              </div>
            </div>

              <div className='flex flex-row m-2 gap-4'>
                 
              <div className='flex w-1/2'>
                <input placeholder='Enter 6 Digit PostCode' value={postCode} onChange={(e) => { const value = e.target.value; (!isNaN(value) && value.length <= 6) ? setPostCode(value) : ""; }} type='text' id="postcode" className={`${postCode.length === 6 ? "border-green-500 outline outline-green-500" : "border border-red-500"} rounded-md w-full p-2 `} required />
                {loadCode ? <Loader /> : ""}
              </div>

              <select id="city" value={selectedcity} onChange={(e) => { setSelectedCity(!selectedcity ? e.target.value : city.name) }} className={`${city.length === 10 ? "border border-red-500" : "border border-green-500"} border rounded-md w-full p-2 required w-1/3`} >

                {
                  city && city.length > 0 ? city.map((data, index) => (
                    <option key={index} value={data.name}>{data.name}</option>
                  ))
                    : <option value={selectedcity}>{selectedcity}</option>
                }
              </select>

              <select id="state" value={selectedstate} onChange={(e) => { setSelectedState(!selectedstate ? e.target.value : state.name) }} className={`${state.length === 0 ? "border border-red-500" : "border border-green-500"} border rounded-md w-full p-2 required w-1/3`} >

                {
                  state && state.length > 0 ? state.map((data, index) => (
                    <option key={index} value={data.name}>{data.name}</option>
                  ))
                    : <option value={selectedstate}>{selectedstate}</option>
                }
              </select>
              
              </div>


            </div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form;
