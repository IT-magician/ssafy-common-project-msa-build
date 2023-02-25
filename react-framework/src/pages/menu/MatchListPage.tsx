import MatchCard from "@/components/Match/MatchCard"
import footballImg from "@/assets/icons/football-bg-colored.png"
import basketballImg from "@/assets/icons/basketball-bg-colored.png"
import badmintonImg from "@/assets/icons/badminton-bg-colored.png"

import useGetMyMatch from "@/hooks/user/useGetMyMatchList";
import useTeamListQuery from "@/hooks/team/useTeamListQuery";

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTabName } from "@/stores/tab/tabName"
import { RootState } from "@/stores/store";

export default function MatchListPage() {

    const myUserId = useSelector((state: RootState) => {
        return state.userId.id
    })
    const myMatchList = useGetMyMatch(myUserId);
    const myTeamList = useTeamListQuery(myUserId);

    let myTeamIdList: object[] = []

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTabName('매칭 목록'))
        // console.log(myTeamList)
    }, [])

    useEffect(() => {
        // console.log(myUserId)
        myMatchList.isSuccess && console.log(myMatchList)

        myTeamIdList = myTeamList.data && myTeamList.data.map((teamInfo: any) => {
            return teamInfo.team
        })

        myTeamList.isSuccess && console.log(myTeamIdList)
    }, [myMatchList])

    const MatchCardRendering = (matchTypeAndIsPast: "지난개인" | "최근개인" | "지난팀" | "최근팀") => {
        let index = 0
        let switchMatchList = []
        let isOldMatch = false
        if (myMatchList.isSuccess) {
            switch (matchTypeAndIsPast) {
                case "지난개인":
                    switchMatchList = myMatchList.data.timePastGatheringList
                    isOldMatch = true
                    break;
                case "최근개인":
                    switchMatchList = myMatchList.data.timeNotPastGatheringList
                    break;
                case "지난팀":
                    switchMatchList = myMatchList.data.timePastMatchList
                    isOldMatch = true
                    break;
                case "최근팀":
                    switchMatchList = myMatchList.data.timeNotPastMatchList
                    break;
            }
        }
        const Result = switchMatchList && switchMatchList.map((match: any) => {
            let imgSrc = ""
            let buttonColor = ""
            switch (match.sports ? match.sports : match.host.sports) {
                case "축구":
                    imgSrc = footballImg
                    buttonColor = "bg-[#E1D7FC]"
                    break;
                case "농구":
                    imgSrc = basketballImg
                    buttonColor = "bg-[#FDE8B4]"
                    break;
                case "배드민턴":
                    imgSrc = badmintonImg
                    buttonColor = "bg-[#C4FFB6]"
                    break;
            }
            index++;
            return (
                <MatchCard
                    key={index}
                    imgSrc={imgSrc}
                    sportsType={match.sports}
                    matchTitle={(match.title ? match.title : (match?.teamMatchResultList[0].teamMatchResultId) + "팀과의 매치")}
                    place={match.place ? match.place.address : match.preferredPlace.address}
                    matchPersonnel={match.gameType ? match.gameType : match.host.gameType}
                    matchType={match.matchType}
                    isOldMatch={isOldMatch}
                    buttonColor={buttonColor}
                    matchId={match.matchId ? match.matchId : match.gatheringId}
                />
            )
        })
        return Result
    }

    return (
        <div className="flex flex-col h-auto w-full">
            <div className="w-full h-auto bg-white mb-5">
                <h1 className="pl-20 py-15 text-start text-18  font-bold">개인 매칭</h1>
            </div>
            <div>{MatchCardRendering("최근개인")}</div>
            <div>{MatchCardRendering("지난개인")}</div>

            <div className="pt-12" />

            <div className="w-full h-auto bg-white mb-5">
                <h1 className="pl-20 py-15 text-start text-18  font-bold">팀 매칭</h1>
            </div>
            <div>{MatchCardRendering("최근팀")}</div>
            <div>{MatchCardRendering("지난팀")}</div>
        </div>
    )
}