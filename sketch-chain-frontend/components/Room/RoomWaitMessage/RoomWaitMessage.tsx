import { BaseLoader } from "@/components/Base";
import { useTranslations } from "next-intl";

const RoomWaitMessage = () => {
  const t = useTranslations();

  return (
    <div className="flex w-full flex-grow items-end py-4 ">
      <p className="flex gap-2 items-center justify-center w-full font-bold">
        <BaseLoader />
        {t("waitingForTheHostToStartGame")}
      </p>
    </div>
  );
};

export default RoomWaitMessage;
