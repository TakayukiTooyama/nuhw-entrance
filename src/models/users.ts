import firebase from 'firebase/compat/app';

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
  furigana: string;
  email: string;
  teamId: string;
  gender: '男' | '女';
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2' | 'コーチ';
  block:
    | '短距離'
    | '長距離'
    | '投擲'
    | '跳躍'
    | 'マネージャー'
    | 'トレーナー'
    | 'コーチ';
  role: '管理者' | '選手' | 'マネージャー' | 'トレーナー' | 'コーチ';
};

// usersテーブルの状態(基本的にはこれを使う)
export type User = UserAuth & UserInfo & Pick<TimeStamp, 'createdAt'>;

// ユーザーがエントリーした大会の情報
export type Entry = {
  name: string;
  furigana: string;
  gender: '男' | '女';
  grade: '1年' | '2年' | '3年' | '4年' | '院1' | '院2' | 'コーチ';
  tournamentId: string;
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  timeLimit: Date;
  eventsInfo: EventInfo[];
} & Pick<TimeStamp, 'addedAt'>;

//=============================
// チーム情報
//=============================

// チームの詳細情報
export type TeamInfo = {
  name: string;
  password: string;
};

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
  expense: EventExpense;
  view: boolean;
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
export type EventExpense = {
  individual: number;
  group: number;
};

//==============================
// フォーム
//==============================
// フォームでのユーザー詳細情報
export type UserInfoInForm = Omit<UserInfo, 'teamId'>;

// フォームでのチーム詳細情報
export type TeamInfoInForm = TeamInfo & {
  passwordConfirmation: string;
};

// 初回ログイン時のプロフィール作成入力項目
export type CreateProfileFormInput = Omit<UserInfo, 'grade' | 'teamId'> &
  Pick<TimeStamp, 'createdAt'>;

// ユーザーによるエントリーフォームの入力項目
export type EntryFormInput = {
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

//==============================
// 用具・ユニフォーム
//==============================
export type LinkContent = {
  id: string;
  link: string;
  name: string;
  image: string;
};

export type OrderSize =
  | '選択'
  | 'XS(SS)'
  | 'S'
  | 'M'
  | 'L'
  | 'O(XL,LL)'
  | 'XO(2XL)'
  | '2XO(3XL)'
  | '3XO(4XL)'
  | '4XO(5XL)'
  | '5XO(6XL)'
  | '6XO(7XL)'
  | '7XO(8XL)'
  | '8XO(9XL)'
  | '9XO(10XL)';

// 採寸結果を入力する項目
export type UniformFormInput = {
  windBreakerUp: OrderSize;
  windBreakerDown: OrderSize;
  jerseyUp: OrderSize;
  jerseyDown: OrderSize;
  runningShirt: OrderSize;
  runningPants: OrderSize;
  separateTop: OrderSize;
  separateShorts: OrderSize;
  navyPinkTights: OrderSize;
  whiteTights: OrderSize;
  halfPants: OrderSize;
  poloShirt: OrderSize;
  navyPinkTshirt: OrderSize;
  lightBlueTshirt: OrderSize;
};

// ユニフォーム管理リストの詳細情報
export type UniformCardInfo = {
  name: string;
  timeLimit: Date;
} & Pick<TimeStamp, 'createdAt'>;

// 発注済のユニフォーム情報(スプレッドシートに送るデータ)
export type Order = {
  id: number;
  name: string;
  size: OrderSize | '';
};
export type UniformInfo = {
  formId: string;
  title: string;
  name: string;
  gender: '男' | '女';
  order: Order[];
  orderDate: string;
} & Pick<TimeStamp, 'addedAt'>;

// ユニフォームの種類
type CommonUniform =
  | 'ウィンドブレーカー上'
  | 'ウィンドブレーカー下'
  | 'ジャージ上'
  | 'ジャージ下'
  | 'ランシャツ'
  | 'ランパン'
  | 'ハーフパンツ'
  | 'ポロシャツ'
  | '紺ピンクTシャツ'
  | '水色Tシャツ';

export type MaleUniform = CommonUniform | 'タイツ(白)';

export type FemaleUniform =
  | CommonUniform
  | 'セパレートトップ'
  | 'セパレートショーツ'
  | 'タイツ(紺ピンク) 12cm';

type CommonUniformId =
  | 'windBreakerUp'
  | 'windBreakerDown'
  | 'jerseyUp'
  | 'jerseyDown'
  | 'runningShirt'
  | 'runningPants'
  | 'halfPants'
  | 'poloShirt'
  | 'navyPinkTshirt'
  | 'lightBlueTshirt';

export type MaleUniformId = CommonUniformId | 'whiteTights';

export type FemaleUniformId =
  | CommonUniformId
  | 'separateTop'
  | 'separateShorts'
  | 'navyPinkTights';

//==============================
// タイムスタンプ
//==============================

export type TimeStamp = {
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  addedAt: firebase.firestore.Timestamp;
};
