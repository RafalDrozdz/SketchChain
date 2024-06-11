import {
  BaseAvatar,
  BaseAvatarFallback,
  BaseAvatarImage,
} from "@/components/Base/BaseAvatar";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props extends Player {
  host: boolean;
}

export default function RoomPlayer({ id, nick, host }: Props) {
  const firstLetter = nick.at(0)?.toUpperCase();
  const preparedNick = nick.substring(0, 8);
  return (
    <div className="flex flex-col items-center min-w-24 ">
      <div className="relative">
        {host ? (
          <FontAwesomeIcon
            icon={faCrown}
            className="absolute z-10 -bottom-0.5 left-0 text-[#d4a62c] text-xs bg-background p-1 rounded-full aspect-square border-2"
          />
        ) : null}
        <BaseAvatar
          id={`player-${id}`}
          className="relative">
          <BaseAvatarImage
            src={`/images/avatars/${Math.floor(Math.random() * 40)}.svg`}
          />
          <BaseAvatarFallback>{firstLetter}</BaseAvatarFallback>
        </BaseAvatar>
      </div>
      {preparedNick}
    </div>
  );
}
