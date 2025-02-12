import useMediaQuery from '@hooks/useMediaQuery';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

export default function Map({ center = [50.073658, 14.418540], zoom = 9, markers, className = "", markerIcon = '/icons/bus.png' }: { center?: [number, number] | number, zoom?: number, markers: { position: [number, number], children: React.ReactNode, trasa?: string }[], className?: string, markerIcon?: string }) {
    const [mounted, setMounted] = useState(false);
    const isSmall = useMediaQuery("(max-width: 768px)");

    const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });

    const polyLines = returnPolylines();

    function returnPolylines() {
        const lines: any = {};
        markers.map((marker: any) => {
            if (!marker.trasa) return;
            marker.trasa.split(",").map((tr: any) => {
                const [t, p] = tr.split("-");
                const info = { position: marker.position, number: p };
                if (!lines[t]) lines[t] = [info];
                else lines[t].push(info);
            })
        });
        const endObj: any = {};
        Object.keys(lines).forEach((key) => {
            lines[key].sort((a: any, b: any) => a.number - b.number).map((ter: any) => {
                if (!endObj[key]) endObj[key] = [ter.position];
                else endObj[key].push(ter.position);
            });
        });
        return endObj;
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const finalZoom = isSmall ? zoom - 1 : zoom;

    return (
        <MapContainer
            center={typeof center !== "number" ? center : markers[center]?.position}
            zoom={finalZoom}
            className={`z-10 relative w-full h-full ${className}`}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) =>
                <Marker position={marker.position} icon={customIcon} key={index}>
                    <Popup>{marker.children}</Popup>
                </Marker>
            )}

            {Object.keys(polyLines)?.map((lineName: any) =>
                <Polyline
                    key={lineName}
                    pathOptions={{ color: lineName.startsWith("hlavni") ? "red" : "yellow", weight: lineName.startsWith("hlavni") ? 4 : 3 }}
                    positions={polyLines[lineName]}
                />
            )}
        </MapContainer>
    );
};
