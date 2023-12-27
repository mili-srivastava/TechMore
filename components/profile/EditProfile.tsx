"use client"

import Image from "next/image"
import React, { useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";


const EditProfile = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="mt-20">
      <Image src="/user.png" width={500} height={500} alt="profile" className="h-36 w-36 rounded-full object-cover mx-auto" 
      onClick={() => setShowModal(true)}/>
      <div className="w-full md:px-10 grid gap-5 px-8 md:pl-28 ">
        <div className="grid gap-2 ">
          <label className="text-xl font-bold"> Name</label>

          <input
            type="text"
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-3"
            defaultValue="name"
            name="title"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xl font-bold">Username</label>
          <input
            className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-3 "
            defaultValue="username"
            name="description"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xl font-bold">Bio</label>
          <textarea
            className="h-28 shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md px-3 py-3 "
            defaultValue="bio"
            name="description"
            
          />
        </div>
      </div>
      <div className="mx-auto w-fit py-10">
        <button className="bg-green-500 text-white rounded-md px-5 py-2">Save Changes</button>
        <button className="bg-red-500 text-white rounded-md px-10 py-2 mx-5">Discard</button>
      </div>
      <div>
      

     <div>
       {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal} className="mt-60 px-10 md:pl-28 w-full flex justify-center ">
        <TEModalDialog className="w-[50vw]">
          <TEModalContent>
            <TEModalHeader>
              
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="black"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <button>View Profile Picture</button>
              <button>Edit Profile Picture </button>
              <button>Delete Profile Picture</button>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out "
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out "
                >
                  Save changes
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
      
     </div>
    </div>
    </div>
  )
}

export default EditProfile