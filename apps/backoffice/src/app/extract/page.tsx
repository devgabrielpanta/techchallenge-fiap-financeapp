"use client";
import ExtractCard from "@/components/extract/ExtractCard";
import { columns } from "@/components/transactions-table/TransactionsColumn";
import TransactionsFilters from "@/components/transactions-table/TransactionsFilters";
import { DataTable } from "@/components/transactions-table/TransactionsTable";
import { Button } from "@/components/ui/button/Button";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command/Command";
import { createCategoryTransaction } from "@/store/slices/transactionSlice";

export default function ExtractPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Transações
  const transactions = useSelector(
    (state: RootState) => state.global.user.transactionList,
  );
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [paginatedList, setPaginatedList] = useState(transactions);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [openFilters, setOpenFilters] = useState(false);

  // Paginação e carregamento infinito
  const [visibleCount, setVisibleCount] = useState(10);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dialog de adicionar por categoria
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  // Detecta se é mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filtragem dos dados
  useEffect(() => {
    if (searchTerm.length === 0) {
      return setFilteredTransactions(transactions);
    }
    const filteredList = transactions.filter((t) => {
      const term = searchTerm.toLowerCase();
      const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const isNumber = numbers.includes(term[0]);
      if (isNumber) {
        return (
          t.amount.toString().includes(term) ||
          new Date(t.date).toLocaleDateString("pt-BR").includes(term)
        );
      }
      return (
        t.operation.toLowerCase().includes(term) ||
        t.category.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term)
      );
    });
    setFilteredTransactions(filteredList);
  }, [searchTerm, transactions]); //eslint-disable-line react-hooks/exhaustive-deps

  // Paginação
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  useEffect(() => {
    const paginatedListData = isMobile
      ? filteredTransactions.slice(0, visibleCount)
      : filteredTransactions.slice(startIndex, endIndex);
    setPaginatedList(paginatedListData);
  }, [filteredTransactions, currentPage]); //eslint-disable-line react-hooks/exhaustive-deps

  // Aplica carregamento infinito no mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && visibleCount < filteredTransactions.length) {
        setTimeout(() => {
          setVisibleCount((prev) => prev + 5);
        }, 600);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, visibleCount, filteredTransactions.length]);

  // Troca de página na tabela no desktop
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Fecha o dialog e inicia a criação por categoria
  const startAddingToCategory = (category: string) => {
    setOpenCategoryDialog(false);
    dispatch(createCategoryTransaction(category));
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <h1 className="text-xl lg:text-3xl font-semibold text-[var(--color-primary)]">
        Extrato
      </h1>

      <div className="relative container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 space-y-2">
          {/** Dialog de adicionar por categoria */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end w-full h-fit">
            <Button
              className=""
              onClick={() => setOpenCategoryDialog(true)}
              aria-haspopup="dialog"
              aria-expanded={openCategoryDialog}
            >
              Adicionar transação por categoria
            </Button>

            <CommandDialog
              open={openCategoryDialog}
              onOpenChange={setOpenCategoryDialog}
              aria-labelledby="category-dialog-title"
            >
              <h2 id="category-dialog-title" className="sr-only">
                Selecionar categoria de transação
              </h2>

              <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                <label htmlFor="category-search" className="sr-only">
                  Pesquisar categoria
                </label>
                <CommandInput
                  id="category-search"
                  placeholder="Presquisar por uma categoria..."
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {Array.from(new Set(transactions.map((t) => t.category))).map(
                    (category) => (
                      <CommandItem
                        key={`cmd-item-${category}`}
                        onSelect={() => startAddingToCategory(category)}
                        className="group cursor-pointer hover:bg-[var(--color-hover)] active:bg-[var(--color-hover)]"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            startAddingToCategory(category);
                          }
                        }}
                      >
                        <span className="font-medium group-hover:font-semibold group-active:font-semibold group-hover:text-[var(--color-primary)] group-active:text-[var(--color-primary)]">
                          {category}
                        </span>
                      </CommandItem>
                    ),
                  )}
                </CommandList>
              </Command>
            </CommandDialog>
          </div>

          <div className="order-2 md:order-1 flex gap-2 mb-4 flex-row justify-between md:justify-start items-center">
            {/** Search bar */}
            <label htmlFor="search-transactions" className="sr-only">
              Pesquisar transações
            </label>
            <input
              type="text"
              id="search-transactions"
              placeholder="Pesquisar..."
              aria-label="Pesquisar transações"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="p-2 border border-[var(--color-border)] rounded-md w-full md:w-96
              text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]
              bg-[var(--color-surface)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
            />
            {/** Filtros */}
            <Button
              variant="outline"
              className="p-2 border border-[var(--color-border)] rounded-md text-[var(--color-text)] bg-[var(--color-surface)] cursor-pointer gap-2"
              onClick={() => setOpenFilters(true)}
            >
              <span className="hidden md:block">Filtros</span>
              <SlidersHorizontal />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border border-[var(--color-border)]">
          <div className="hidden md:block">
            <DataTable columns={columns} data={paginatedList} />
          </div>
          <div className="block md:hidden">
            {paginatedList.length > 0 &&
              paginatedList.map((transaction, index) => (
                <ExtractCard
                  key={`extract-${transaction.id}-${index}`}
                  transaction={transaction}
                />
              ))}
          </div>
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
                aria-label="Página anterior"
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
                aria-label="Próxima página"
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
        {isMobile && visibleCount < filteredTransactions.length && (
          <div
            role="status"
            aria-live="polite"
            className="text-center text-[var(--color-text-muted)] py-4"
          >
            Carregando mais transações...
          </div>
        )}
      </div>

      {/** Sidebar com opções de filtros */}
      {openFilters && (
        <TransactionsFilters
          transactions={transactions}
          filteredTransactions={filteredTransactions}
          setFilteredTransactions={setFilteredTransactions}
          openFilters={openFilters}
          setOpenFilters={setOpenFilters}
        />
      )}
    </div>
  );
}
