import Router from 'next/router';

import type { UserInfo } from '@/models/users';
import { db } from '@/utils/firebase';

const usersRef = db.collection('users');

// 新しいユーザーの認証情報をDBに追加
export const registerUserAuth = async (
  uid: string,
  email: string
): Promise<void> => {
  await usersRef
    .doc(uid)
    .set({ uid, email }, { merge: true })
    .then(() => {
      Router.push('/team/profile');
    });
};

/*
  Google認証後の画面遷移
  初回 → チーム参加画面
  以外 → ホーム画面
*/
export const navigationAfterAuth = async (
  uid: string,
  email: string
): Promise<void> => {
  await usersRef
    .doc(uid)
    .get()
    .then((doc) => {
      const data = doc.data() as UserInfo;
      if (data && data.teamId) {
        Router.push('/');
      } else {
        registerUserAuth(uid, email);
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
  if (userInfo && !userInfo.block) {
    Router.push('/team/profile');
  }
  if (userInfo.block && !userInfo.teamId) {
    Router.push('/team/join');
    return;
  }
};
