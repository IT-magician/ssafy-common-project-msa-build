import home from "@/assets/icons/home.png"
import search from "@/assets/icons/search.png"
import teamMatch from "@/assets/icons/team-match.png"
import totalList from "@/assets/icons/total-list.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Footer() {
    const [tabIndex, setTabIndex] = useState<number>(1);
    const navigate = useNavigate();
    return (
        <div className="w-full h-[55px] pl-5 pr-5 flex justify-between items-center border-t-1 fixed bottom-0 border-gray-600 bg-white z-50">
            {tabIndex === 1 ?
                <div className="w-70 h-55 flex flex-col justify-center items-center border-t-2 border-blue-700" onClick={() => { navigate("/home"); setTabIndex(1); }}>
                    <img className="w-17 h-17" src={home}></img>
                    <div className="text-8 text-gray-700 mt-3">홈</div>
                </div> :
                <div className="w-70 h-55 flex flex-col justify-center items-center" onClick={() => { navigate("/home"); setTabIndex(1); }}>
                    <img className="w-17 h-17" src={home}></img>
                    <div className="text-8 text-gray-700 mt-3">홈</div>
                </div>
            }
            {tabIndex === 2 ?
                <div className="w-70 h-55 flex flex-col justify-center items-center border-t-2 border-blue-700" onClick={() => { navigate("/gather"); setTabIndex(2); }}>
                    <img className="w-17 h-17 mt-3" src={search}></img>
                    <div className="text-8 text-gray-700 mt-3">매칭</div>
                </div> :
                <div className="w-70 h-55 flex flex-col justify-center items-center" onClick={() => { navigate("/gather"); setTabIndex(2); }}>
                    <img className="w-17 h-17 mt-3" src={search}></img>
                    <div className="text-8 text-gray-700 mt-3">매칭</div>
                </div>
            }
            {tabIndex === 3 ?
                <div className="w-70 h-55 flex flex-col justify-center items-center border-t-2 border-blue-700" onClick={() => { navigate("/team-match"); setTabIndex(3); }}>
                    <img className="w-20 h-20" src={teamMatch}></img>
                    <div className="text-8 text-gray-700 mt-3">팀매칭</div>
                </div> :
                <div className="w-70 h-55 flex flex-col justify-center items-center" onClick={() => { navigate("/team-match"); setTabIndex(3); }}>
                    <img className="w-20 h-20" src={teamMatch}></img>
                    <div className="text-8 text-gray-700 mt-3">팀매칭</div>
                </div>
            }
            {tabIndex === 4 ?
                <div className="w-70 h-55 flex flex-col justify-center items-center border-t-2 border-blue-700" onClick={() => { navigate("/menu"); setTabIndex(4); }}>
                    <img className="w-23 h-23" src={totalList}></img>
                    <div className="text-8 text-gray-700">전체</div>
                </div> :
                <div className="w-70 h-55 flex flex-col justify-center items-center" onClick={() => { navigate("/menu"); setTabIndex(4); }}>
                    <img className="w-23 h-23" src={totalList}></img>
                    <div className="text-8 text-gray-700">전체</div>
                </div>
            }
        </div>
    )
}