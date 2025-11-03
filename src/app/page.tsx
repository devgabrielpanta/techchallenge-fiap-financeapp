"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { formatCurrency } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  CirclePlus,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { useRouter } from "next/navigation";
import { useTransactionModal } from "@/context/TransactionModalProvider";
import { CoverflowCarousel } from "@/components/carousel/Carousel";


export default function HomePage() {
  const { user } = useUser();
  const { startCreateTransaction } = useTransactionModal();
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  return (
    <div className="flex flex-col h-full gap-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-lg lg:text-2xl font-semibold text-[--color-primary]">
          Olá, {user.name}! :)
        </h1>
        <span className="capitalize">
          {user.date.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="max-w-md ">
        <p className="text-[--color-text-muted] mb-2">Saldo disponível</p>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-semibold text-[--color-primary]">
            {visible ? formatCurrency(user.accountBalance) : "R$ ••••••••••"}
          </p>
          <button
            onClick={() => setVisible(!visible)}
            className="p-1 text-[var(--color-primary)] transition-colors cursor-pointer"
            aria-label={visible ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-4 lg:hidden">
        <div className="flex flex-col items-center gap-1">
          <Button
            variant="primary"
            className="rounded-full w-13 h-13 p-0 flex items-center justify-center"
            onClick={startCreateTransaction}
          >
            <CirclePlus size={30} />
          </Button>
          <p className="text-[10px]">Nova transação</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            variant="primary"
            className="rounded-full w-13 h-13 p-0 flex items-center justify-center"
            onClick={() => router.push("/extract")}
          >
            <DollarSign size={30} />
          </Button>
          <p className="text-[10px]">Ver extrato</p>
        </div>
      </div>

      <CoverflowCarousel />
    </div>
  );
}
