import { TeamInfo, UserInfo, UserInfoInForm } from 'models/users';
import Router from 'next/router';
import { db } from 'utils/firebase';

const usersRef = db.collection('users');
const teamsRef = db.collection('teams');

// 新しいユーザーの認証情報をDBに追加
export const registerUserAuth = async (uid: string): Promise<void> => {
  await usersRef
    .doc(uid)
    .set({ uid })
    .then(() => {
      Router.push('/team/join');
    });
};

/*
  Google認証後の画面遷移
  初回 → チーム参加画面
  以外 → ホーム画面
*/
export const navigationAfterAuth = async (uid: string): Promise<void> => {
  await usersRef
    .doc(uid)
    .get()
    .then((doc) => {
      const data = doc.data() as UserInfo;
      if (data && data.role) {
        Router.push('/');
      } else {
        registerUserAuth(uid);
      }
    });
};

/*
  チーム情報とプロフィール情報をすでに持っている場合(ログアウト後 & 起動時) → ホーム画面に遷移
  アカウント認証のみ行った場合 → チーム情報入力画面に遷移
  チーム情報だけ入力して間違って戻ってしまった場合 → プロフィール画面に遷移
*/
export const screenTransition = (userInfo: UserInfo): void => {
  if (userInfo.block && userInfo.teamId) {
    Router.push('/');
    return;
  }
  if (!userInfo.teamId) {
    Router.push('team/join');
    return;
  }
  if (!userInfo.block) {
    Router.push('/team/profile');
  }
};

// 新しいユーザーの認証情報をDBに追加
export const userJoinToTeam = async (
  uid: string,
  password: string,
  setSubmitting: (isSubmitting: boolean) => void,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  setSubmitting(true);
  setErrorMessage('');

  await teamsRef
    .doc('Vwn4SWU3FsqSbqIU7mKy')
    .get()
    .then(async (doc) => {
      const data = doc.data() as TeamInfo;
      if (data.password === password) {
        await usersRef
          .doc(uid)
          .set({ teamId: 'Vwn4SWU3FsqSbqIU7mKy' }, { merge: true })
          .then(() => {
            Router.push('/team/profile');
          });
      } else {
        setSubmitting(false);
        setErrorMessage('パスワードが間違っています');
      }
    });
};

// 初回ログイン時のプロフィール作成
export const createProfile = async (
  uid: string,
  profileData: Omit<UserInfoInForm, 'grade'>
): Promise<void> => {
  await usersRef
    .doc(uid)
    .set(profileData, { merge: true })
    .then(() => {
      Router.push('/');
    });
};
