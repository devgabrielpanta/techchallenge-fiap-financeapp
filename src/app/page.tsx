"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { formatCurrency } from "@/lib/utils";
import {
  Eye,
  EyeOff,
  CirclePlus,
  DollarSign,
  CreditCard,
  PiggyBank,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransactionModal } from "@/context/TransactionModalProvider";
import { CoverflowCarousel } from "@/components/carousel/Carousel";

export default function HomePage() {
  const { user } = useUser();
  const { startCreateTransaction } = useTransactionModal();
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const fakeCards = [
    {
      id: 1,
      icon: <CreditCard size={36} className="text-white" />,
      title: "Cartão de Crédito",
      description: "Controle seus gastos e aproveite benefícios exclusivos.",
      bg: "bg-blue-500",
    },
    {
      id: 2,
      icon: <PiggyBank size={36} className="text-white" />,
      title: "Poupança Fácil",
      description: "Economize automaticamente sem complicações.",
      bg: "bg-green-500",
    },
    {
      id: 3,
      icon: <DollarSign size={36} className="text-white" />,
      title: "Investimentos",
      description: "Invista de forma simples e segura direto pelo app.",
      bg: "bg-purple-500",
    },
    {
      id: 4,
      icon: <Activity size={36} className="text-white" />,
      title: "Extrato Digital",
      description: "Acompanhe todas as movimentações em tempo real.",
      bg: "bg-orange-500",
    },
    {
      id: 5,
      icon: <CreditCard size={36} className="text-white" />,
      title: "Empréstimos",
      description: "Solicite empréstimos com taxas competitivas.",
      bg: "bg-red-500",
    },
    {
      id: 6,
      icon: <PiggyBank size={36} className="text-white" />,
      title: "Meta de Economia",
      description: "Defina metas e acompanhe seu progresso facilmente.",
      bg: "bg-teal-500",
    },
    {
      id: 7,
      icon: <DollarSign size={36} className="text-white" />,
      title: "Pagamento Rápido",
      description: "Pague contas e boletos sem complicação.",
      bg: "bg-yellow-500",
    },
    {
      id: 8,
      icon: <Activity size={36} className="text-white" />,
      title: "Resumo Semanal",
      description: "Veja um resumo de suas finanças toda semana.",
      bg: "bg-pink-500",
    },
    {
      id: 9,
      icon: <CreditCard size={36} className="text-white" />,
      title: "Benefícios",
      description: "Aproveite ofertas exclusivas e cashback.",
      bg: "bg-indigo-500",
    },
    {
      id: 10,
      icon: <PiggyBank size={36} className="text-white" />,
      title: "Conta Digital",
      description: "Abra sua conta em minutos e sem burocracia.",
      bg: "bg-lime-500",
    },
  ];

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

      <CoverflowCarousel
        items={fakeCards.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg ${card.bg} text-white shadow-lg`}
            style={{ width: "220px", height: "220px" }}
          >
            {card.icon}
            <h3 className="font-semibold text-lg text-center">{card.title}</h3>
            <p className="text-sm text-center">{card.description}</p>
          </div>
        ))}
      />
    </div>
  );
}
