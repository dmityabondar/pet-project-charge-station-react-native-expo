export const StationsMapScreenStyles = {
  strong: {
    fontWeight: 'bold'
  },
  green: {
    color: 'green'
  },
  red: {
    color: 'red'
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  map: {
    flex: 1,
  },
  searchBar: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 30,
    paddingHorizontal: 5,
    color: "#000000",
  },
  searchButton: {
    padding: 5,
  },
  searchResults: {
    position: "absolute",
    top: 55,
    left: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 5,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonLocation: {
    position: "absolute",
    bottom: 115,
    right: 10,
    zIndex: 1,
  },
  buttonLocationTouch: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 100,
  },
  buttonHelp: {
    position: "absolute",
    bottom: 170,
    right: 10,
    zIndex: 1,
  },
  buttonHelpTouch: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 100,
  },
  zoomButtons: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 100,
  },
  zoomButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
    marginVertical: 5,
  },
  modalContainer: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 10,
    zIndex: 2,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
  },
  modalContent: {
    position: 'relative',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  markerCurrent: {
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 10,
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerPin: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 5,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeMarkerPin: {
    backgroundColor: 'green'
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 9999,
  },
  listButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 2
  },
  listButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  modalContainerList: {
    flex: 1,
    display: 'flex',
    marginTop: 22,
    width: '100%'
  },
  modalTitleList: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
    textAlign: 'center'
  },
  itemContainerList: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%'
  },
  closeModalButtonList: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    maxWidth: 100,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  closeModalButtonTextList: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemContainerListTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'green'
  },
  itemContainerListAddress: {
    fontSize: 12
  },
  itemContainerListDistance: {
    fontWeight: 'bold'
  },
  statusBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  statusBarLine: {
    height: '100%',
    backgroundColor: '#F4CE14',
  },
  rowInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  itemContainerStatus: {
    marginTop: 10
  },
  itemContainerCoast: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  modalControls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  modalControlsButton: {
    borderRadius: 4,
    backgroundColor: 'green',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10
  },
  modalControlsButtonText: {
    color: 'white'
  }
};
