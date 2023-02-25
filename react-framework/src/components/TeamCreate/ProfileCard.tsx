import CheckBox from "./CheckBox";

interface ClassNameProps {
    userId: number;
    className: string;
    imageSrc: string;
    imageSize: string;
    nickname: string;
    isSelected: boolean;
    onClick?: any;
    selectedNicknames: { memberId: number, nickname: string }[];
    selectedMemberIds: number[];
    setSelectedMemberIds: any;
    setSelectedNicknames: any;
}

export default function ProfileCard({ userId, className, imageSrc, imageSize, nickname, isSelected, onClick, selectedNicknames, selectedMemberIds, setSelectedMemberIds, setSelectedNicknames }: ClassNameProps) {
    return (
        <div
            className={className}
        >
            <div className="flex">
                <img src={imageSrc} className={imageSize + " rounded-26 self-center"} />
                <div className="flex flex-col ml-15 my-15 h-35 justify-center ">
                    <h2 className="text-15 ">{nickname}</h2>
                </div>
            </div>
            <CheckBox className="flex ml-15 mr-24 w-19 h-19 border-2 rounded-20 self-center" userId={userId} imageSrc={imageSrc} nickname={nickname} isSelected={isSelected} onClick={onClick} selectedMemberIds={selectedMemberIds} setSelectedMemberIds={setSelectedMemberIds} selectedNicknames={selectedNicknames} setSelectedNicknames={setSelectedNicknames} />
        </div>
    )
}
