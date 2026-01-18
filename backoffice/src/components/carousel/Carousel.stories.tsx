import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { CoverflowCarousel } from "./Carousel";
import CarouselItem from "./CarouselItem";

/* -------------------------------------------
  Custom Docs Page — esta função renderiza a página de Docs.
------------------------------------------- */
function DocsPage() {
  const codeUsage = `
    import { CoverflowCarousel } from "@/components/carousel/Carousel";

    export default function Home() {
      return <CoverflowCarousel />;
    }
    `.trim();

  const filePath = "src/components/carousel/Carousel.tsx";

  return (
    <main
      style={{ fontFamily: "Inter, sans-serif", padding: 24, maxWidth: 980 }}
    >
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>Carousel — Coverflow</h1>
        <p style={{ color: "#555", marginTop: 8 }}>
          O <strong>CoverflowCarousel</strong> é um carrossel baseado em
          Swiper.js, ideal para destacar cards, produtos e conteúdos visuais com
          efeito coverflow. Ele já possui breakpoints para mobile, tablet e
          desktop.
        </p>
      </header>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>✅ Quando usar</h2>
        <ul>
          <li>Cards informativos com foco visual</li>
          <li>Listagem de produtos em destaque</li>
          <li>Carrosséis com preview central e efeito 3D</li>
        </ul>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          🎛️ Configurações internas
        </h2>
        <ul>
          <li>
            <strong>slidesPerView</strong>: 2 / 3 / 5 via breakpoints
          </li>
          <li>
            <strong>effect</strong>: coverflow
          </li>
          <li>
            <strong>autoplay</strong>: ativado (delay 3000ms)
          </li>
          <li>
            <strong>loop</strong>: habilitado
          </li>
          <li>
            <strong>pagination</strong>: bullets clicáveis
          </li>
          <li>
            <strong>cards</strong>: estão definidos em <code>fakeCards</code>
          </li>
        </ul>
        <div
          style={{
            marginTop: 10,
            padding: 12,
            background: "#f3f3f3",
            borderRadius: 6,
            color: "#8c8c8c97",
          }}
        >
          <strong>Para alterar comportamento:</strong>
          <div style={{ marginTop: 8 }}>
            Edite o arquivo <code>{filePath}</code> e ajuste as props do Swiper.
          </div>
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>🧾 Uso</h2>
        <pre
          style={{
            background: "#0f1724",
            color: "#f8fafc",
            padding: 12,
            borderRadius: 6,
            overflowX: "auto",
          }}
        >
          <code>{codeUsage}</code>
        </pre>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>
          🔎 Exemplo no Storybook
        </h2>
        <p style={{ color: "#555", marginTop: 6 }}>
          A visualização abaixo é o componente rodando no contexto do Storybook.
        </p>

        <div
          style={{
            marginTop: 12,
            padding: 16,
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.06)",
            background: "#fff",
          }}
        >
          <CoverflowCarousel />
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>⚠️ Observações</h2>
        <ul>
          <li>
            O componente não recebe props públicas; os cards estão em{" "}
            <code>fakeCards</code>.
          </li>
          <li>
            Se precisar variar dados para testes no Storybook, crie uma story
            auxiliar que injete dados alternativos.
          </li>
        </ul>
      </section>
    </main>
  );
}

const meta = {
  title: "Components/Carousel",
  component: CoverflowCarousel,
  subcomponents: { CarouselItem },

  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => <DocsPage />,
    },
  },

  tags: ["autodocs"],
} satisfies Meta<typeof CoverflowCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Carousel: Story = {
  render: () => <CoverflowCarousel />,
};
