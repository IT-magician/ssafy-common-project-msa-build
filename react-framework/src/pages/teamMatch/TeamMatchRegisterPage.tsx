import { useState, useEffect, useRef } from 'react';
import useGeolocation from 'react-hook-geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { place } from '@/models/place';
import currentPos from '@/assets/icons/current-position.png';
import basketballMap from '@/assets/icons/basketball-map.png';
import footballMap from '@/assets/icons/football-map.png';
import badmintonMap from '@/assets/icons/badminton-map.png';
import searchIcon from "@/assets/icons/search.png"
import placeIcon from '@/assets/icons/place.png';
import calendarIcon from '@/assets/icons/calendar.png';
import timeIcon from '@/assets/icons/time.png';
import RegisterButton from '@/components/Match/Buttons/RegisterButton';
import { useNavigate } from 'react-router';
import { Slider } from '@mui/material';
import useTeamMatchRegister from '@/hooks/teamMatch/useTeamMatchRegister';
import useTeamQuery from '@/hooks/team/useTeamQuery';
import Calender from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import moment from 'moment';
import { setTabName } from '@/stores/tab/tabName';

export default function TeamMatchRegisterPage() {
  const [naverMap, setNaverMap] = useState<naver.maps.Map | null>(null);
  const [curPos, setCurPos] = useState<naver.maps.Marker | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [place, setPlace] = useState<place | null>(null);
  const [detailPlace, setDetailPlace] = useState<string>('');
  const [preferDist, setPreferDist] = useState<number>(0);
  const [circle, setCircle] = useState<naver.maps.Circle | null>(null);
  const [preferTime, setPreferTime] = useState<number[]>([0, 24]);


  // naver map
  const mapElement: any | null = useRef(undefined);

  // initial call
  const geolocation = useGeolocation();

  const teamId = useSelector((state: RootState) => {
    return state.team.id;
  });

  const teamInfo = useTeamQuery(teamId);
  console.log(teamInfo)
  const { mutate } = useTeamMatchRegister();
  const movePage = useNavigate();

  const distMarks = [
    {
      value: 0,
      label: '0km',
    },
    {
      value: 5,
      label: '5km',
    },
    {
      value: 10,
      label: '10km',
    },
  ];


  const timeMarks = [
    {
      value: 0,
      label: '0???',
    },
    {
      value: 12,
      label: '12???',
    },
    {
      value: 24,
      label: '24???',
    },
  ];

  const handlePreferDistChange = (event: Event, newValue: number | number[]) => {
    setPreferDist(newValue as number);
  };

  const handlePreferTimeChange = (event: Event, newValue: number | number[]) => {
    setPreferTime(newValue as number[]);
  };

  const register = () => {
    if (date && place) {
      console.log(date)
      mutate({
        distance: preferDist,
        matchDate: moment(date).format("YYYY-MM-DD"),
        minStartTime: moment(preferTime[0]).format("HH"),
        maxStartTime: moment(preferTime[1]).format("HH"),
        preferredPlace: {
          address: place.address + " " + detailPlace,
          lat: place.lat,
          lng: place.lng
        },
        teamMatchResultList: [{
          teamId: teamId
        }],
        matchGameType: teamInfo.data.gameType,
        matchSports: teamInfo.data.sports,

      })
      movePage('/team-match')
    } else {
      console.log("matchDate ??????!")
    }

  };

  function setMapIcon(
    icon: string,
    location: naver.maps.LatLng,
    map: naver.maps.Map,
    sizeX: number,
    sizeY: number,
    isBounce: boolean,
    clickable: boolean
  ) {
    return new naver.maps.Marker({
      position: location,
      map,
      icon: {
        url: icon,
        size: new naver.maps.Size(sizeX, sizeY),
        scaledSize: new naver.maps.Size(sizeX, sizeY),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(sizeX / 2, sizeY),
      },
      animation: isBounce ? naver.maps.Animation.BOUNCE : undefined,
      clickable: clickable
    });
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabName('??? ?????? ??????'))
  }, [])

  // ????????? ?????? ??????
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // ????????? ????????? ????????? ????????? ?????? ????????? ??????????????? ???????????????.
    const location = new naver.maps.LatLng(
      geolocation.latitude,
      geolocation.longitude
    );
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 13,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    setNaverMap(map);
  }, []);

  useEffect(() => {
    if (naverMap === null) return;

    const location = new naver.maps.LatLng(
      geolocation.latitude,
      geolocation.longitude
    );

    if (!curPos)
      naverMap.setCenter(location);

    // ?????? ?????? ?????? ?????? ??????
    if (curPos) {
      curPos.setMap(null);
    }

    // ?????? ?????? ?????? ??????
    setCurPos(setMapIcon(currentPos, location, naverMap, 40, 40, false, false));
  }, [geolocation]);

  useEffect(() => {
    if (naverMap === null) return;

    if (marker) {
      switch (teamInfo.data.team.sports) {
        case '??????':
          marker.setIcon({
            url: basketballMap,
            size: new naver.maps.Size(60, 60),
            scaledSize: new naver.maps.Size(60, 60),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(30, 60)
          });
          break;
        case '??????':
          marker.setIcon({
            url: footballMap,
            size: new naver.maps.Size(60, 60),
            scaledSize: new naver.maps.Size(60, 60),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(30, 60)
          });
          break;
        case '????????????':
          marker.setIcon({
            url: badmintonMap,
            size: new naver.maps.Size(60, 60),
            scaledSize: new naver.maps.Size(60, 60),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(30, 60)
          });
          break;
      }
    }

    naver.maps.Event.addListener(naverMap, 'click', function (e) {
      const latlng = e.coord;

      if (marker) {
        marker.setPosition(latlng);
      }
      else {
        switch (teamInfo.data.team.sports) {
          case '??????':
            setMarker(setMapIcon(basketballMap, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 60, 60, true, true));
            break;
          case '??????':
            setMarker(setMapIcon(footballMap, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 60, 60, true, true));
            break;
          case '????????????':
            setMarker(setMapIcon(badmintonMap, new naver.maps.LatLng(latlng._lat, latlng._lng), naverMap, 60, 60, true, true));
            break;
        }
      }

      naver.maps.Service.reverseGeocode({
        coords: new naver.maps.LatLng(latlng._lat, latlng._lng),
      }, function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          console.log("wrong!");
        }

        const result = response.v2; // ?????? ????????? ????????????
        const address = result.address.jibunAddress; // ?????? ????????? ?????? ??????
        setPlace({
          address: address,
          lat: latlng._lat,
          lng: latlng._lng,
        })
      })
    });

  }, [marker, teamInfo.isSuccess])

  useEffect(() => {
    if (!naverMap || !marker) return;
    if (circle)
      circle.setMap(null);

    setCircle(new naver.maps.Circle({
      map: naverMap,
      center: marker.getPosition(),
      radius: preferDist * 1000,
      fillColor: 'red',
      fillOpacity: 0.5
    }))
  }, [preferDist])

  return (
    <div className="bg-white h-screen pl-24 pr-24">
      <div className="flex pt-24">
        <img className="w-20 h-20" src={calendarIcon}></img>
        <div className="ml-7 text-15 font-semibold">??????</div>
      </div>
      <Calender
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => moment(date).format("DD")}
        minDetail="month"
        maxDetail="month"
        showNeighboringMonth={false}
        calendarType='US'
        className="mt-10"
      />
      <div className="flex mt-24">
        <img className="w-20 h-20" src={placeIcon}></img>
        <div className="ml-7 text-15 font-semibold">?????? ??????</div>
      </div>
      <div className="flex items-center mt-12">
        <img className="w-20 h-20" src={searchIcon}></img>
        <input
          className="w-full h-30 bg-gray-600 text-gray-700 ml-6 pl-15 rounded-5 text-12"
          placeholder="???????????? ?????? ????????? ??????????????????."
        ></input>
      </div>
      <div ref={mapElement} className="w-full h-[364px] mt-12"></div>
      <div className='w-full text-end text-13 mt-5 font-semibold text-blue-700'>?????? ?????? ????????? ???????????? ??????????????????.</div>
      <div className='text-13 mt-10'>?????? : {place?.address}</div>
      <div className='flex mt-10 items-center'>
        <div className='text-13 w-80'>?????? ??????: </div>
        <input
          className="w-full h-30 bg-gray-600 text-gray-700 ml-6 pl-15 rounded-5 text-12"
          placeholder="?????? ????????? ????????? ?????????. ???) ???????????????"
          onChange={(e) => setDetailPlace(e.target.value)}
        ></input>
      </div>
      <div className="w-[calc(100%-30px)] ml-auto mr-auto">
        <Slider
          value={preferDist}
          onChange={handlePreferDistChange}
          valueLabelDisplay="auto"
          marks={distMarks}
          min={0}
          max={10}
          sx={{
            color: 'blue',
            '& .MuiSlider-thumb': {
              width: '15px',
              height: '15px',
              color: 'white',
              borderWidth: '1px',
              borderColor: 'blue',
            },
          }}
        />
      </div>
      <div className="flex mt-36">
        <img className="w-20 h-20" src={timeIcon}></img>
        <div className="ml-7 text-15 font-semibold">?????? ?????????</div>
      </div>
      <div className="w-[calc(100%-30px)] ml-auto mr-auto mb-18">
        <Slider
          value={preferTime}
          onChange={handlePreferTimeChange}
          valueLabelDisplay="auto"
          marks={timeMarks}
          min={0}
          max={24}
          sx={{
            color: 'blue',
            '& .MuiSlider-thumb': {
              width: '15px',
              height: '15px',
              color: 'white',
              borderWidth: '1px',
              borderColor: 'blue',
            },
          }}
        />
      </div>

      <RegisterButton onClick={register}>?????? ??????</RegisterButton>
    </div>
  );
}
