import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface Props {
  center?: LatLngExpression | undefined;
}
export default function ChangeView({ center }: Props) {
  const map = useMap();

  map.whenReady(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  });

  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}
