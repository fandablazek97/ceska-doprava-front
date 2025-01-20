import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function Map({ center = [50.073658, 14.418540], zoom = 9, markers, className = "" }: { center?: [number, number] | number, zoom?: number, markers: { position: [number, number], children: React.ReactNode }[], className?: string }) {
    const customIcon = L.icon({
        iconUrl: '/icons/bus.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });

    const positions = markers.map((marker) => marker.position);

    return (
        <MapContainer
            center={typeof center !== "number" ? center : markers[center]?.position}
            zoom={zoom}
            className={`z-10 relative w-full h-full ${className}`}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map(marker =>
                <Marker position={marker.position} icon={customIcon}>
                    <Popup>{marker.children}</Popup>
                </Marker>
            )}
            {/* <Polyline
                positions={positions}
                pathOptions={{ color: 'red', weight: 3 }}
            /> */}
        </MapContainer>
    );
};
