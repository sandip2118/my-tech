import Image from "next/image";


const Header = () => {

  const ProfileView = () => {
    return (
      <div className="flex items-center !md:gap-1 !gap-3">
        <div className="relative flex flex-col w-[40px] h-[40px] justify-center items-center">
          <Image
            src={"/"}
            height={32}
            width={32}
            alt=""
            className="bg-[#E0E2E7] rounded-full"
          />
          <div className="absolute w-[10px] h-[10px] max-w-[10px] mix-h-[10px] bg-green-500 rounded-full border-[2px] border-white bottom-1 right-1" />
        </div>
        <div>
          <p className="text-sm text-black font-semibold whitespace-nowrap !mb-0">
            Jenil Patel
          </p>
          <p className="text-sm text-[#374957] font-semibold !mb-0">Manager</p>
        </div>
        <div className="">
          <Image
            src={"/svgs/caretdown.svg"}
            height={14}
            width={14}
            alt=""
            className=""
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="md:block hidden">
        <div className="h-[40px] flex w-full justify-between my-2.5 px-2.5 sm:my-6 sm:px-6">
          <div className="flex gap-2 w-full">
            <Image src={"/svgs/search.svg"} height={24} width={24} alt="" />
            <input
              placeholder="search"
              className="!w-full text-gray-400 sm:!text-sm !text-xs px-2 border-transparent focus:border-transparent focus:ring-0 outline-0"
            />
          </div>
          <div className=" sm:flex hidden !md:gap-4 !gap-1">
            <div className="relative flex flex-col w-[40px] h-[40px] justify-center items-center">
              <Image src={"/svgs/calendar.svg"} height={14} width={14} alt="" />
            </div>
            <div className="relative flex flex-col w-[40px] h-[40px] justify-center items-center">
              <Image
                src={"/svgs/bell.svg"}
                height={14}
                width={14}
                alt=""
                className="#858d9d"
              />
              <div className="absolute flex flex-col bg-cyan-500 text-[7px] justify-center items-center text-white rounded-xs w-[11px] h-[10px] top-2 right-2">
                2
              </div>
            </div>
            <div className="relative flex flex-col w-[40px] h-[40px] justify-center items-center">
              <Image
                src={"/svgs/message.svg"}
                height={14}
                width={14}
                alt=""
                color="#858d9d"
              />
              <div className="absolute flex flex-col bg-cyan-500 text-[7px] justify-center items-center text-white rounded-xs w-[11px] h-[10px] top-2 right-2">
                2
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-[28px] h-[28px] bg-[#E0E2E7] rounded-full" />
            </div>
          </div>
          <div className="sm:block hidden bg-cyan-50 w-[1px] sm:mx-4" />
          <ProfileView />
        </div>
      </div>
      <div className="block md:hidden">
        <div className="h-[40px] flex w-full justify-end my-2.5 px-2.5">
          <ProfileView />
        </div>
      </div>
    </>
  );
};

export default Header;
