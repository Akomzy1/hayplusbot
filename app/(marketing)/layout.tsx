import { TopNav } from "@/components/marketing/top-nav";
import { Footer } from "@/components/marketing/footer";
import { TelegramButton } from "@/components/marketing/telegram-button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <main id="main">{children}</main>
      <Footer />
      <TelegramButton />
    </>
  );
}
