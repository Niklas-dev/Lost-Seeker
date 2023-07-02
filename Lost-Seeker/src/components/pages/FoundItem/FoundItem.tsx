import { Navigate } from "react-router-dom";
import NavBar from "../../shared/NavBar";
import { useRef, useState } from "react";
import { db } from "../../../App";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Leaflet.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface Props {
  user: any;
}

function FoundItem({ user }: Props) {
  if (!user) {
    return <Navigate to="/register" />;
  }

  const [nameOfObject, setNameOfObject] = useState();

  const ref = collection(db, "items");

  const [onTop, setOnTop] = useState(false);

  const mapRef = useRef<any>();

  /*const docRef = addDoc(ref, {
    nameOfObject: nameOfObject,
    place: "A location",
    time: serverTimestamp(),
    questions: {},
    messages: {},
    contactInfo: "Contact Info of that person who found it.",
  });*/

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  return (
    <div>
      <NavBar onTop={onTop} links={["List", "Contribute"]} />
      <button
        className="w-36 h-36 mt-11"
        onClick={() => {
          mapRef.current.showModal();
        }}
      >
        Map Button
      </button>
      <dialog ref={mapRef} className="bg-transparent">
        <div
          className="absolute right-[20px] top-[20px] z-[401] cursor-pointer"
          onClick={() => {
            mapRef.current.close();
          }}
        >
          <AiOutlineCloseCircle size={50} />
        </div>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}></Marker>
        </MapContainer>
      </dialog>
    </div>
  );
}

export default FoundItem;
