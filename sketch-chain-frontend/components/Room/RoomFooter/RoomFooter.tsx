import { RoomInviteBtn, RoomStartGameBtn } from "@/components";
interface Props {
  id: string;
}

export default function RoomFooter({ id }: Props) {
  return (
    <div className="flex gap-6 w-full flex-grow items-end py-4">
      <RoomInviteBtn id={id} />
      <RoomStartGameBtn id={id} />
    </div>
  );
}
