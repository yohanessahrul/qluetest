import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

class MapComponent extends Component {
  constructor() {
    super()
    this.state = {
      lat: -6.21462,
      lng: 106.84513,
      zoom: 12,
      dataJSON: null,
      showMarker: false,
    }
  }

  componentDidMount () {
    axios.get(`https://ext.qlue.id/example/top_report`, { headers: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicWx1ZWluIiwiaWF0IjoxNDk0Mzk5Njg1fQ.mG5wmoCwmchufTPloxI7AjZaeM_bwcpCEJpyUnCDrmk' }})
      .then((res) => {
        console.log(res.data)

        this.setState({showMarker: true})
        this.setState({dataJSON: res.data})
      })
      .catch((err) => {
        console.log('error gan axiosnya')
      })
  }

  
  render() {
    const position = [this.state.lat, this.state.lng]
    const anes = (
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
                console.log('Data masih null')
                :
                this.state.dataJSON.map(function(data, index) {
                    console.log('render marker')
                    return (
                        <Marker key={index} position={[data.lat, data.lng]}>
                        <Popup>
                            <img width={200} src={data.image_url}/> <br/>
                            <div className="tag1">
                                Keluhan Masyarakat
                            </div>
                            Desc: {data.description}<br/>
                            Pelapor: {data.username}
                        </Popup>
                        </Marker>
                    
                    )
                })
                // console.log('TEST', this.state.dataJSON)
            }
        </Map>
    )
    return (
      <div>
        {
          (this.state.showMarker === true) ?
            // <Map
            // center={position}
            // zoom={this.state.zoom}
            // >
            //     <TileLayer
            //     attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            //     />
            //     <Marker position={position}>
            //     <Popup>
            //         <div className="tag1">
            //             Keluhan Masyarakat
            //         </div>
            //         Bambu Kuning <br /> Macet banget gan.
            //     </Popup>
            //     </Marker>
            // </Map>
            // JSON.stringify(this.state.dataJSON[0])
        //   <h1>MAsuk . . . </h1>
                anes
            :
                <h1>Loading . . . </h1>
        }
      </div>
    );
  }
}

export default MapComponent;