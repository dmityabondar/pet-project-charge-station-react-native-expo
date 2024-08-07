import { create } from "zustand";

interface StationsStore {
  initialCoords: any;
  stations: any;
  setStations: (payload: boolean) => void;
}

const initialData = [
  {
    id: 1,
    name: "Type 1 (32A)",
    price: 0.33,
    minPay: 10,
    status: "Active",
    energy: 100,
    address: "85310 Rondo, Budva, Montenegro",
    coords: {
      latitude: 42.285977727993334,
      longitude: 18.846441064865363,
    },
  },
  {
    id: 2,
    name: "Type 2 (32A)",
    price: 0.33,
    minPay: 10,
    status: "Disabled",
    energy: 50,
    address: "Nativity of the Theotokos, Kubasi, Montenegro",
    coords: {
      latitude: 42.32710937519544,
      longitude: 18.752162885548056,
    },
  },
  {
    id: 3,
    name: "Type 3 (32A)",
    price: 0.33,
    minPay: 15,
    status: "Active",
    energy: 80,
    address: "E80, Pržno 85315, Montenegro",
    coords: {
      latitude: 42.271664184976544,
      longitude: 18.890296378614718,
    },
  },
];

export const useStationsStore = create<StationsStore>((set) => ({
  initialCoords: {
    latitude: 42.29180276028579,
    longitude: 18.840189927737928,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  stations: initialData,
  setStations: (payload: boolean) => set(() => ({ stations: payload })),
}));
