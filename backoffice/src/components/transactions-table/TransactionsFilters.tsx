"use client";

import { Button } from "@/components/ui/button/Button";
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer/Drawer";
import { Label } from "@/components/ui/label/Label";
import type { TransactionType } from "@/schemas/dataSchema";
import * as React from "react";

type FilterSchema = {
  category: string[];
  type: string[];
  operation: string[];
};

function generateFilters(transactionsList: TransactionType[]) {
  const category = new Set<string>();
  const type = new Set<string>();
  const operation = new Set<string>();

  transactionsList.forEach((tx) => {
    category.add(tx.category);
    type.add(
      tx.type.replace("entradas", "Entradas").replace("saidas", "Saídas"),
    );
    operation.add(tx.operation);
  });

  const filters: FilterSchema = {
    type: Array.from(type),
    category: Array.from(category),
    operation: Array.from(operation),
  };

  return filters;
}

export default function TransactionsFilters({
  transactions,
  filteredTransactions,
  setFilteredTransactions,
  openFilters,
  setOpenFilters,
}: {
  transactions: TransactionType[];
  filteredTransactions: TransactionType[];
  setFilteredTransactions: React.Dispatch<
    React.SetStateAction<TransactionType[]>
  >;
  openFilters: boolean;
  setOpenFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const filters = generateFilters(transactions);

  const handleCheckboxChange = (
    value: string,
    checked: boolean | "indeterminate",
    filterType: "category" | "type" | "operation",
  ) => {
    let updatedFilters: TransactionType[] = [];
    if (checked) {
      updatedFilters = [
        ...filteredTransactions,
        ...transactions.filter(
          (transaction) => transaction[filterType] === value,
        ),
      ];
    } else {
      updatedFilters = filteredTransactions.filter(
        (transaction) => transaction[filterType] !== value,
      );
    }
    setFilteredTransactions(updatedFilters);
  };

  return (
    <Drawer open={openFilters} onOpenChange={setOpenFilters} direction="right">
      <DrawerContent className="overflow-y-auto overflow-x-hidden">
        <DrawerHeader className="text-left">
          <DrawerTitle>Filtros</DrawerTitle>
          <DrawerDescription>Selecione os campos desejados</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-6 px-4">
          {Object.keys(filters).map((obj) => {
            const group =
              obj === "category"
                ? "Categoria"
                : obj === "type"
                  ? "Natureza do pagamento"
                  : "Tipo de pagamento";
            return (
              <div key={obj}>
                <h4 className="text-lg font-bold text-[var(--color-text-muted)] ">
                  {group}
                </h4>
                <hr className="mb-2 border-primary" />
                <ul className="flex flex-col gap-2">
                  {filters[obj as keyof FilterSchema].map((filter) => {
                    const transactionFilter = filter
                      .replace("Entradas", "entradas")
                      .replace("Saídas", "saidas");
                    return (
                      <li
                        key={filter}
                        className="flex flex-row justify-start items-center gap-2"
                      >
                        <Checkbox
                          className=""
                          id={filter}
                          checked={filteredTransactions.some((transaction) =>
                            transaction[obj as keyof FilterSchema].includes(
                              transactionFilter,
                            ),
                          )}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              transactionFilter,
                              checked,
                              obj as "category" | "type" | "operation",
                            )
                          }
                        />
                        <Label className="text-sm font-normal" htmlFor={filter}>
                          {filter}
                        </Label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
            >
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
