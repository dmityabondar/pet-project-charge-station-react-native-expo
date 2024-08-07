import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StationsMapScreenStyles } from "@/app/styles/StationsMapScreenStyles";
import { useStationsStore } from "@/stores/stations.store";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "expo-router";
import { useAppdataStore } from "@/stores/appdata.store";
import { haversineDistance } from "@/helpers/map.helpers";

import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Text,
  SafeAreaView,
  Linking,
  Modal,
} from "react-native";

import {
  FontAwesome6,
  Entypo,
  FontAwesome,
  EvilIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const MAX_ZOOM = 2;
const MIN_ZOOM = 0.001;

export default function StationsMapScreen() {
  const navigation = useNavigation();
  const helpCenterUrl = useAppdataStore((state) => state.helpCenterUrl);
  const stations = useStationsStore((state) => state.stations);
  const initialCoords = useStationsStore((state) => state.initialCoords);
  const [distances, setDistances] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [mapRegion, setMapRegion] = useState(initialCoords);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [modalVisibleList, setModalVisibleList] = useState(false);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState<any>(null);

  const openModalList = () => setModalVisibleList(true);
  const closeModalList = () => setModalVisibleList(false);

  const getLocationPermissions = async (): Promise<any> => {
    setLoadingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLoadingLocation(false);
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    if (location) {
      setLocation(location);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      calculateDistances(location.coords);
    }
    setLoadingLocation(false);
  };

  const calculateDistances = (currentCoords: any) => {
    const newDistances = {};
    stations.forEach((station: any) => {
      const distance = haversineDistance(
        currentCoords.latitude,
        currentCoords.longitude,
        station.coords.latitude,
        station.coords.longitude
      );
      newDistances[station.id] = distance;
    });
    setDistances(newDistances);
  };

  useEffect(() => {
    getLocationPermissions();
  }, []);

  const handleLocationButtonPress = () => {
    setLoadingLocation(true);
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      calculateDistances(location.coords);
      setLoadingLocation(false);
    } else {
      getLocationPermissions();
    }
  };

  const handleGetHelp = async () => {
    await Linking.openURL(helpCenterUrl);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const results = stations.filter((item: any) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData(stations);
    }
  };

  const handleLocationSelect = (location: any) => {
    if (selectedLocation && selectedLocation.id === location.id) {
      closeModal();
    } else {
      setSelectedLocation(location);
      setSelectedLocationInfo(location);
      setModalVisible(true);
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
      setSearchQuery("");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedLocation(null);
  };

  const handleZoomIn = () => {
    if (
      mapRegion.latitudeDelta > MIN_ZOOM &&
      mapRegion.longitudeDelta > MIN_ZOOM
    ) {
      setMapRegion((prevRegion: any) => ({
        ...prevRegion,
        latitudeDelta: prevRegion.latitudeDelta / 2,
        longitudeDelta: prevRegion.longitudeDelta / 2,
      }));
    }
  };

  const handleZoomOut = () => {
    if (
      mapRegion.latitudeDelta < MAX_ZOOM &&
      mapRegion.longitudeDelta < MAX_ZOOM
    ) {
      setMapRegion((prevRegion: any) => ({
        ...prevRegion,
        latitudeDelta: prevRegion.latitudeDelta * 2,
        longitudeDelta: prevRegion.longitudeDelta * 2,
      }));
    }
  };

  const onScan = () => {
    navigation.navigate("scanQr");
  };

  const onPay = () => {
    navigation.navigate("personal");
  };

  const LocationModal = ({
    location,
    onClose,
  }: {
    location: any;
    onClose: () => void;
  }) => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ConnectorElement item={location} />
          <View style={styles.modalControls}>
            <TouchableOpacity
              style={styles.modalControlsButton}
              onPress={onScan}
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={18}
                color="white"
              />
              <Text style={styles.modalControlsButtonText}>
                Scan QR code
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalControlsButton}
              onPress={onPay}
            >
              <MaterialIcons name="payment" size={18} color="white" />
              <Text style={styles.modalControlsButtonText}>Payment</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <EvilIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ConnectorElement = ({ item }: { item: any }) => {
    return (
      <View>
        <Text style={styles.itemContainerListTitle}>{item.name}</Text>
        <Text style={styles.itemContainerListAddress}>
          {item.address}{" "}
          {distances[item.id] && (
            <Text style={styles.itemContainerListDistance}>
              ({distances[item.id]} km)
            </Text>
          )}
        </Text>
        <View style={[styles.rowInfo, styles.itemContainerCoast]}>
          <View>
            <Text style={styles.strong}>{item.price}€/kWh</Text>
          </View>
          <View>
            <Text>
              Min payment: <Text style={styles.strong}>{item.minPay}€</Text>
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.statusBar}>
            <View
              style={[styles.statusBarLine, { width: `${item.energy}%` }]}
            />
          </View>
          <Text style={styles.itemContainerStatus}>
            Status: 
            <Text
              style={[
                styles.strong,
                item.status === "Active" ? styles.green : styles.red,
              ]}
            >
              {item.status}
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.searchButton}>
          <FontAwesome name="search" size={18} color="black" />
        </TouchableOpacity>
        <TextInput
          style={[styles.searchInput]}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      {searchQuery && (
        <FlatList
          style={styles.searchResults}
          data={filteredData}
          keyExtractor={(item): any => item.id.toString()}
          renderItem={({ item }: any) => (
            <TouchableOpacity
              style={styles.searchResultItem}
              onPress={() => handleLocationSelect(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {modalVisible && selectedLocationInfo && (
        <LocationModal location={selectedLocationInfo} onClose={closeModal} />
      )}
      <View style={styles.listButtonContainer}>
        <TouchableOpacity style={styles.listButton} onPress={openModalList}>
          <Entypo name="list" size={36} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonLocation}>
        <TouchableOpacity
          style={styles.buttonLocationTouch}
          onPress={handleLocationButtonPress}
        >
          <FontAwesome6 name="location-crosshairs" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonHelp}>
        <TouchableOpacity
          style={styles.buttonHelpTouch}
          onPress={handleGetHelp}
        >
          <Entypo name="help-with-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.zoomButtons}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Entypo name="minus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisibleList}
        animationType="slide"
        onRequestClose={closeModalList}
      >
        <SafeAreaView style={styles.modalContainerList}>
          <Text style={styles.modalTitleList}>Connectors:</Text>
          <FlatList
            data={stations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainerList}
                onPress={() => {
                  console.log(item);
                  handleLocationSelect(item);
                  closeModalList();
                }}
              >
                <ConnectorElement item={item} />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.closeModalButtonList}
            onPress={closeModalList}
          >
            <Text style={styles.closeModalButtonTextList}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <MapView
        region={mapRegion}
        style={styles.map}
        onRegionChangeComplete={setMapRegion}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <View style={styles.markerCurrent}>
              <FontAwesome name="car" size={36} color="white" />
            </View>
          </Marker>
        )}
        {stations?.map((item: any) => (
          <Marker
            key={item.id}
            coordinate={item.coords}
            title={item.name}
            onPress={() => handleLocationSelect(item)}
          >
            <View
              style={[
                styles.markerPin,
                selectedLocation && selectedLocation.id === item.id
                  ? styles.activeMarkerPin
                  : null,
              ]}
            >
              <FontAwesome5
                name="charging-station"
                size={22}
                color={
                  selectedLocation && selectedLocation.id === item.id
                    ? "white"
                    : "green"
                }
              />
            </View>
          </Marker>
        ))}
      </MapView>
      {loadingLocation && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create<any>(StationsMapScreenStyles);
