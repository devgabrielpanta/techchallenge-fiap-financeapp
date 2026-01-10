import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import { TransactionModalProvider } from "../src/context/TransactionModalProvider";
import { UserProvider } from "../src/context/UserContext";
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
            <UserProvider user={user}>
              <TransactionModalProvider>
                <Story />
              </TransactionModalProvider>
            </UserProvider>
          );
      }
    },
  ],
};

export default preview;
