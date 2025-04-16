"use client"
import { AccountLimits, AccountLimitsForm } from "@/types/Accounting";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputField from "../InputField";
import { createTkForForms } from "@/utils/PoysaUtil";

interface Props {
  limits?: AccountLimits;
  setLimitFormData: Dispatch<SetStateAction<AccountLimitsForm>>;
  excludeWalletLimits?: boolean;
}

function LimitForm({ limits, setLimitFormData, excludeWalletLimits = false }: Props) {

  const [internalState, setInternalState] = useState<AccountLimitsForm>({
    dailyLimitCount: limits?.dailylimit?.count,
    dailyLimitAmount: createTkForForms(limits?.dailylimit?.amount),
    monthlyLimitCount: limits?.monthlylimit?.count,
    monthlyLimitAmount: createTkForForms(limits?.monthlylimit?.amount),
    weeklyLimitCount: limits?.weeklylimit?.count,
    weeklyLimitAmount: createTkForForms(limits?.weeklylimit?.amount),
    minWalletAmount: createTkForForms(limits?.minwalletamount),
    maxWalletAmount: createTkForForms(limits?.maxwalletamount),
  });
  
  useEffect(() => {
    setLimitFormData(internalState);
  }, [internalState]);

  const updateForm = <K extends keyof AccountLimitsForm>(
    key: K,
    value: AccountLimitsForm[K]
  ) => {
    setInternalState((prevData) => {
      return {
        ...prevData,
        [key]: value,
      };
    });
  };

  return (
    <>
      <div className="flex flex-row justify-between gap-4">
        <div className="w-1/2">
          <InputField
            label="Daily Transaction Limit Count"
            id="dailyLimitCount"
            name="dailyLimitCount"
            type="number"
            value={internalState?.dailyLimitCount}
            onChange={(e) =>
              updateForm("dailyLimitCount", parseInt(e.target.value))
            }
          />
        </div>

        <div className="w-1/2">
          <InputField
            label="Daily Transaction Limit Amount"
            id="dailyLimitAmount"
            name="dailyLimitAmount"
            type="number"
            value={internalState?.dailyLimitAmount}
            onChange={(e) =>
              updateForm("dailyLimitAmount", parseInt(e.target.value))
            }
          />
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="w-1/2">
          <InputField
            label="Monthly Transaction Limit Count"
            id="monthlyLimitCount"
            name="monthlyLimitCount"
            type="number"
            value={internalState?.monthlyLimitCount}
            onChange={(e) =>
              updateForm("monthlyLimitCount", parseInt(e.target.value))
            }
          />
        </div>

        <div className="w-1/2">
          <InputField
            label="Monthly Transaction Limit Amount"
            id="monthlyLimitAmount"
            name="monthlyLimitAmount"
            type="number"
            value={internalState?.monthlyLimitAmount}
            onChange={(e) =>
              updateForm("monthlyLimitAmount", parseInt(e.target.value))
            }
          />
        </div>
      </div>


      <div className="flex flex-row justify-between gap-4">
        <div className="w-1/2">
          <InputField
            label="Weekly Transaction Limit Count"
            id="weeklyLimitCount"
            name="weeklyLimitCount"
            type="number"
            value={internalState?.weeklyLimitCount}
            onChange={(e) =>
              updateForm("weeklyLimitCount", parseInt(e.target.value))
            }
          />
        </div>

        <div className="w-1/2">
          <InputField
            label="Weekly Transaction Limit Amount"
            id="weeklyLimitCount"
            name="weeklyLimitCount"
            type="number"
            value={internalState?.weeklyLimitAmount}
            onChange={(e) =>
              updateForm("weeklyLimitAmount", parseInt(e.target.value))
            }
          />
        </div>
      </div>

      {!excludeWalletLimits && (
        <div className="flex flex-row justify-between gap-4">
          <div className="w-1/2">
            <InputField
              label="Minimum Wallet Amount"
              id="minWalletAmount"
              name="minWalletAmount"
              type="number"
              value={internalState?.minWalletAmount}
              onChange={(e) =>
                updateForm("minWalletAmount", parseInt(e.target.value))
              }
            />
          </div>

          <div className="w-1/2">
            <InputField
              label="Maximum Wallet Amount"
              id="maxWalletAmount"
              name="maxWalletAmount"
              type="number"
              value={internalState?.maxWalletAmount}
              onChange={(e) =>
                updateForm("maxWalletAmount", parseInt(e.target.value))
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default LimitForm;
