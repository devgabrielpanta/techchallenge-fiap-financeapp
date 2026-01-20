import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import ReduxProvider from "../src/context/ReduxProvider";
import { ReduxHydration } from "../src/context/ReduxHydration";

import { transactionList } from "../src/utils/transactionsData";
import { user } from "../src/utils/appUtils";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },

    a11y: {
      test: "todo",
    },
  },
  decorators: [
    (Story, { parameters }) => {
      const { pageLayout } = parameters;
      switch (pageLayout) {
        default:
          return (
            <ReduxProvider>
              <ReduxHydration transactions={transactionList} />
              <Story />
            </ReduxProvider>
          );
      }
    },
  ],
};

export default preview;
