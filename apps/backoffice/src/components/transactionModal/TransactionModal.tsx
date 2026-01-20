"use client";

import { Button } from "@/components/ui/button/Button";
import {
  operationsData,
  OperationType,
  TransactionType,
} from "@/schemas/dataSchema";
import { X, CopyPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setUser,
  setFeedbackError,
  setFeedbackSuccess,
} from "@/store/slices/globalSlice";
import {
  setTransactionData,
  cleanTransactionModal,
  cloneTransaction,
} from "@/store/slices/transactionSlice";
import { Label } from "@/components/ui/label/Label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group/RadioGroup";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group/InputGroup";
import { validateNewCategory } from "@/utils/appUtils";

const formatCurrencyInput = (value: string) => {
  // Remove tudo que não é número
  const numericValue = value.replace(/\D/g, "");
  // Converte para número com centavos
  const numberValue = Number(numericValue) / 100;

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const TransactionModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.global.user);
  const transactionAction = useSelector(
    (state: RootState) => state.transaction.transactionAction,
  );
  const transactionData = useSelector(
    (state: RootState) => state.transaction.transactionData,
  );

  const [displayAmount, setDisplayAmount] = useState(
    formatCurrencyInput(String(transactionData?.amount) || "0"),
  );
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<{
    fileId: string;
    fileName: string;
    fileSize: number;
    fileData?: string;
  } | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [addingCategory, setAddingCategory] = useState<boolean>(false);
  const [newCategoryError, setNewCategoryError] = useState<string>("");

  const handleSubmit = async () => {
    if (!transactionData) return;
    // Validações
    if (transactionData.category === "") {
      dispatch(setFeedbackError("Categoria não pode estar vazia"));
      return;
    }
    if (addingCategory) {
      const isValid = handleNewCategory(transactionData.category);
      if (!isValid) return;
    }

    let updatedTransactions: TransactionType[] | [] = user.transactionList;
    let attachmentToSave = uploadedFile;

    // Se há um novo arquivo com dados, salva no servidor
    if (uploadedFile?.fileData) {
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileId: uploadedFile.fileId,
            fileName: uploadedFile.fileName,
            fileData: uploadedFile.fileData,
          }),
        });

        if (!response.ok) {
          alert("Erro ao salvar arquivo");
          return;
        }

        attachmentToSave = {
          fileId: uploadedFile.fileId,
          fileName: uploadedFile.fileName,
          fileSize: uploadedFile.fileSize,
        };
      } catch (error) {
        console.error("Error saving file:", error);
        alert("Erro ao salvar arquivo");
        return;
      }
    }

    if (transactionAction === "create") {
      const newTransaction = {
        ...transactionData,
        id: new Date().getTime(),
        attachment: attachmentToSave || undefined,
      };
      updatedTransactions = [newTransaction, ...user.transactionList];
    } else if (transactionAction === "edit") {
      const originalTransaction = user.transactionList.find(
        (t) => t.id === transactionData.id,
      );

      // Se o arquivo foi removido ou substituído, deleta o antigo
      if (
        originalTransaction?.attachment?.fileId &&
        originalTransaction.attachment.fileId !== uploadedFile?.fileId
      ) {
        try {
          await fetch("/api/upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileId: originalTransaction.attachment.fileId,
            }),
          });
        } catch (error) {
          console.error("Error deleting old file:", error);
        }
      }

      updatedTransactions = user.transactionList.map((t) =>
        t.id === transactionData.id
          ? ({
              ...transactionData,
              attachment: attachmentToSave || undefined,
            } as TransactionType)
          : t,
      );
    }

    // (serialização) Garantir que a data esteja no formato ISO antes de salvar
    updatedTransactions = updatedTransactions.map((t) => ({
      ...t,
      date: new Date(t.date).toISOString(),
    }));

    dispatch(
      setUser({
        ...user,
        transactionList: updatedTransactions,
      }),
    );
    dispatch(
      setFeedbackSuccess(
        transactionAction === "create"
          ? "Transação adicionada com sucesso"
          : "Alterações armazenadas com sucesso",
      ),
    );
    handleCloseModal();
  };

  useEffect(() => {
    setIframeReady(false);
    if (transactionAction === "edit" && transactionData) {
      setDisplayAmount(
        formatCurrencyInput(String(transactionData.amount * 100)),
      );
      setUploadedFile(transactionData.attachment || null);
    } else if (transactionAction === "create") {
      setDisplayAmount(formatCurrencyInput("0"));
      setUploadedFile(null);
    }
  }, [transactionAction]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!iframeReady || !iframeRef.current?.contentWindow) return;

    try {
      if (transactionAction === "edit" && transactionData?.attachment) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "LOAD_ATTACHMENT",
            attachment: transactionData.attachment,
          },
          "http://localhost:4200",
        );
      } else if (transactionAction === "create") {
        iframeRef.current.contentWindow.postMessage(
          { type: "CLEAR_ATTACHMENT" },
          "http://localhost:4200",
        );
      }
    } catch (error) {
      console.error("Error sending message to iframe:", error);
    }
  }, [iframeReady, transactionAction, transactionData?.attachment]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== "http://localhost:4200") return;

      if (event.data.type === "FILE_UPLOADED") {
        setUploadedFile({
          fileId: event.data.fileId,
          fileName: event.data.fileName,
          fileSize: event.data.fileSize,
          fileData: event.data.fileData,
        });
      } else if (event.data.type === "FILE_REMOVED") {
        setUploadedFile(null);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // toda vez que displayAmount muda → atualiza transactionData.amount (como número)
  useEffect(() => {
    if (!transactionData) return;
    if (displayAmount === "") {
      dispatch(setTransactionData({ ...transactionData, amount: 0 }));
      return;
    }

    // remove tudo que não for número ou vírgula
    const cleaned = displayAmount.replace(/[^\d,]/g, "");
    // substitui vírgula por ponto
    const normalized = cleaned.replace(",", ".");
    const parsed = parseFloat(normalized);

    dispatch(
      setTransactionData({
        ...transactionData,
        amount: isNaN(parsed) ? 0 : parsed,
      }),
    );
  }, [displayAmount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!transactionData || transactionAction !== "edit") return;
    const originalTransaction = user.transactionList.find(
      (t) => t.id === transactionData.id,
    );
    if (!originalTransaction) return;

    const attachmentChanged =
      originalTransaction.attachment?.fileId !== uploadedFile?.fileId;

    // Verifica se houve mudanças comparando os campos
    const changed =
      originalTransaction.category !== transactionData.category ||
      originalTransaction.type !== transactionData.type ||
      originalTransaction.operation !== transactionData.operation ||
      originalTransaction.description !== transactionData.description ||
      originalTransaction.amount !== transactionData.amount ||
      originalTransaction.currency !== transactionData.currency ||
      new Date(originalTransaction.date).toISOString() !==
        new Date(transactionData.date).toISOString() ||
      attachmentChanged;
    setHasChanges(changed);
  }, [transactionData, transactionAction, uploadedFile]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = () => {
    if (!transactionData || transactionAction !== "edit") return;
    const updatedTransactions = user.transactionList.filter(
      (t) => t.id !== transactionData.id,
    );

    dispatch(
      setUser({
        ...user,
        transactionList: updatedTransactions,
      }),
    );

    handleCloseModal();
  };

  const formatDateForInput = (date: string | Date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleCloseModal = () => {
    setDisplayAmount(formatCurrencyInput("0"));
    setAddingCategory(false);
    dispatch(cleanTransactionModal());
  };

  const handleNewCategory = (category: string): boolean => {
    const error = validateNewCategory(category);
    if (error.length > 0) {
      handleCategoryError(error);
      dispatch(setFeedbackError(error));
      return false;
    }
    setNewCategoryError("");
    return true;
  };

  const categoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleCategoryError = (message: string) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }

    setNewCategoryError(message);

    categoryTimeoutRef.current = setTimeout(() => {
      setNewCategoryError("");
    }, 4000);
  };

  if (transactionAction === null || transactionData === null) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
      onClick={handleCloseModal}
    >
      <div
        className="bg-[var(--color-surface)] rounded-[var(--radius-md)] w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()} // <- isso impede o fechamento ao clicar dentro
      >
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-md)] w-full max-w-md p-6 relative">
          <button
            className="absolute -top-8 -right-8 bg-[var(--color-surface)] hover:text-[var(--color-primary)] text-[var(--color-text)] hover:text-[var(--color-white)] rounded-full p-2 shadow-md transition-colors"
            onClick={handleCloseModal}
          >
            <X size={20} />
          </button>

          <div className="flex flex-row justify-between items-center mb-8">
            <h2 className="text-lg font-semibold text-[var(--color-primary)]">
              {transactionAction === "create"
                ? "Adicionar nova transação"
                : "Editar transação"}
            </h2>
            {transactionAction !== "create" && (
              <button
                className="flex flex-col items-center gap-2 cursor-pointer hover:text-[var(--color-primary)]"
                onClick={() => dispatch(cloneTransaction())}
              >
                <CopyPlus size={20} />
                <span className="text-xs font-light">duplicar</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {/* VALOR */}
            <InputGroup className="relative mt-5 w-60 h-fit mx-auto border-[var(--color-border)] rounded-md">
              <Label
                className="absolute -top-5 left-0 text-sm font-medium text-[var(--color-text)]"
                htmlFor="email"
              >
                Valor
              </Label>
              <InputGroupInput
                type="text"
                value={displayAmount}
                onChange={(e) =>
                  setDisplayAmount(formatCurrencyInput(e.target.value))
                }
              />
              {/* ENTRADA / SAÍDA */}
              <InputGroupAddon align="inline-end">
                <RadioGroup
                  defaultValue={transactionData.type}
                  onValueChange={(value) => {
                    dispatch(
                      setTransactionData({
                        ...transactionData,
                        type: value as "saidas" | "entradas",
                      }),
                    );
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="saidas" id="saidas" />
                    <Label htmlFor="saidas" className="text-red-500">
                      Saída
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entradas" id="entradas" />
                    <Label htmlFor="entradas" className="text-green-500">
                      Entrada
                    </Label>
                  </div>
                </RadioGroup>
              </InputGroupAddon>
            </InputGroup>

            <div className="grid grid-cols-2 gap-4">
              {/* DATA */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Data
                </label>
                <input
                  id="date"
                  type="date"
                  value={
                    transactionData?.date
                      ? formatDateForInput(transactionData.date)
                      : ""
                  }
                  onChange={(e) =>
                    dispatch(
                      setTransactionData({
                        ...transactionData,
                        date: e.target.value,
                      }),
                    )
                  }
                  className="p-2 border border-[var(--color-border)] rounded-md w-full"
                />
              </div>

              {/* TIPO DE PAGAMENTO */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="paymentType"
                  className="text-sm font-medium text-[var(--color-text)]"
                >
                  Tipo de pagamento
                </label>
                <select
                  id="paymentType"
                  value={transactionData.operation}
                  onChange={(e) =>
                    dispatch(
                      setTransactionData({
                        ...transactionData,
                        operation: e.target.value as OperationType,
                      }),
                    )
                  }
                  className="p-2 border border-[var(--color-border)] rounded-md w-full"
                >
                  {operationsData.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SELECT DE CATEGORIA */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="text-sm font-medium text-[var(--color-text)]"
              >
                Categoria
              </label>
              {/* Input se estiver adicionando categoria */}
              {addingCategory ? (
                <>
                  <input
                    name="category"
                    className="p-2 w-full flex flex-row gap-2 items-center
                  border border-[var(--color-border)] rounded-md"
                    type="text"
                    placeholder="Nova categoria"
                    value={transactionData.category}
                    onChange={(e) => {
                      dispatch(
                        setTransactionData({
                          ...transactionData,
                          category: e.target.value,
                        }),
                      );
                    }}
                  />
                  <p className="text-[var(--color-error)] text-sm text-center md:text-left mt-1 font-semibold">
                    {newCategoryError}
                  </p>
                </>
              ) : (
                <select
                  id="category"
                  name="category"
                  value={transactionData.category}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue === "add-category") {
                      setAddingCategory(true);
                      dispatch(
                        setTransactionData({
                          ...transactionData,
                          category: "",
                        }),
                      );
                    } else {
                      dispatch(
                        setTransactionData({
                          ...transactionData,
                          category: e.target.value,
                        }),
                      );
                    }
                  }}
                  className="p-2 border border-[var(--color-border)] rounded-md w-full"
                >
                  <option disabled value="">
                    Selecione...
                  </option>
                  {Array.from(
                    new Set(user.transactionList.map((t) => t.category)),
                  ).map((category) => (
                    <option key={`categoryOption-${category}`} value={category}>
                      {category}
                    </option>
                  ))}
                  <option
                    className="bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-secondary)] focus:ring-[var(--color-primary)]"
                    value="add-category"
                  >
                    + Adicionar Categoria
                  </option>
                </select>
              )}
            </div>

            {/* ANEXAR DOCUMENTO */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[var(--color-text)]">
                Anexar Documento
              </label>
              <div className="relative w-full h-[60px]">
                <iframe
                  ref={iframeRef}
                  src="http://localhost:4200/upload"
                  className="w-full h-full border-0"
                  title="Upload de Documento"
                  style={{
                    overflow: "hidden",
                    opacity: iframeReady ? 1 : 0,
                    transition: "opacity 0.15s ease-in",
                  }}
                  loading="eager"
                  onLoad={() => setIframeReady(true)}
                />
              </div>
            </div>

            <div
              className={`flex flex-row gap-2 items-center mt-4 ${
                transactionAction === "create" ? "justify-center" : "w-full"
              }`}
            >
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={transactionAction === "edit" && !hasChanges}
                className={`disabled:opacity-40 ${
                  transactionAction === "edit" ? "flex-1" : ""
                }`}
              >
                {transactionAction === "create"
                  ? "Adicionar"
                  : "Salvar Alterações"}
              </Button>
              {transactionAction === "edit" && (
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className="flex-1"
                >
                  Excluir transação
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
