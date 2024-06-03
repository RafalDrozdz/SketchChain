import { BaseAvatar, BaseAvatarFallback } from "@/components/Base/BaseAvatar";
import HostIcon from "@/components/Icons/HostIcon";

interface Props extends Player {
  host: boolean;
}

export default async function RoomPlayer({ id, nick, host }: Props) {
  const firstLetter = nick.at(0)?.toUpperCase();
  const preparedNick = nick.substring(0, 8);
  return (
    <div className="relative flex flex-col items-center min-w-24">
      {host ? (
        <HostIcon
          size={0.4}
          className="absolute top-1 z-10"
          color="#ffc156"
        />
      ) : null}
      <BaseAvatar id={`player-${id}`}>
        <BaseAvatarFallback>{firstLetter}</BaseAvatarFallback>
      </BaseAvatar>
      {preparedNick}
    </div>
  );
}
