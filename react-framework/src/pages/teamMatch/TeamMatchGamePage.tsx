import timeIcon from "@/assets/icons/time.png"
import placeIcon from "@/assets/icons/place.png"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { getImgUrl } from "@/utils/getImgUrl";
import { useEffect } from "react";
import { setTabName } from "@/stores/tab/tabName";
import useTeamMatchQuery from "@/hooks/teamMatch/useTeamMatchQuery";
import { useParams } from "react-router-dom";
import useTeamMatchJoin from "@/hooks/teamMatch/useTeamMatchJoin";
import useTeamMatchResultRegister from "@/hooks/teamMatch/useTeamMatchResultRegitser";

export default function TeamMatchGamePage() {

  const { teamMatchId } = useParams();

  const teamMatch = useTeamMatchQuery(Number(teamMatchId));
  const teamMatchJoin = useTeamMatchJoin();

  console.log(teamMatch)
  const dispatch = useDispatch();


  const teamId = useSelector((state: RootState) => {
    return state.team.id;
  });

  useEffect(() => {
    dispatch(setTabName('팀 매칭 상세'))
  }, [])

  const join = () => {
    teamMatchJoin.mutate({ matchId: Number(teamMatchId), teamId: 1 })
  }



  return teamMatch.data && (
    <div className="w-full">
      <div className="w-full h-173 flex flex-col justify-center items-center bg-white">
        <img className="w-100 h-100" src={getImgUrl('profiles/team', teamMatch.data.host.teamId)} onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = getImgUrl('profiles/team', 'default_team')
        }}></img>
        <div className="text-20 mt-4">{teamMatch.data.host.name}</div>
      </div>

      <div className="w-full h-[calc(100vh-290px)] bg-white mt-7 pt-30 pl-24 pr-24 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img className="w-20 h-20 mr-8" src={timeIcon}></img>
              <div className="text-14">선호 시간대</div>
            </div>
            <div className="text-13">{teamMatch.data.minStartTime.slice(0, 5)} ~ {teamMatch.data.maxStartTime.slice(0, 5)}</div>
          </div>
          <div className="flex justify-between items-center mt-14">
            <div className="flex items-center">
              <img className="w-20 h-20 mr-8" src={placeIcon}></img>
              <div className="text-14">선호 장소</div>
            </div>
            <div className="text-13">{teamMatch.data.preferredPlace.address}</div>
          </div>
          <div className="w-full h-1 bg-gray-600 mt-24 mb-24 "></div>
          <div className="mt-15 text-12 text-gray-700">{teamMatch.data.done ? '매칭 결과 입력 완료' : '상대가 매칭 결과를 입력하기 전입니다.'}</div>
        </div>
        <div className="flex mb-15">
          <button className="w-full h-34 rounded-5 bg-blue-700 mr-6 text-15 text-white" onClick={join}>매칭 신청하기</button>
        </div>
      </div>
    </div>
  )
}