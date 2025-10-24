"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { formatCurrency } from "@/lib/utils";

export default function ExtractPage() {
  const { user } = useUser();

  // Filtros
  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Paginação e carregamento infinito
  const [visibleCount, setVisibleCount] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Detecta se é mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filtragem dos dados
  const filteredList = user.transactionList.filter((t) => {
    if (!searchTerm) return true;

    const term = searchTerm.toLowerCase();

    switch (filterType) {
      case "tipo":
        return t.operation.toLowerCase().includes(term);
      case "instituicao":
        return t.bank.toLowerCase().includes(term);
      case "valor":
        return formatCurrency(t.amount).includes(term);
      case "data":
        return new Date(t.date).toLocaleDateString("pt-BR").includes(term);
      default:
        return (
          t.operation.toLowerCase().includes(term) ||
          t.bank.toLowerCase().includes(term)
        );
    }
  });

  // Paginação
  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedList = isMobile
    ? filteredList.slice(0, visibleCount)
    : filteredList.slice(startIndex, endIndex);

  // Aplica carregamento infinito no mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && visibleCount < filteredList.length) {
        setTimeout(() => {
          setVisibleCount((prev) => prev + 5);
        }, 600);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, visibleCount, filteredList.length]);

  // Troca de página na tabela no desktop
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <h1 className="text-xl lg:text-3xl font-semibold text-[var(--color-primary)]">
        Extrato
      </h1>

      {/* Filtros */}
      <div className="flex gap-2 mb-4 flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Pesquise por uma transação..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border border-[var(--color-border)] rounded-md w-full
          text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]
          bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
        />

        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border border-[var(--color-border)] rounded-md text-[var(--color-text)] bg-[var(--color-surface)]"
        >
          <option value="">Filtrar por...</option>
          <option value="tipo">Tipo de pagamento</option>
          <option value="instituicao">Nome/Instituição</option>
          <option value="valor">Valor</option>
          <option value="data">Data</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-md border border-[var(--color-border)]">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[var(--color-surface)] text-[var(--color-text-muted)]">
            <tr>
              <th className="border-b border-[var(--color-border)] p-2 w-[15%] text-left">
                Tipo
              </th>
              <th className="border-b border-[var(--color-border)] p-2 w-[55%] text-left">
                Instituição
              </th>
              <th className="border-b border-[var(--color-border)] p-2 w-[15%] text-left">
                Valor
              </th>
              <th className="border-b border-[var(--color-border)] p-2 w-[10%] text-left">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((t) => (
              <tr
                key={t.id}
                className="border-b border-[var(--color-border)] 
                transition-colors duration-200 
                hover:bg-[var(--color-hover)] cursor-pointer"
              >
                <td className="p-2">{t.operation}</td>
                <td className="p-2">{t.bank}</td>
                <td className="p-2">{formatCurrency(t.amount)}</td>
                <td className="p-2">
                  {new Date(t.date).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação no Desktop */}
      {!isMobile && totalItems > 0 && (
        <div className="flex justify-between items-center mt-2 flex-wrap gap-3">
          <span className="text-sm text-[var(--color-text-muted)]">
            Exibindo {startIndex + 1}–{endIndex} de {totalItems} itens
          </span>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md bg-[var(--color-surface)] transition-colors duration-200 
              ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[var(--color-hover)] cursor-pointer"
              }`}
            >
              Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md bg-[var(--color-surface)] transition-colors duration-200
              ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[var(--color-hover)] cursor-pointer"
              }`}
            >
              Próxima
            </button>
          </div>
        </div>
      )}

      {/* Indicador de carregamento no mobile */}
      {isMobile && visibleCount < filteredList.length && (
        <div className="text-center text-[var(--color-text-muted)] py-4">
          Carregando mais transações...
        </div>
      )}
    </div>
  );
}
