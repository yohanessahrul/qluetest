import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import L from 'leaflet';


class MapComponent extends Component {
  constructor() {
    super()
    this.state = {
      lat: -6.207846, // titik tengah jakarta
      lng: 106.826889,
      zoom: 11,
      dataJSON: null,
      dataWaze: null,
      showMarker: false,
      showMarker2: false,
    }
  }

  componentDidMount () {
    axios.get(`https://ext.qlue.id/example/top_report`, { headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicWx1ZWluIiwiaWF0IjoxNDk0Mzk5Njg1fQ.mG5wmoCwmchufTPloxI7AjZaeM_bwcpCEJpyUnCDrmk' }})
      .then((res) => {
        // console.log(res.data)
        this.setState({showMarker: true})
        this.setState({dataJSON: res.data})
      })
      .catch((err) => {
        console.log('error gan axiosnya')
      })
    axios.get(`http://35.187.248.19/feeder/update/vFDlJkLMJ4RKjjqFs5yLO33T3tHvsqF7.json`)
      .then((res) => {
          console.log('Data Waze', res.data.alerts)
          this.setState({showMarker2: true})
          this.setState({dataWaze: res.data.alerts})
      })
      .catch((err) => {
          console.log(err)
      })
  }

  render() {
    const position = [this.state.lat, this.state.lng]

    const iconAngry = new L.Icon({
        iconUrl: require('../assets/icon/angryred.png'),
        iconRetinaUrl: require('../assets/icon/angry.png'),
        iconAnchor: this.position,
        popupAnchor: true,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(24, 24)
    })
    const iconCrying = new L.Icon({
        iconUrl: require('../assets/icon/crying.png'),
        iconRetinaUrl: require('../assets/icon/crying.png'),
        iconAnchor: this.position,
        popupAnchor: true,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(24, 24)
    })
    
    return (
      <div className="mapWrapper">
        {
          (this.state.showMarker === true && this.state.showMarker2 === true) ?
            <Map
            center={position}
            zoom={this.state.zoom}
            >
              <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                (this.state.dataJSON == null) ?
                  console.log('Data JSON masih null')
                  :
                  this.state.dataJSON.map(function(data, index) {
                    // console.log('Data JSON render success')
                    return (
                      <Marker 
                      key={index} 
                      position={[data.lat, data.lng]} 
                      >
                        <Popup>
                          <div className="popupMarker">
                            <img src={data.image_url}/>
                            <div className="userWrap">
                              <p>
                                <FontAwesome className="userIcon" name="user-circle" />
                                {data.username}
                              </p>
                            </div>
                            <div className="shadowWrap">
                              <p>
                                <FontAwesome className="calendarIcon" name="calendar" />
                                12 Maret 1992
                              </p>
                            </div>
                          </div>
                          <div className="desc">
                            <p>
                              <span>Description :</span> <br />
                              {data.description} <br/>
                              <span>Lokasi :</span> <br />
                              Kel. {data.kelurahan}, Kec. {data.kecamatan} <br/>
                              {data.kabupaten}
                              <span>Tags :</span> <br />
                              {data.tag2}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    )
                  })
              }
              {
                (this.state.dataWaze == null) ?
                  console.log('Data Waze masih null')
                  :
                  this.state.dataWaze.map(function(data2, index) {
                    //   console.log('xxxxxx', data2)
                    return (
                      <Marker 
                      key={index + 100} 
                      position={[data2.location.y, data2.location.x]}
                      icon={
                        (data2.type === 'ROAD_CLOSED') ?
                          iconAngry
                          :
                          iconCrying
                      }
                      >
                        <Popup>
                            <p>{data2.street}</p>
                        </Popup>
                      </Marker>
                    )
                  })
              }
            </Map>
            :
              <h1>Loading . . . </h1>
        }
      </div>
    );
  }
}

export default MapComponent;