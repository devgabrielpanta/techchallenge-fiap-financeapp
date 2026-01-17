"use client";

import { useEffect, useRef, useState } from "react";

interface PostMessageEvent {
  type: string;
  fileId?: string;
  transactionId?: string;
  error?: string;
}

export default function UploadPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [fileId, setFileId] = useState<string | null>(null);

  useEffect(() => {
    // Listener para receber mensagens do microfrontend via postMessage
    const handleMessage = (event: MessageEvent<PostMessageEvent>) => {
      // IMPORTANTE: Validar origem em produção
      // if (event.origin !== 'http://localhost:4200') return;

      const { type, fileId, transactionId, error } = event.data;

      switch (type) {
        case "FILE_UPLOADED":
          setUploadStatus("success");
          setFileId(fileId || null);
          console.log("File uploaded:", { fileId, transactionId });
          break;
        case "FILE_ERROR":
          setUploadStatus("error");
          console.error("Upload error:", error);
          break;
        case "NAVIGATION_REQUEST":
          // Exemplo: redirecionar baseado em ação do microfrontend
          console.log("Navigation requested:", transactionId);
          break;
        default:
          console.log("Unknown message type:", type);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Enviar mensagem para o microfrontend (exemplo)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendMessageToMicrofrontend = (data: Record<string, any>) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        data,
        "http://localhost:4200" // URL do uploader
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-[--color-primary]">
          Upload de Documentos
        </h1>
        {uploadStatus === "success" && (
          <p className="text-green-600 mt-2">
            Arquivo enviado com sucesso! ID: {fileId}
          </p>
        )}
        {uploadStatus === "error" && (
          <p className="text-red-600 mt-2">Erro no upload do arquivo.</p>
        )}
      </div>

      {/* iframe integrando o microfrontend uploader */}
      <iframe
        ref={iframeRef}
        src="http://localhost:4200?transaction-id=123"
        className="w-full flex-1 border-0 rounded-lg min-h-[600px]"
        title="Uploader Microfrontend"
        allow="camera; microphone; geolocation"
      />

      {/* Exemplo: Botão para enviar mensagem ao microfrontend */}
      <button
        onClick={() =>
          sendMessageToMicrofrontend({
            type: "INIT_UPLOAD",
            userId: "user123",
          })
        }
        className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-white rounded hover:opacity-90 transition-opacity"
      >
        Inicializar Upload
      </button>
    </div>
  );
}
