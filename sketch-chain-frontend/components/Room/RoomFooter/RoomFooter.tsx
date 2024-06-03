import { RoomInviteBtn, RoomStartGameBtn } from "@/components";
interface Props {
  id: string;
}

export default async function RoomFooter({ id }: Props) {
  return (
    <div className="flex gap-6 w-full">
      <RoomInviteBtn id={id} />
      <RoomStartGameBtn id={id} />
    </div>
  );
}
