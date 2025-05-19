import L from "leaflet";
import { FC } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export interface MarkerEvent {
  val: [number, number];
  set: Function;
}
interface Props {
  position?: MarkerEvent;
  onPositionChange?: Function;
}

const ChooseMarker: FC<Props> = ({ position, onPositionChange }) => {
  const map = useMapEvents({
    click: (e: any) => {
      position?.set([e.latlng.lat, e.latlng.lng]);
      map.flyTo([e.latlng.lat, e.latlng.lng], map.getZoom());
      map.locate();
      if (onPositionChange) onPositionChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return position?.val !== null &&
    position?.val[0] !== 0 &&
    position?.val[1] !== 0 ? (
    <Marker
      position={position?.val || [0, 0]}
      icon={
        new L.DivIcon({
          className: `marker_icon marker_color_red`,
        })
      }
    >
      <Popup>Selected Location</Popup>
    </Marker>
  ) : null;
};

export default ChooseMarker;
