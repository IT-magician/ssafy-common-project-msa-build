import ChoiceCompoleteButton from "@/components/userRegister/Buttons/ChoiceCompleteButton"
import ImageCard from "@/components/userRegister/ImageCard"
import footballImg from "@/assets/icons/football-original.png"
import basketballImg from "@/assets/icons/basketball-original.png"
import badmintonImg from "@/assets/icons/badminton-original.png"
import { useDispatch, useSelector } from "react-redux"
import { setFavoriteSports } from "@/stores/register/userInfo"
import { RootState } from "@/stores/store"

export default function FavoriteSportsTab() {
    const dispatch = useDispatch();

    const isFavoritefootball = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports.football;
    });
    const isFavoriteBasketball = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports.basketball;
    });
    const isFavoriteBadminton = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports.badminton;
    });
    const storeState = useSelector((state: RootState) => {
        return state.userInfo.favoriteSports;
    });


    return (
        <div className="flex flex-col h-[calc(100vh-149px)] justify-between">
            <div className="flex flex-col mt-37 self-center">
                <h1 className=" text-20 font-bold text-center mb-20 tracking-tight">관심 운동을 선택해주세요
                    <br />
                    <span className="text-15 text-[#969696]">(복수 선택)</span>
                </h1>
                <div className="flex">
                    <div className="flex-col">
                        <ImageCard
                            onClick={() =>
                                dispatch(setFavoriteSports({ sportName: "football", isSelected: !(isFavoritefootball) }))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((isFavoritefootball) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={footballImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center  text-11 mt-6">축구</p>
                    </div>
                    <div className="flex-col">
                        <ImageCard
                            onClick={() =>
                                dispatch(setFavoriteSports({ sportName: "basketball", isSelected: !(isFavoriteBasketball) }))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((isFavoriteBasketball) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={basketballImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center  text-11 mt-6">농구</p>
                    </div>
                    <div className="flex-col">
                        <ImageCard
                            onClick={() =>
                                dispatch(setFavoriteSports({ sportName: "badminton", isSelected: !(isFavoriteBadminton) }))
                            }
                            className={"w-80 h-80 mx-12 pt-19 pl-19 " + ((isFavoriteBadminton) ? "bg-[#BEE0F7] border-1 border-blue-700 " : "bg-[#BCD2F5]/25 border-1 border-[#BCD2F5]/25 ")}
                            imageSrc={badmintonImg}
                            imageSize={"w-42 h-42"}
                        />
                        <p className="text-center  text-11 mt-6">배드민턴</p>
                    </div>
                </div>
            </div>

            <div className="self-center sticky bottom-0">
                <div className="self-center bg-gradient-to-t from-white pt-50" />
                <ChoiceCompoleteButton innerText="선택 완료" />
            </div>
        </div>

    )
}