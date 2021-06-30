import { Marker, Popup } from 'react-leaflet';
import * as L from "leaflet";
import { useQuery } from '@apollo/client';
import { GET_COUNTRY_LOCATION } from '../../data/schemas';

//  Create the Icon
const LeafIcon = L.Icon.extend({
    options: {}
});

const blueIcon = new LeafIcon({
    iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
}),
    greenIcon = new LeafIcon({
        iconUrl:
            "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
    });


const CloseCountryMarker = ({ country, main }) => {
    const { loading, data } = useQuery(GET_COUNTRY_LOCATION, {
        fetchPolicy: "cache-first",
        variables: { name: country.countryName },
    })

    if (loading || !data) return <></>;

    const marker = data.Country[0];

    if (marker)
        return <Marker key={`close_${marker.name}`}
            inputProps={{
                "data-testid": `country_details_marker_${marker.name}`
            }}
            position={[marker.location.latitude, marker.location.longitude]}
            icon={main ? blueIcon : greenIcon}>
            <Popup>
                <h1>{marker.name}</h1>
                <h2>{country.distanceInKm.toFixed(2)} km away</h2>
            </Popup>
        </Marker>

    return <></>
}

export default CloseCountryMarker;