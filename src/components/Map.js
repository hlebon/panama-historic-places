import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import MapFilterOptions from './MapFilterOptions';
import point from '../Img/map-marker.png';
import point_blue from '../Img/map-marker-blue.png';
import { array } from 'lodash'


const reportesGenerados = [
    { lng: -79.70843109554954, lat: 8.869453693785971, state: "open" },
    { lng: -79.70752449214012, lat: 8.870167132209687, state: "closed"},
    { lng: -79.69047536742704, lat: 8.881802047757802, state: "open" },
    { lng: -79.6865740592317, lat: 8.883772767074959, state: "closed" },
    { lng: -79.57353947904005, lat: 8.915508708341903,state: "closed" },
    { lng: -79.570463227667, lat: 8.91776622493073, state: "closed" },
    { lng: -79.51502070192475, lat: 8.99336163917377, state: "open" },
    { lng: -79.52106857726739, lat: 9.023340757649521,state: "open" },
    { lng: -79.54567851200819, lat: 9.047495169669422, state: "open" },
    { lng: -79.96463775640501, lat: 9.013563580858474, state: "pending" },
    { lng: -79.96081643496132, lat: 8.889437919186264, state: "pending" },
    { lng: -79.95120339791191, lat: 8.657013615441997, state: "pending" },
    { lng: -79.45939274513825, lat: 9.060541480845103, state: "open" },
    { lng: -79.40313764730939, lat: 9.036173632723887, state: "open" },
    { lng: -79.65342526042241, lat: 9.00806519121501, state: "open" },
    { lng: -79.58520964660124, lat: 9.017807988407583, state: "closed" }
]

function objectToArray(object){
	const newElement = []
	for(let element in object){
		newElement.push({
			id: element,
			data: object[element]
		})
	}
	return newElement;
}

function groupBy(array){
    return array.reduce((acc, item)=>{
        acc[item.state] = acc[item.state] || [];
        acc[item.state].push(item)
        return acc
    }, [])
}

function generarImg(type) {
    const image = new Image();
    if(type === "open"){
        image.width = 40;
        image.height = 50;
        image.src = point_blue;
    }else if(type === "closed"){
        image.width = 40;
        image.height = 50;
        image.src = point;
    }else if(type === "pending"){
        image.width = 40;
        image.height = 50;
        image.src = point;
    }

    return image;
}


const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoid2lzeSIsImEiOiJjaXBibWV1bzMwMDc4c3dtNzQ5amMyZmdvIn0.tnBML7Vy-2zK2tXQ55YuxQ"
});

const styles = {
    mapStyle: {
        width: "100%",
        height: "100%",
        position: "fixed",
    },
}

class Mapbox extends React.Component {
    state = {
        center: [-80.0000000, 9.0000000],
        reportes: [],
        reporte: null
    }

    componentDidMount() {
        const unvalidaData = [];
        const validData = [];
        const reportes = objectToArray(groupBy(reportesGenerados));
        console.log(reportes);
        this.setState({
            reportes: reportes
        })
    }

    _onMove = (obj) => {
        //console.log(obj.transform._center)
    }

    _onClick = (obj) => {

    }

    render() {
        const { reportes } = this.state;
        return (
            <Map
                center={this.state.center}
                onMove={this._onMove}
                paint={{ "icon-image": "huecos"+0 }}
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: "100vh",
                    width: "100vw"
                }}>
                    <MapFilterOptions/>
                {
                    reportes.map((newLayer, index) => {
                        console.log(newLayer)
                        return (
                            <Layer
                                key={index}
                                type="symbol"
                                id={`marker${index}`}
                                images={[ "huecos"+index, generarImg(newLayer.id)]}
                                layout={{ "icon-image": "huecos"+index }}>
                                {
                                    newLayer.data.map((reporte, index) => {
                                        const coordinates = [reporte.lng, reporte.lat]
                                        return (
                                            <Feature
                                                key={index}
                                                className="marker"
                                                coordinates={coordinates}
                                            />
                                        )
                                    })
                                }

                            </Layer>
                        )
                    })
                }
            </Map>
        )
    }
}

export default Mapbox;