"use client";
import { useTransactionModal } from "@/context/TransactionModalProvider";
import { Button } from "@/components/ui/button/button";
import { CirclePlus } from "lucide-react";

export default function BtnQuickAdd() {
  const { startCreateTransaction } = useTransactionModal();
  return (
    <div
      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[260px] md:w-full
        p-4 border-t border-[var(--color-border)]
        "
    >
      <Button
        variant="primary"
        className="w-full flex items-center justify-center gap-2"
        onClick={startCreateTransaction}
      >
        <CirclePlus size={18} /> Nova transação
      </Button>
    </div>
  );
}
