import { ConnectedCreateRoomForm } from "@/components/Home";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations();
  return (
    <main className="flex flex-col gap-6 items-center">
      <h1 className="text-4xl font-bold text-background drop-shadow-title">
        {t("createGame")}
      </h1>
      <ConnectedCreateRoomForm />
    </main>
  );
}
