import type { Preview } from "@storybook/nextjs-vite";
import "src/app/globals.css";
import { UserProvider } from "../src/context/UserContext";
import { TransactionModalProvider } from "../src/context/TransactionModalProvider";
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
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
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
