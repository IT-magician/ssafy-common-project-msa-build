import { createSlice } from "@reduxjs/toolkit";

type Level = "입문" | "초수" | "중수" | "고수" | null

interface SampleUser {
    id: number;
    imageSrc: string;
    nickname: string;
    isSelected: boolean;
}

interface NicknameAction {
    payload: string
}
interface NameAction {
    payload: string
}
interface FavoriteTimeAction {
    payload: number[]
}
interface FavoritePlaceAction {
    payload: string
}
interface FavoriteSportsAction {
    payload: { sportName: "football" | "basketball" | "badminton" | null, isSelected: boolean }
}
interface SportsLevelAction {
    payload: { sportName: "football" | "basketball" | "badminton" | null, level: Level }
}
interface myTeamAction {
    payload: SampleUser
}
interface statusMessageAction {
    payload: string
}

interface UserInfo {
    nickname: string,
    name: string,
    favoriteTime: number[],
    favoriteSports: {
        football: boolean,
        basketball: boolean,
        badminton: boolean,
    },
    sportsLevel: {
        football?: Level,
        basketball?: Level,
        badminton?: Level,
    },
    myTeam: SampleUser[],
    statusMessage: string,
    favoritePlace: string,
}

const initialState: UserInfo = {
    nickname: "",
    name: "",
    favoriteTime: [0, 24],
    favoriteSports: {
        football: false,
        basketball: false,
        badminton: false,
    },
    sportsLevel: {
        football: null,
        basketball: null,
        badminton: null,
    },
    myTeam: [],
    statusMessage: "상태 메시지",
    favoritePlace: ''
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setNickname(state, action: NicknameAction) {
            // console.log(action.payload)
            state.nickname = action.payload
        },
        setName(state, action: NameAction) {
            // console.log(action.payload)
            state.name = action.payload
        },
        setFavoriteTime(state, action: FavoriteTimeAction) {
            // console.log(action.payload)
            state.favoriteTime = action.payload
        },
        setFavoriteSports(state, action: FavoriteSportsAction) {
            // console.log(action.payload)
            switch (action.payload.sportName) {
                case "football":
                    state.favoriteSports.football = action.payload.isSelected
                    break;
                case "basketball":
                    state.favoriteSports.basketball = action.payload.isSelected
                    break;
                case "badminton":
                    state.favoriteSports.badminton = action.payload.isSelected
                    break;
            }
        },
        setSportsLevel(state, action: SportsLevelAction) {
            // console.log(action.payload)
            switch (action.payload.sportName) {
                case "football":
                    state.sportsLevel.football = action.payload.level
                    break;
                case "basketball":
                    state.sportsLevel.basketball = action.payload.level
                    break;
                case "badminton":
                    state.sportsLevel.badminton = action.payload.level
                    break;
            }
        },
        setMyTeam(state, action: myTeamAction) {
            state.myTeam.push(action.payload)
        },
        setStatusMessage(state, action: statusMessageAction) {
            state.statusMessage = action.payload
        },
        setFavoritePlace(state, action: FavoritePlaceAction) {
            state.favoritePlace = action.payload
        }
    }
})

export const {
    setNickname,
    setName,
    setFavoriteTime,
    setFavoriteSports,
    setSportsLevel,
    setMyTeam,
    setStatusMessage,
    setFavoritePlace,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;