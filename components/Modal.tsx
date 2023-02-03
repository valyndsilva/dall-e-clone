import { XMarkIcon } from "@heroicons/react/24/outline";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
interface Props {
  session: Session;
}
function Modal({session}: Props) {
  const { showModal, setShowModal } = useContext(ModalContext);
  return (
    <>
      {showModal ? (
        <>
          <div className="modal flex md:flex-col justify-center items-center fixed left-0 top-0 w-full h-full bg-black/50  transition-all duration-500 overflow-auto ease-linear z-50">
            <div className="relative text-white grid grid-cols-1 md:grid-cols-2 bg-black gap-3 mx-auto max-w-screen-lg rounded-md overflow-hidden  w-2/3  border border-gray-700 justify-center items-center shadow-xl h-auto p-4">
              <div className="col-span-1 flex h-full w-full">
                <Image
                  src="/dummy.webp"
                  alt=""
                  width={500}
                  height={600}
                  className="object-contain"
                />
              </div>
              <div className="col-span-1 w-full flex flex-col justify-center items-center">
                <Image
                  src="/dall-e.png"
                  alt=""
                  width={200}
                  height={200}
                  className="object-contain mb-5 rounded-full bg-gray-700"
                />
                <h2 className="text-md mt-2 mx-4 text-gray-400 font-medium text-center">
                  Sign in to create your first image
                </h2>
                <button
                  className="my-5 w-2/3 px-8 h-10 bg-[#2A2832] hover:bg-[#434149] text-gray-400 rounded-md shadow hover:shadow-lg font-medium"
                  onClick={!session ? () => signIn() : () => signOut()}
                >
                  Continue with Google
                </button>
                <button
                  className="absolute top-1 right-1 my-5 w-auto px-8 h-10  text-white rounded-md shadow hover:shadow-lg font-semibold"
                  onClick={() => setShowModal(false)}
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
