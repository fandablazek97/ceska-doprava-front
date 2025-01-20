// MapClient.tsx
import dynamic from "next/dynamic";

// Dynamically import your Map component and disable SSR
const MapClient = dynamic(() => import("./Map"), { ssr: false });

export default MapClient;
