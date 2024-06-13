import { ConnectedJoinRoomForm } from "@/components";
import { useTranslations } from "next-intl";

interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default function RoomInvite({ params: { id } }: Props) {
  const t = useTranslations();

  return (
    <main className="flex flex-col gap-6 items-center">
      <h1 className="text-4xl font-bold text-background drop-shadow-title">
        {t("joinGame")}
      </h1>
      <ConnectedJoinRoomForm id={id} />
    </main>
  );
}
