import React, { useState, useRef } from "react";
import { Slider } from "@mui/material"
import ChoiceCompoleteButton from "@/components/userRegister/Buttons/ChoiceCompleteButton"
import NicknameCheckButton from "@/components/userRegister/Buttons/NicknameCheckButton"
import { useDispatch, useSelector } from "react-redux"
import { setNickname, setFavoriteTime } from "@/stores/register/userInfo"
import { RootState } from "@/stores/store";

import axios from "axios";
import { KAKAO_LOGIN_TEST_SERVER_URL } from "@/utils/url";

export default function UserInfoTab() {
    // const [favoriteTime, setFavoriteTime] = useState(initialTimeState);
    // const [nickname, setNickname] = useState("");
    const [isNicknameDuplicated, setIsnicknameDuplicated] = useState<boolean>(false)
    const dispatch = useDispatch();
    const favoriteTime = useSelector((state: RootState) => {
        return state.userInfo.favoriteTime;
    });
    const nickname = useSelector((state: RootState) => {
        return state.userInfo.nickname;
    });

    const nicknameChecker = async () => {
        await axios.post(KAKAO_LOGIN_TEST_SERVER_URL + `/user/check/nickname/` + `${nickname}`)
            .then(response => {
                // console.log("asdasdas")
                if (response.data.isExist) {
                    alert("중복된 닉네임 입니다. 다시 설정해주세요.")
                    setIsnicknameDuplicated(true)
                    dispatch(setNickname(""))
                    nicknameInput.current.focus()
                } else {
                    alert("사용 가능한 닉네임 입니다.")
                }
            })
    }

    const handleChange = (event: Event, value: number | number[]) => {
        event.preventDefault();
        const newValue = value as number | number[] as number[]
        // console.log(value)
        dispatch(setFavoriteTime(newValue))
    }

    const handleNickname = (event: React.BaseSyntheticEvent) => {
        // console.log(e.target.value)
        event.preventDefault();
        dispatch(setNickname(event.target.value))
    }

    let nicknameInput: any = useRef();

    const marks = [
        {
            value: 0,
            label: '0시',
        },
        {
            value: 12,
            label: '12시',
        },
        {
            value: 24,
            label: '24시',
        },

    ];

    function valueText(value: number, index: number) {
        return `${value}시간`
    }

    return (
        // calc안의 100vh-146은 탭이 끝나는 지점부터의 높이를 의미
        <div className="flex flex-col h-[calc(100vh-149px)] justify-between">
            <div className="flex flex-col mt-37 self-center">
                <h2 className=" text-20 font-bold text-center tracking-tight">닉네임을 설정해주세요</h2>
                <div className="flex justify-center mt-35">
                    <input
                        type="text"
                        value={nickname}
                        className="border-b-2 mx-11 border-gray-600 w-160 h-26 outline-none text-center"
                        placeholder="닉네임 입력"
                        onChange={handleNickname}
                        ref={nicknameInput}
                    />
                    <NicknameCheckButton nicknameCheck={() => {
                        if (nickname.length > 10) {
                            alert("닉네임은 10글자 이하만 사용 가능합니다.")
                            nicknameInput.current.focus()
                            dispatch(setNickname(""))
                            return
                        } else {
                            nicknameChecker()
                            nicknameInput.current.focus()

                        }
                        /* 백엔드에 요청해서 중복되는 아이디가 있는지 검사하는 코드 넣기!!


                        */
                    }} />
                </div>

                <div className="flex mt-37 self-center justify-center">
                    <h2 className="text-20  font-bold tracking-tight">선호시간을 입력해주세요<span className="text-gray-600">(선택)</span></h2>
                </div>
                <div className="w-[260px] self-center">
                    <Slider
                        value={favoriteTime}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={0}
                        max={24}
                        getAriaValueText={valueText}
                        className="mt-12"
                    />
                </div>
            </div>

            <div className="self-center sticky bottom-0">
                <div className="self-center bg-gradient-to-t from-white pt-50" />
                <ChoiceCompoleteButton innerText="선택 완료" isNicknameDuplicated={isNicknameDuplicated} />
            </div>
        </div>
    )
}


