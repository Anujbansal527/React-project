import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./Form";
import EditForm from "./EditForm";
import { deleteUser } from "../Store/Slice";

const CoustomerList = () => {
  const [edit, setEdit] = useState(false);
  const [addData, setAddData] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const data = useSelector((state) => state);

  const dispatch = useDispatch();

  //delete data
  const deleteData = (pan) => {
    dispatch(deleteUser(pan));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center p-4 rounded ">        
        <div className="flex  justify-between items-center w-full  p-6 bg-white rounded shadow-[50%] ">
          <h1 className="text-4xl text-center font-bold ">Form</h1>
          <button
            onClick={() => setAddData((prevState) => !prevState)}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  px-4 rounded"
          >
            Add
          </button>
        </div>

        {addData ? <Form setAddData={setAddData} /> : ""}
        <div className="w-full h-auto mt-4 flex bg-white rounded-lg shadow-[50%] justify-center overflow-auto mt-2 ">
          {data ? (
            <>
              <div className="grid grid-cols-1 gap-4 border  p-4 w-full">
                <div className="grid grid-cols-7 gap-2 font-bol w-full h-auto rounded-lg">
                  <div className="flex justify-center font-bold border rounded bg-[grey]">
                    S no.
                  </div>
                  <div className="flex justify-center font-bold border rounded bg-[grey]">
                    PAN
                  </div>
                  <div className="flex justify-center font-bold border rounded bg-[grey]">
                    Full Name
                  </div>
                  <div className="flex justify-center font-bold border rounded bg-[grey]">
                    Email
                  </div>
                  <div className="flex justify-center font-bold border rounded bg-[grey]">
                    Mobile
                  </div>
                  <div className="flex justify-center font-bold border rounded bg-[grey]">
                    Address
                  </div>
                  <div className="flex justify-center font-bold border bg-[grey]">
                    Actions
                  </div>
                </div>
                {data
                  ? data.map((d, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-7  border p-2 m-1 gap-2 bg-white rounded items-center justify-center"
                      >
                        <div className="text-center break-words">{i + 1}</div>
                        <div className="text-center break-words">{d.pan}</div>
                        <div className="text-center break-words">
                          {d.fullName}
                        </div>
                        <div className="text-center break-words">{d.email}</div>
                        <div className="text-center break-words">
                          {`+91 ${d.mobile}`}
                        </div>
                        <div className="text-center break-words">
                          {`${d.fulladdress}, `}
                          {`${d.selectedcity}, `}
                          {`${d.selectedstate}, `}
                          {`${d.postCode}`}
                        </div>
                        <div className="flex justify-center gap-2">
                          <button
                            className="bg-blue-500 hover:bg-white hover:text-blue-500 hover:outline hover:outilne-blue-100 text-white font-bold p-2  rounded"
                            onClick={() => {
                              setEdit(!edit);
                              setSelectedIndex(i);
                            }}
                          >
                            {edit ? "Close" : "Edit"}
                          </button>
                          <button
                            className="bg-red-500 hover:bg-white hover:text-red-500 hover:outline hover:outilne-red-100 text-white font-bold p-2  rounded"
                            onClick={() => deleteData(d.pan)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        {edit ? (
          <EditForm
            className="absolute top-0 bg-white"
            setedit={setEdit}
            pan={data[selectedIndex].pan}
            name={data[selectedIndex].fullName}
            mail={data[selectedIndex].email}
            number={data[selectedIndex].mobile}
            address={data[selectedIndex].fulladdress}
            city={data[selectedIndex].selectedcity}
            state={data[selectedIndex].selectedstate}
            postcode={data[selectedIndex].postCode}
          />
        ) : (
          ""
        )}
    </div>
  );
};

export default CoustomerList;
