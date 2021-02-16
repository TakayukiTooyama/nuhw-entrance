import firebase from 'firebase/app';

/*
  下記の型定義には必要なidが定義されていない型があります。
  しかし、これは意図してやっており、swr-firestoreには
  {exists: false, hasPendingWrites: false, id: "~~"}といった
  独自の型がデフォルトで定義されている。
  また、docのidと同じものidをセットしてしまうと警告が出されるため外している。
*/

//==============================
// ユーザー情報
//==============================

// ユーザー認証情報
export type UserAuth = {
  uid: string;
};

// ユーザー詳細情報
export type UserInfo = {
  name: string;
  teamId: string;
  gender: '男' | '女';
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2' | 'コーチ';
  block: '短距離' | '長距離' | '投擲' | '跳躍' | 'トレーナー' | 'コーチ';
  role: '管理者' | '選手' | 'マネージャー' | 'トレーナー' | 'コーチ';
};

// usersテーブルの状態(基本的にはこれを使う)
export type User = UserAuth & UserInfo & Pick<TimeStamp, 'createdAt'>;

// ユーザーがエントリーした大会の情報
export type Entry = {
  name: string;
  gender: '男' | '女';
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2' | 'コーチ';
  tournamentId: string;
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  timeLimit: Date;
  eventsInfo: EventInfo[];
  expense: Expense;
  totalExpenses: number;
  isPayment: boolean;
} & Pick<TimeStamp, 'addedAt'>;

//=============================
// チーム情報
//=============================

// チームの詳細情報
export type TeamInfo = {
  name: string;
  password: string;
} & Pick<TimeStamp, 'createdAt' | 'updatedAt'>;

//==============================
// 大会エントリー
//==============================

// チームの参加する大会情報
export type Tournament = {
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  timeLimit: Date;
  events: Event[];
  expense: Expense;
} & Pick<TimeStamp, 'createdAt' | 'updatedAt'>;

// 大会種目情報
export type EventInfo = {
  id: number;
  name: Event;
  entryRecord: string;
  expense: number;
};

// 大会種目
export type Event =
  | '100m'
  | '200m'
  | '300m'
  | '400m'
  | '800m'
  | '100mH'
  | '110mH'
  | '400mH'
  | '1500m'
  | '3000m'
  | '5000m'
  | '10000m'
  | '3000mSC'
  | '5000m競歩'
  | '10000m競歩'
  | '走幅跳'
  | '三段跳'
  | '走高跳'
  | '棒高跳'
  | '砲丸投'
  | '円盤投'
  | 'ハンマー投'
  | 'やり投'
  | '十種競技'
  | '七種競技'
  | '4×100リレー'
  | '4×400リレー';

//個人種目と団体種目それぞれの金額
export type Expense = {
  individual: number;
  group: number;
};

//==============================
// フォーム
//==============================
// フォームでのユーザー詳細情報
export type UserInfoInForm = Omit<UserInfo, 'teamId'>;

// 初回ログイン時のプロフィール作成入力項目
export type CreateProfileFormInput = Omit<UserInfo, 'grade' | 'teamId'> &
  Pick<TimeStamp, 'createdAt'>;

// ユーザーによるエントリーフォームの入力項目
export type EntryFormInput = {
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2' | 'コーチ';
  events: Event[];
};

// 管理者によるエントリーフォーム作成時の入力項目
export type CreateEntryFormInput = {
  name: string;
  individualExpense: number;
  groupExpense: number;
  startDate: Date;
  endDate: Date;
  timeLimit: Date;
  events: Event[];
};

export type VoteFormInput = {
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2' | 'コーチ';
  rideInfo: '';
};

export type CreateVoteFormInput = {
  name: string;
  day: string;
  course: '行き' | '帰り';
  timeLimit: Date;
};

//==============================
// 大会会場やホテルに向かう交通手段を
// 選手に投票で決めてもらう
//==============================

// 管理者が作った遠征時の移動方法
export type Expedition = {
  tournamentId: string;
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  day: string;
  course: '行き' | '帰り';
  busInfo: BusInfo[];
  carInfo: CarInfo[];
  timeLimit: Date;
};

/*
  バス移動のデータ
  turn = 便
  busNumber = 号車
  departureTime = 出発時間
  capacity = 定員
*/
export type BusInfo = {
  turn: string;
  busNumber: string;
  departureTime: string;
  capacity: string;
};

// 車移動のデータ
export type CarInfo = {
  carName: string;
};

// 移動希望投票の型
export type Vote = {
  name: string;
  gender: '男' | '女';
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2' | 'コーチ';
  tournamentId: string;
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  day: string;
  course: '行き' | '帰り';
  busInfo: BusInfo | '';
  carInfo: CarInfo | '';
};

//==============================
// タイムスタンプ
//==============================

export type TimeStamp = {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  addedAt: firebase.firestore.Timestamp;
};
