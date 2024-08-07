import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

export default function ScanQrScreen() {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facing, setFacing] = useState("back");
  const [torch, setTorch] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && permission.granted) {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  }, [permission]);

  useEffect(() => {
    if (!isFocused) {
      setScannedData(null);
    }
  }, [isFocused]);

  const handleBarCodeScanned = ({ data }: any) => {
    if (data.includes('/pay_per_charge')) {
      setScannedData(data);
      console.log(data);
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleCameraTorch() {
    setTorch(!torch);
  }

  const openQRlink = async (link: string) => {
    await Linking.openURL(link);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Request access to camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.rectangleContainer}>
        <CameraView
          style={styles.rectangle}
          isActive={true}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={handleBarCodeScanned}
          facing={facing}
          enableTorch={torch}
        />
        {scannedData && (
          <View style={styles.barcodeData}>
            <TouchableOpacity onPress={() => openQRlink(scannedData)}>
              <Text style={styles.barcodeDataButton}>Open</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.buttonsWrapper}>
          <View style={styles.buttonFacing}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <MaterialCommunityIcons
                name="camera-flip-outline"
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </View>
          { facing === 'back' &&
            <View style={styles.buttonTorch}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraTorch}>
                <Entypo name="flashlight" size={40} color="white" />
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    </View>
  );
}

const rectangleSize = 300;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  barcodeData: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'yellow',
    width: 200,
    textAlign: 'center',
    position: 'absolute',
    bottom: 180
  },
  barcodeDataButton: {
    color: 'black',
    textAlign: 'center'
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative'
  },
  rectangle: {
    height: rectangleSize,
    width: rectangleSize,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: (windowHeight - rectangleSize) / 2.5,
    left: (windowWidth - rectangleSize) / 2,
    borderRadius: 6
  },
  buttonFacing: {
    backgroundColor: "black",
    margin: 0,
    borderRadius: 100,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  buttonTorch: {
    backgroundColor: "black",
    margin: 0,
    borderRadius: 100,
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    paddingBottom: 5
  },
  buttonsWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  }
});
