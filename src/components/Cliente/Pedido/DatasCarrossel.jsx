import React from "react";
import style from "./DataCarrossel.module.css"

function DatasCarrossel(){
    return(
        <>
            <div className="flex mt-12 w-full h-auto items-center justify-center">
                <span className={`${style.widthBarra} bg-[#C1CECD]`} />
                <div className="flex items-center flex-col text-[#045D53] ml-[4.6rem] mb-3">
                    <p className="text-[1rem]">Sex</p>
                    <p className="text-[1.7rem] font-normal mt-1">4</p>
                    <p className="text-[1rem]">AGO</p>
                </div>
                <span className={`${style.widthBarra} bg-[#C1CECD] ml-[4.6rem]`} />
                <div className="flex items-center flex-col text-[#045D53] ml-[4.6rem] mb-3">
                    <p className="text-[1rem]">Sex</p>
                    <p className="text-[1.7rem] font-normal mt-1">4</p>
                    <p className="text-[1rem]">AGO</p>
                </div>
                <span className={`${style.widthBarra} bg-[#C1CECD] ml-[4.6rem]`} />
                <div className="flex items-center flex-col text-[#045D53] ml-[4.6rem] mb-3">
                    <p className="text-[1rem]">Sex</p>
                    <p className="text-[1.7rem] font-normal mt-1">4</p>
                    <p className="text-[1rem]">AGO</p>
                </div>
                <span className={`${style.widthBarra} bg-[#C1CECD] ml-[4.6rem]`} />
                <div className="flex items-center flex-col text-[#045D53] ml-[4.6rem] mb-3">
                    <p className="text-[1rem]">Sex</p>
                    <p className="text-[1.7rem] font-normal mt-1">4</p>
                    <p className="text-[1rem]">AGO</p>
                </div>
                <span className={`${style.widthBarra} bg-[#C1CECD] ml-[4.6rem]`} />
            </div>
        </>
    )
}

export default DatasCarrossel;