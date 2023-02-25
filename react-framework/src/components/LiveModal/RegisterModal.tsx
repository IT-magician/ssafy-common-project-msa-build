import React, { useState } from 'react';
import JoinButton from './Buttons/JoinButton'
import exit from '@/assets/icons/exit.png'
import placeIcon from '@/assets/icons/place.png'
import { place } from '@/models/place';
import RegisterConfirmModal from './RegisterConfirmModal';

const arr: number[] = [... new Array(15)].map((_, i) => i + 1);

interface Iprops {
    type: string;
    place: place;
    isOpen: boolean;
    closeModal: () => void;
}

export default function RegisterModal(props: Iprops) {
    const [size, resize] = useState<number>(1); // 현재 인원 size
    const [size2, resize2] = useState<number>(1); // 정원 size
    const [height, resizeHeight] = useState<number>(22); // 현재 인원 height
    const [height2, resizeHeight2] = useState<number>(22); // 정원 height
    const [address, setAddress] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [currentPeopleNum, setCurrentPeopleNum] = useState<number>(1);
    const [totalPeopleNum, setTotalPeopleNum] = useState<number>(1);
    const [registConfirmModal, setRegistConfirmModal] = useState<boolean>(false);

    const open = (b: boolean) => {
        if (b) {
            resize(5);
            resizeHeight(56);
        }
        else {
            resize2(5);
            resizeHeight2(56);
        }

    }
    const close = (b: boolean) => {
        if (b) {
            resize(1);
            resizeHeight(22);
        }
        else {
            resize2(1);
            resizeHeight2(22);
        }
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetail(e.target.value);
    }

    const handleCurrentPeopleNumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setCurrentPeopleNum(Number(e.target.value));
    }

    const handleTotalPeopleNumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTotalPeopleNum(Number(e.target.value));
    }

    const registConfirm = (b: boolean) => {
        setRegistConfirmModal(b);
    }

    return (
        <div className={`${props.isOpen ? "visible -translate-y-[274px] duration-300 ease-out" : "invisible translate-y-[274px] duration-1000 ease-out"} 
        w-[322px] h-[265px] z-10 absolute left-1/2 ml-[-161px] bottom-[-260px] rounded-15 bg-white flex flex-col items-center justify-center`}>
            <div className="w-[322px] flex h-18 mt-14 ">
                <div className="ml-110 text-15">실시간 운동 등록</div>
                <img className="w-10 h-10 ml-auto mr-24 mt-5" src={exit} onClick={props.closeModal}></img>
            </div>
            <div className="w-[284px] h-20 mt-24 flex justify-between items-center">
                <div className='flex items-center'>
                    <img src={placeIcon} className="w-20 h-20"></img>
                    <div className='text-15 ml-6 mb-2'>장소</div>
                </div>
                <input className='w-150 h-30 bg-gray-600 rounded-5 pl-10 text-13' placeholder='장소를 입력하세요.' onChange={handleAddressChange}></input>
            </div>
            <textarea onChange={handleDetailChange} value={detail} className="w-[284px] h-80 mt-15 bg-gray-600 text-gray-700 pl-15 pt-11 rounded-5 text-13" placeholder='하고 싶은 말을 작성하세요.'></textarea>
            <div className="w-[284px] h-22 mt-14 mb-13 flex">
                <div className="text-15">현재 인원</div>
                <select style={{ height: height }} size={size} onFocus={() => open(true)} onBlur={() => close(true)} onChange={(e) => { close(true); e.target.blur(); handleCurrentPeopleNumChange(e); }} className='w-36 h-22 bg-blue-600 rounded-5 text-12 pl-5 ml-14 text-white z-20'>
                    {arr.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                <div className="text-15 opacity-50 ml-6">명</div>
                <div className="ml-46 text-15">정원</div>
                <select style={{ height: height2 }} size={size2} onFocus={() => open(false)} onBlur={() => close(false)} onChange={(e) => { close(false); e.target.blur(); handleTotalPeopleNumChange(e) }} className='w-36 h-22 bg-blue-600 rounded-5 text-12 pl-5 ml-14 text-white z-20'>
                    {arr.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                <div className="text-15 opacity-50 ml-6">명</div>
            </div>
            <JoinButton onClick={() => registConfirm(true)}>등록하기</JoinButton>
            {registConfirmModal && <RegisterConfirmModal currentPeopleNum={currentPeopleNum} totalPeopleNum={totalPeopleNum} detail={detail} place={{ address: address, lat: props.place.lat, lng: props.place.lng }} sports={props.type} closeRegisterModal={() => registConfirm(false)} closeModal={props.closeModal}></RegisterConfirmModal>}
        </div>

    )

}