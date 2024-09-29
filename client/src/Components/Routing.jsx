// import L from "leaflet"
// import { createControlComponent } from "@react-leaflet/core";
// import "leaflet-routing-machine"
// import maps from  "../innovateOdisha.lots.json"

// const createRoutineMachineLayer = (props) => {
//   const instance = L.Routing.control({
//     waypoints: [
//       L.latLng(33.52001088075479, 36.26829385757446),
//       L.latLng(33.50546582848033, 36.29547681726967)
//     ],
//     lineOptions: {
//       styles: [{ color: "#6FA1EC", weight: 4 }]
//     },
//     show: false,
//     addWaypoints: false,
//     routeWhileDragging: true,
//     draggableWaypoints: true,
//     fitSelectedRoutes: true,
//     showAlternatives: false
//   });

//   return instance;
// };

// const Routing = createControlComponent(createRoutineMachineLayer);

// export default Routing;
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const Routing = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return; // Ensure the map is ready

    // Create routing control with start and end waypoints
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.lat, start.lng),
        L.latLng(end.lat, end.lng),
      ],
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }], // Custom style for the route line
      },
      routeWhileDragging: true,
      fitSelectedRoutes: true,
      show: true,
      addWaypoints: false, // Prevent users from adding additional waypoints
      showAlternatives: false, // Don't show alternative routes
    }).addTo(map);

    return () => map.removeControl(routingControl); // Cleanup on unmount
  }, [map, start, end]);

  return null; // This component only interacts with the map, no need to render anything
};

export default Routing;
