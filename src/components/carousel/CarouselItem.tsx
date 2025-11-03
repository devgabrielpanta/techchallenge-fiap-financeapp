import { CardItemProps } from "@/utils/carouselUtils";

export default function CarouselItem({
  id,
  icon,
  title,
  description,
  bg,
}: CardItemProps) {
  return (
    <div
      key={`carouselItem${id}`}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg ${bg} text-white shadow-lg`}
      style={{ width: "220px", height: "220px" }}
    >
      {icon}
      <h3 className="font-semibold text-lg text-center">{title}</h3>
      <p className="text-sm text-center">{description}</p>
    </div>
  );
}
