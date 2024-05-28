import { BaseInput, BaseButton, CreateRoomForm } from "@/components";
import { ConnectedCreateRoomForm } from "@/components/Home";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations();
  return (
    <main>
      <ConnectedCreateRoomForm />
    </main>
  );
}
