import React from 'react';
import CardSvg from "../../public/svg/Card";

const OrderSummary = ({className}) => {
    return (
        <div className={'w-30%'}>
            <div
                className={`font-barlow pb-6 drop-shadow-lg flex flex-col items-center box-shadow:0px_0px_0px_1px_rgba(243,_243,_243,_1)_inset] [box-shadow-width:1px] [flex-grow:1] bg-white ${className}`}>
                <div
                    className="  pt-14 relative  flex justify-center text-left">
                    <p className="left-[15px] font-[600] tracking-[-0.02em] w-[133px] top-4 absolute text-xl leading-6 text-black h-6">
                        Order Summary
                    </p>
                    <div className="text-[#333333] gap-2 flex flex-col items-center h-full w-full">
                        <div className="w-full h-[0] outline outline-1 outline-[#F3F3F3]"/>
                        <div className="[flex-grow:1] bg-white gap-4 flex flex-col items-start p-2">
                            <p className="w-[341px] font-[500] tracking-[-0.02em] text-base leading-6">
                                Aluminum aluzinc tile matte finish with alloy
                            </p>
                            <div className="gap-[179px] font-[400] flex items-start">
                                <p className="tracking-[-0.02em] w-[41px] text-sm leading-6">
                                    3 Units
                                </p>
                                <p className="tracking-[-0.02em] w-[120px] text-sm leading-6">
                                    Total Cost: Ksh 2400
                                </p>
                            </div>
                        </div>
                        <div className="[flex-grow:1] bg-white gap-4 flex flex-col items-start mt-6 p-2">
                            <p className="w-full font-[500] tracking-[-0.03em] text-base leading-6">
                                Aluminum aluzinc tile matte finish with alloy
                            </p>
                            <div className="gap-[179px] font-[400] flex items-start">
                                <p className="tracking-[-0.03em] text-sm leading-6 w-10">
                                    3 Units
                                </p>
                                <p className="tracking-[-0.03em] w-[117px] text-sm leading-6">
                                    Total Cost: Ksh 2400
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-[0] outline outline-1 outline-[#FCFCFC]"/>
                    </div>
                </div>
                <div className=" gap-6 flex flex-col items-center">
                    <div className=" flex gap-6 flex-col justify-center items-start">
                        <div className="gap-6 flex flex-col items-center">
                            <div className="gap-4 flex flex-col items-start px-5">
                                <div className="gap-52 flex items-start">
                                    <p className="font-[400] tracking-[-0.02em] text-[#00000099] w-[63px] text-base leading-6 text-left">
                                        Sub-total
                                    </p>
                                    <p className="font-[500] tracking-[-0.02em] text-[#333333] w-[71px] text-base leading-6 text-right">
                                        Ksh. 2,400
                                    </p>
                                </div>
                                <div className="gap-[234px] flex items-start">
                                    <p className="font-[400] tracking-[-0.02em] text-[#00000099] w-[49px] text-base leading-6 text-left">
                                        VAT (%)
                                    </p>
                                    <p className="font-[500] tracking-[-0.02em] text-[#333333] w-[58px] text-base leading-6 text-right">
                                        Ksh. 300
                                    </p>
                                </div>
                            </div>
                            <div className="w-[374px] outline outline-1 outline-[#F3F3F3] origin-center h-px"/>
                        </div>
                        <div className="gap-[234px] flex items-start text-black px-5">
                            <p className="font-[500] tracking-[-0.02em] w-[34px] text-base leading-6 text-left">
                                Total
                            </p>
                            <p className="font-[700] tracking-[-0.02em] w-[69px] text-base leading-6 text-right">
                                Ksh.2,900
                            </p>
                        </div>
                    </div>
                    <div className="w-[341px] font-[400] text-left leading-none relative">
                        <p className="text-[#888888] text-sm inline">
                            {"By proceeding to pay it means you have agreed to "}
                            <br/>
                        </p>
                        <p className="text-[#888888] text-sm inline">Royal Mabati’s</p>
                        <p className="text-[#DC2A25] text-sm underline inline">
                            Terms and Conditions
                        </p>
                        <p className="text-[#888888] text-sm inline">.</p>
                    </div>
                </div>
            </div>
            <div
                className="w-full flex h-[59px] bg-[#DC2A25] font-[700] gap-2.5 justify-center items-center mt-14 rounded p-2.5 text-white text-left">
                <CardSvg className="w-[25px] h-[25px]"/>
                <p className=" h-5 text-base">Proceed to pay</p>
            </div>
        </div>
    );
};

export default OrderSummary;