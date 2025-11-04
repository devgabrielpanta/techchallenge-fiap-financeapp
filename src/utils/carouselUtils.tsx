import { DollarSign, CreditCard, PiggyBank, Activity } from "lucide-react";

export interface CardItemProps {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  bg: string;
}

export const fakeCards: CardItemProps[] = [
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
