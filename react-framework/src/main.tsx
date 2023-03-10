import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import store from './stores/store';
import './index.css';
import { UserDefaultPage, DefaultPage, StartDefaultPage, WhiteBackGroundPage } from './pages/DefaultPages';
import HomePage from './pages/home/HomePage';
import MatchPage from './pages/match/MatchPage';

import persistStore from 'redux-persist/es/persistStore';
import LoginPage from './pages/user/LoginPage';
import LoginRegistPage from './pages/user/LoginRegistPage';
import LoginFailPage from './pages/user/LoginFailPage';
import LoginSuccessPage from './pages/user/LoginSuccessPage';
import RegisterCompletePage from './pages/user/RegisterCompletePage';
import ChattingListPage from './pages/chatting/ChattingListPage';
import ChattingRoomPage from './pages/chatting/ChattingRoomPage';
import MatchDetailPage from './pages/match/MatchDetailPage';
import MatchRegisterPage from './pages/match/MatchRegisterPage';
import MenuListPage from './pages/menu/MenuListPage';
import ProfilePage from './pages/menu/profile/ProfilePage';
import RankPage from './pages/menu/RankPage';
import MatchListPage from './pages/menu/MatchListPage';
import MyTeamPage from './pages/menu/myTeam/MyTeamPage';
import MyTeamDetailPage from './pages/menu/myTeam/MyTeamDetailPage';
import TeamCreateDefaultPage from './pages/menu/teamCreate/TeamCreateDefaultPage';
import TeamMatchRegisterPage from './pages/teamMatch/TeamMatchRegisterPage';
import TeamMatchDetailPage from './pages/teamMatch/TeamMatchDeatilPage';
import TeamMatchGamePage from './pages/teamMatch/TeamMatchGamePage';
import TeamMatchPage from './pages/teamMatch/TeamMatchPage';
import StartPage from './pages/start/StartPage';
import TestLoginPage from './pages/test/TestLoginPage';



declare global {
  interface Window {
    setAccess_tokenOnFlutterApp: Function;
    fcmForegroundOnFlutterApp: Function;
    isFluttApp: Boolean;
  }
}

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <StartDefaultPage />,
    children: [
      {
        path: '',
        element: <StartPage />,
      },
    ]
  },
  {
    path: '/',
    element: <DefaultPage />,
    children: [
      // ?????? ?????????
      {
        path: 'home',
        element: <HomePage />,
      }
      ,
      // ?????? ?????????
      {
        path: 'gather',
        element: <MatchPage />,
      },
      {
        path: 'gather/detail/:matchId',
        element: <MatchDetailPage />,
      },
      {
        path: 'gather/register',
        element: <MatchRegisterPage />,
      },

      // ??? ?????? ?????????
      {
        path: 'team-match',
        element: <TeamMatchPage />
      },
      {
        path: 'team-match/register',
        element: <TeamMatchRegisterPage />
      },
      {
        path: 'team-match/detail/:teamMatchId',
        element: <TeamMatchDetailPage />
      },
      {
        path: 'team-match/join/:teamMatchId',
        element: <TeamMatchGamePage />
      },

      // ?????? ??????(?????????, ??????, ??????, ???, ?????????)
      {
        path: 'menu/',
        element: <MenuListPage />,
      },
      {
        path: 'menu/profile',
        element: <ProfilePage />,
      },
      {
        path: 'menu/rank',
        element: <RankPage />,
      },
      {
        path: 'menu/match',
        element: <MatchListPage />,
      },
      {
        path: 'menu/team',
        element: <MyTeamPage />,
      },
      {
        path: 'menu/team/:teamId',
        element: <MyTeamDetailPage />,
      },

      // ??????
      {
        path: 'chatting/',
        element: <ChattingListPage />,
      },
      {
        path: 'chatting/room/:roomId',
        element: <ChattingRoomPage />,
      },
    ]
  },
  {
    path: '/',
    element: <UserDefaultPage />,
    children: [
      {
        // '????????? ???????????? ?????????' ????????? ?????? ????????? ?????????
        path: 'login',
        element: <LoginPage />,
      },
      // ??? ????????? ?????? ??????????????? ????????? ???????????? ?????????
      {
        // ????????????, ????????????, ???????????? ?????? ???
        path: 'login/regist',
        element: <LoginRegistPage />,
      },
      {
        // ????????? ?????? ?????????
        path: 'login/fail',
        element: <LoginFailPage />,
      },
      {
        // ????????? ???????????? ????????? ???????????? ???????????? ??? Redirect??? URL
        path: 'login/success',
        element: <LoginSuccessPage />,
      },
      {
        path: 'login/register/complete',
        element: <RegisterCompletePage />,
      },
      {
        path: 'test/login',
        element: <TestLoginPage />,
      }
    ],
  },
  {
    // ????????? ??????????????? ????????? ??? ??????????????? ?????? ???????????? ??????
    path: '/',
    element: <WhiteBackGroundPage />,
    children: [
      {
        path: 'menu/team/create',
        element: <TeamCreateDefaultPage />,
      },
    ],
  },

]);

createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
