import { useSearchParams } from "react-router-dom";

const useURLPosition = function () {
  const [searchParams] = useSearchParams();
  const mapLat = Number(searchParams.get("lat"));
  const mapLng = Number(searchParams.get("lng"));
  return [mapLat, mapLng];
};

export { useURLPosition };
