export enum HeadType {
  ASSET = "ASSET",
  LIABILITY = "LIABILITY",
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface AccountLimits {
  dailylimit?: {
    count?: number;
    amount?: number;
  };
  monthlylimit?: {
    count?: number;
    amount?: number;
  };
  weeklylimit?: {
    count?: number;
    amount?: number;
  };
  minwalletamount?: number;
  maxwalletamount?: number;
}

export interface AccountLimitsForm {
  dailyLimitCount?: number;
  dailyLimitAmount?: number ;
  monthlyLimitCount?: number ;
  monthlyLimitAmount?: number  ;
  weeklyLimitCount?: number ;
  weeklyLimitAmount?: number ;
  minWalletAmount?: number  ;
  maxWalletAmount?: number  ;
}

export enum AccountStatus {
  OPEN = "OPEN",
  LIMITED_ACTIVE = "LIMITED_ACTIVE",
  FULL_ACTIVE = "FULL_ACTIVE",
  ON_HOLD = "ON HOLD",
  BLACKLISTED = "BLACKLISTED",
  CLOSED = "CLOSED",
}

