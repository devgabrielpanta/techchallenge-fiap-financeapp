"use client";

import * as React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { TransactionType, BusinessUnitType } from "@/schemas/dataSchema";

type Hierarchy = {
  [businessUnit: string]: {
    [category: string]: string[];
  };
};

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
  const [businessUnits, setBusinessUnits] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  function generateHierarchicalFilters(
    transactionsList: typeof transactions
  ): Hierarchy {
    return transactionsList.reduce((acc, tx) => {
      const bu = tx["business-unit"];
      const cat = tx.category;
      const sub = tx.subcategory;

      if (!acc[bu]) {
        acc[bu] = {};
      }

      if (!acc[bu][cat]) {
        acc[bu][cat] = [];
      }

      if (!acc[bu][cat].includes(sub)) {
        acc[bu][cat].push(sub);
      }

      return acc;
    }, {} as Hierarchy);
  }

  const filters = generateHierarchicalFilters(transactions);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const businessList: string[] = [];
      transactions.forEach((transaction) => {
        if (!businessList.includes(transaction["business-unit"])) {
          businessList.push(transaction["business-unit"]);
        }
      });

      const categoryList: string[] = [];
      transactions.forEach((transaction) => {
        if (!categoryList.includes(transaction.category)) {
          categoryList.push(transaction.category);
        }
      });

      const subcategoryList: string[] = [];
      transactions.forEach((transaction) => {
        if (!subcategoryList.includes(transaction.subcategory)) {
          subcategoryList.push(transaction.subcategory);
        }
      });

      setBusinessUnits(businessList);
      setCategories(categoryList);
      setSubcategories(subcategoryList);
    }
  }, [transactions]);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: "business-unit" | "category" | "subcategory"
  ) => {
    const { value, checked } = e.target;
    let updatedFilters: TransactionType[] = [];
    if (checked) {
      updatedFilters = [
        ...filteredTransactions,
        ...transactions.filter(
          (transaction) => transaction[filterType] === value
        ),
      ];
    } else {
      updatedFilters = filteredTransactions.filter(
        (transaction) => transaction[filterType] !== value
      );
    }

    setFilteredTransactions(updatedFilters);
  };

  return (
    <Drawer open={openFilters} onOpenChange={setOpenFilters} direction="right">
      <DrawerContent className="overflow-y-auto overflow-x-hidden">
        <DrawerHeader className="text-left">
          <DrawerTitle>Filtros</DrawerTitle>
          <DrawerDescription>
            Selecione os campos que deseja exibir
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-6">
          {Object.entries(filters).map(([bu, categories]) => (
            <div key={bu} className="mt-4">
              <div className="flex flex-row justify-start items-center gap-2">
                <Checkbox
                  id={`business-unit-${bu}`}
                  checked={filteredTransactions.some(
                    (transaction) => transaction["business-unit"] === bu
                  )}
                  onCheckedChange={(e) =>
                    handleCheckboxChange(
                      {
                        target: { value: bu, checked: e as boolean },
                      } as React.ChangeEvent<HTMLInputElement>,
                      "business-unit"
                    )
                  }
                />
                <Label
                  className="font-bold text-xl"
                  htmlFor={`business-unit-${bu}`}
                >
                  {bu}
                </Label>
              </div>
              <hr className="h-0.5 bg-primary/40" />
              {Object.entries(categories).map(([cat, subs]) => (
                <div key={cat} className="my-2">
                  <div className="flex flex-row justify-start items-center gap-2 ml-4 mb-1">
                    <Checkbox
                      id={`category-${cat}`}
                      checked={filteredTransactions.some(
                        (transaction) => transaction.category === cat
                      )}
                      onCheckedChange={(e) =>
                        handleCheckboxChange(
                          {
                            target: { value: cat, checked: e as boolean },
                          } as React.ChangeEvent<HTMLInputElement>,
                          "category"
                        )
                      }
                    />
                    <Label
                      className="font-semibold text-md"
                      htmlFor={`category-${bu}`}
                    >
                      {cat}
                    </Label>
                  </div>
                  {subs.map((sub) => (
                    <div
                      key={sub}
                      className="flex flex-row justify-start items-center gap-2 ml-10"
                    >
                      <Checkbox
                        id={`subcategory-${sub}`}
                        checked={filteredTransactions.some(
                          (transaction) => transaction.subcategory === sub
                        )}
                        onCheckedChange={(e) =>
                          handleCheckboxChange(
                            {
                              target: { value: sub, checked: e as boolean },
                            } as React.ChangeEvent<HTMLInputElement>,
                            "subcategory"
                          )
                        }
                      />
                      <Label
                        className="font-regular text-sm"
                        htmlFor={`subcategory-${bu}`}
                      >
                        {sub}
                      </Label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
