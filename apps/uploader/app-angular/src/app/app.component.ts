import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: false,
  template: `
    <div class="upload-container">
      <div *ngIf="!uploadedFileName" class="upload-wrapper">
        <input
          #fileInput
          type="file"
          accept=".pdf"
          (change)="onFileSelected($event)"
          class="file-input"
          id="pdf-upload"
        />
        <label for="pdf-upload" class="upload-button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          Selecionar arquivo
        </label>
        <p class="helper-text">Nenhum arquivo selecionado</p>
      </div>

      <div *ngIf="uploadedFileName" class="file-display">
        <div class="file-info">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
            ></path>
            <polyline points="13 2 13 9 20 9"></polyline>
          </svg>
          <span class="file-name" [title]="uploadedFileName">{{
            uploadedFileName
          }}</span>
        </div>
        <button
          (click)="removeFile()"
          class="remove-button"
          type="button"
          title="Remover arquivo"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .upload-container {
        width: 100%;
      }

      .upload-wrapper {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .file-input {
        display: none;
      }

      .upload-button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background-color: #6d28d9;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
        width: fit-content;
      }

      .upload-button:hover {
        background-color: rgba(125, 48, 250, 1);
      }

      .file-display {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px;
        background-color: transparent;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
      }

      .file-info {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }

      .file-info svg {
        flex-shrink: 0;
        color: #374151;
      }

      .file-name {
        font-size: 0.875rem;
        font-weight: 500;
        color: #1f1f23;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }

      .remove-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        background: none;
        border: none;
        color: #ef4444;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
        flex-shrink: 0;
      }

      .remove-button:hover {
        background-color: #fee2e2;
      }

      .helper-text {
        font-size: 13px;
        color: #6b7280;
        margin: 0;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;
  uploadedFileName: string = "";

  ngOnInit(): void {
    console.log("Angular upload component loaded");

    // Listener para receber dados do anexo do backoffice
    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:3000") return;

      if (event.data.type === "LOAD_ATTACHMENT") {
        // Carrega o anexo existente
        this.uploadedFileName = event.data.attachment.fileName;
      } else if (event.data.type === "CLEAR_ATTACHMENT") {
        // Limpa o anexo
        this.uploadedFileName = "";
        if (this.fileInput) {
          this.fileInput.nativeElement.value = "";
        }
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Por favor, selecione apenas arquivos PDF");
      return;
    }

    this.uploadedFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      window.parent.postMessage(
        {
          type: "FILE_UPLOADED",
          fileId: `file_${Date.now()}`,
          fileName: file.name,
          fileSize: file.size,
          fileData: base64,
        },
        "http://localhost:3000",
      );
    };
    reader.readAsDataURL(file);
  }

  removeFile(): void {
    this.uploadedFileName = "";
    if (this.fileInput) {
      this.fileInput.nativeElement.value = "";
    }

    window.parent.postMessage(
      {
        type: "FILE_REMOVED",
      },
      "http://localhost:3000",
    );
  }
}
