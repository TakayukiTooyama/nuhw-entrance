import type { FirebaseTimestamp } from 'utils/firebase';

//==============================
// ユーザー情報
//==============================

// ユーザー認証情報
export type UserAuth = {
  uid: string;
  displayName: string | null;
};

// ユーザー詳細情報
export type UserInfo = {
  gender: '男' | '女';
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2';
  block: '短距離' | '長距離' | '投擲' | '跳躍' | 'トレーナー';
  role: 'admin' | 'user';
};

// usersテーブルの状態(基本的にはこれを使う)
export type User = UserAuth & UserInfo;

//==============================
// 大会エントリー
//==============================

// 大会情報
export type Tournament = Omit<TimeStamp, 'addedAt'> & {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  events: Event[];
  expense: Expense;
};

// 大会種目情報
export type Event = {
  id: string;
  name: string;
  type: 'individual' | 'group';
};

/*
  個人種目か団体種目によって集金金額が変わってくる
  この型にはそれぞれの金額が入る
*/
export type Expense = {
  individual: number;
  group: number;
};

// ユーザーのエントリー状況
export type Entry = Pick<TimeStamp, 'addedAt'> & {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  events: Event[];
  expense: Expense;
};

//==============================
// 大会会場やホテルに向かう交通手段を
// 選手に投票で決めてもらう
//==============================
/*
  バス移動のデータ
  turn = 便
  busNumber = 号車
  departureTime = 定員
*/
export type BusData = {
  id: number;
  turn: number;
  busNumber: number;
  departureTime: string;
};

// 車移動のデータ
export type CarData = {
  id: number;
  carName: string;
};

// 移動希望投票の型
export type Vote = {
  id: string;
  name: string;
  day: number;
  course: 'going' | 'comingBack';
  buses?: BusData;
  cars: CarData;
};

// FirestoreのcreatedAt, updatedAt, addedAtの型
export type TimeStamp = {
  createdAt: typeof FirebaseTimestamp;
  updatedAt: typeof FirebaseTimestamp;
  addedAt: typeof FirebaseTimestamp;
};
