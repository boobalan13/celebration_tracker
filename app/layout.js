import "./globals.css";
import ConditionalLayout from "./ConditionalLayout";

export const metadata = {
  title: "Personal Celebration Tracker",
  description: "Track your birthdays, anniversaries, and more!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
