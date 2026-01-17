import React, { useEffect, useState } from "react";

export default function App() {
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    // Obter parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const tid = urlParams.get("transaction-id");
    if (tid) setTransactionId(tid);

    // Listener para mensagens do backoffice
    const handleMessage = (event) => {
      // IMPORTANTE: Validar origem em produção
      // if (event.origin !== 'http://localhost:3000') return;

      if (event.data.type === "INIT_UPLOAD") {
        console.log("Initializing upload for:", event.data.userId);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleFileUpload = (file) => {
    if (!file) return;

    // Simular upload (substituir por implementação real)
    setTimeout(() => {
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Enviar mensagem para o backoffice via postMessage
      window.parent.postMessage(
        {
          type: "FILE_UPLOADED",
          fileId,
          transactionId,
          fileName: file.name,
          fileSize: file.size,
        },
        "http://localhost:3000" // URL do backoffice
      );
    }, 1000);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        Upload de PDFs (React)
      </h2>
      {transactionId && (
        <p style={{ marginBottom: "15px", color: "#666" }}>
          Transaction ID: {transactionId}
        </p>
      )}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "100%",
            maxWidth: "400px",
          }}
        />
      </div>
      <p style={{ color: "#999", fontSize: "14px" }}>
        Selecione um arquivo PDF para fazer upload
      </p>
    </div>
  );
}
