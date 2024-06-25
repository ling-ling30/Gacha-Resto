import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Id } from "@/convex/_generated/dataModel";
import Photo from "./Photo";
type Props = {
  children: React.ReactNode;
  data: {
    _id: Id<"restaurant">;
    _creationTime: number;
    city: Id<"city">;
    name: string;
    price_range_min: string;
    price_range_max: string;
  };
  rotate: number;
};
export function RestaurantHoverCard({ children, data, rotate }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent
        className="bg-red-100"
        style={{
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <div className="mt-4 text-lg font-bold ">
          Result:
          <div
            className="mt-10 flex justify-center flex-col items-center"
            key={data._id}
          >
            <div className="font-semibold">{data.name}</div>
            <div className="font-semibold">
              Rp. {data.price_range_min} - Rp. {data.price_range_max}
            </div>
            <div className="gap-2 flex flex-wrap">
              <Photo restaurant_id={data._id} />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
