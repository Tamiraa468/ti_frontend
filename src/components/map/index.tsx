import L, { LatLngExpression } from "leaflet";
import { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import ChangeView from "./center";
import ChooseMarker, { MarkerEvent } from "./choose_marker";
import { MarkerRecord } from "./types";
interface Props {
  markers?: ({ iconUrl?: string; color?: string } & MarkerRecord)[];
  position?: MarkerEvent;
  onPositionChange?: Function;
}

const CENTER_MAP: LatLngExpression | undefined = [47.9201606, 106.9154933];

const LeafletMap: FC<Props> = ({
  markers = [],
  position,
  onPositionChange,
}) => {
  return (
    <MapContainer
      center={CENTER_MAP}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker) => (
        <Marker
          key={marker.name}
          position={[marker.latitude, marker.longitude]}
          icon={
            new L.Icon({
              className: "h-8 w-8",
              iconUrl: marker?.iconUrl ?? "/images/marker-red.png",
            })
          }
          eventHandlers={{
            click: () => {
              if (marker.onClick) marker.onClick();
            },
          }}
          title={marker.name}
        >
          <Popup>{marker.customPopup ? marker.customPopup : marker.name}</Popup>
        </Marker>
      ))}
      <ChooseMarker position={position} onPositionChange={onPositionChange} />
      <ChangeView
        center={
          (position?.val[0] !== 0 && position?.val[1] !== 0 && position?.val) ||
          CENTER_MAP
        }
      />
    </MapContainer>
  );
};

export default LeafletMap;
