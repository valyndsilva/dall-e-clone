import { Fragment, useContext } from "react";
import { Menu } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  PlusCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { DataContext } from "../context/DataContext";

interface Props {
  session?: Session;
}
function DropDown({ session }: Props) {
  const router = useRouter();
  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/");
    });
  };
    const {
      setGenerateData,
    } = useContext(DataContext);

  const handleCreate = () => {
    setGenerateData({
      name: "",
      prompt: "",
      dimension: "",
      photos: "",
      photoURL: "",
    });
    router.push("/create");
  };
  return (
    <Menu>
      <Menu.Button>
        <span className="relative">
          <ChevronDownIcon className="w-4 h-4 text-white" />
        </span>
      </Menu.Button>
      <Menu.Items className="flex flex-col absolute top-20 right-0 w-48 border border-gray-800 text-gray-400 bg-[#18181B] rounded-md focus:outline-none z-50">
        <Menu.Item>
          {({ active }) => (
            <Link
              onClick={() => handleCreate()}
              href="/create"
              className={`flex md:hidden px-5 py-2 space-x-2 ${
                active ? "bg-[#222222]" : "bg-[#18181B]"
              }`}
            >
              <PlusCircleIcon className="w-6 h-6" /> <span>Create</span>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              href=""
              className={`px-5 py-2 flex space-x-2 ${
                active ? "bg-[#222222]" : "bg-[#18181B]"
              }`}
            >
              <UserIcon className="w-6 h-6" /> <span>Profile</span>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              href=""
              className={`px-5 py-2 flex space-x-2 ${
                active ? "bg-[#222222]" : "bg-[#18181B]"
              }`}
            >
              <Cog8ToothIcon className="w-6 h-6" /> <span>Settings</span>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div
              onClick={!session ? () => signIn() : handleLogout}
              className={`px-5 py-2 flex space-x-2 ${
                active ? "bg-[#222222]" : "bg-[#18181B]"
              }`}
            >
              {!session ? (
                <>
                  <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                  <span>Log in</span>
                </>
              ) : (
                <>
                  {" "}
                  <ArrowRightOnRectangleIcon className="w-6 h-6" />{" "}
                  <span>Log out</span>
                </>
              )}
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
export default DropDown;
