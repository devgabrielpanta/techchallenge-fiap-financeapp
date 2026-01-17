import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="margin-bottom: 20px; color: #333;">
        PDF Viewer (Angular)
      </h2>
      <p style="color: #666; margin-bottom: 15px;">
        Visualizador de PDFs desenvolvido em Angular
      </p>
      <div style="padding: 20px; background: #f5f5f5; border-radius: 4px;">
        <p style="color: #999; font-size: 14px;">
          Este componente será implementado posteriormente para visualização de PDFs.
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // Listener para mensagens do backoffice
    window.addEventListener('message', (event: MessageEvent) => {
      // IMPORTANTE: Validar origem em produção
      // if (event.origin !== 'http://localhost:3000') return;

      if (event.data.type === 'VIEW_PDF') {
        console.log('Viewing PDF:', event.data.fileId);
      }
    });
  }
}
