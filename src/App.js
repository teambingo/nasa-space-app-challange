import React, { Component } from 'react';
import './App.css';
import { Menu, Icon, Upload, Card, Modal, Input, Button } from 'antd';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import {ref,eventref,msg,key} from './constant'
const Meta = Card.Meta
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const include = [
  "ARG", "BOL", "BRA", "CHL", "COL", "ECU",
  "GUY", "PRY", "PER", "SUR", "URY", "VEN",
]
function info(marker) {
  Modal.info({
    title: marker.name,
    content: (
      <div>
        <Card
          hoverable
          // style={{ width: 240 }}
          cover={<img alt="example" src={marker.url} />}
        >
          <Meta
            title={marker.name}
            description={<div><p>{marker.desp}</p>
              <span className='nasa-chip' >LARGE</span>
              <span className='nasa-chip land' >LANDSLIDE</span>
              <span className='nasa-chip' >20 INJURY</span>
            </div>}
          />
        </Card>
      </div>
    ),
    onOk() { },
  });
}

const center = {
  lat: 51.5,
  lng: 0,
};
const markers = [
  { markerOffset: -25, name: "Jingyang", coordinates: [107.45, 32.5625] },
  { markerOffset: -25, name: "La Paz", coordinates: [-68.1193, -16.4897] },
  { markerOffset: 35, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
  { markerOffset: 35, name: "Santiago", coordinates: [-70.6693, -33.4489] },
  { markerOffset: 35, name: "Bogota", coordinates: [-74.0721, 4.7110] },
  { markerOffset: 35, name: "Quito", coordinates: [-78.4678, -0.1807] },
  { markerOffset: -25, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
  { markerOffset:0, name: "Rithala", coordinates: [77.720826,28.1050454],desp:'' },
  { markerOffset: 35, name: "Paramaribo", coordinates: [-55.2038, 5.8520] },
  { markerOffset: 35, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
  { markerOffset: -25, name: "Yosemite", coordinates: [-119.7795082, 37.67607624],url:'https://pbs.twimg.com/media/CYJs_hAWkAAp0xV.jpg:large',desp:'Boulders fall on entrance to Yosemite Park, blocking the road'},
  { markerOffset: -25, name: "Paintedanda", coordinates: [84.069015, 28.145796],url:'https://i0.wp.com/www.nepalmountainnews.com/cms/wp-content/uploads/2016/09/Paintedanda-Lekhnath-Municipality-Kaski-landslide.jpg', desp:'Four children of a single family were killed and two others were injured when a house was swept away in a landslide at Paintedanda near Kharanephant in Lekhnath Municipality-4 of Kaski district, on Wednesday night. The deceased have been identified as Salman Sunar (3), Anjeela Sunar (7), Rajina Sunar (10) and Nishan Sunar (14). Two others who sustained injuries are Sabina Sunar (10) and Kabita Sunar (25). According to police, the house belonging to Chandrakali Bishwakarma was swept  at about 11:45 pm last night killing all four children who were sleeping in the same room. Two others who were sleeping in another room had a narrow escape and sustained injuries. Among the deceased, the toddler Salman had recently come to visit his maternal home. The disaster has also destroyed two other houses in the locality while as many as 10 houses are at the risk of being swept away by landslide.'},
  { markerOffset: 35, name: "Bogor", coordinates: [106.7121322, -6.522155904], url:'http://www.netralnews.com/foto/2017/06/30/492-hujan_deras_sebabknya_longsor_di_dua_lokasi_bogor_dok_kupasmerdeka-696x341.jpg' },
  { markerOffset: 35, name: "Assam", coordinates: [91.87202793, 26.20450454], url:'http://images.tribuneindia.com/cms/gall_content/2017/7/2017_7$largeimg03_Monday_2017_171821002.JPG' },
]
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'previous',
      marker: null,
      title:null,
      description: null,
      count:0,
      location:null,
      disaster:'',
      events:[]
    }

  }
  handleFollow() {

    // console.log(cookie.load("token"));

      let token  = localStorage.getItem('')
      fetch(
        "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/status" ,
        {
          method: "POST",
          headers: new Headers({
            Authorization: "key=" + key,
            "Content-Type": "application/json"
          })
        }
      )
        .then(response => {
          if (response.status < 200 || response.status >= 400) {
            // eslint-disable-next-line
            throw "Error subscribing to topic: " +
              response.status +
              " - " +
              response.text();
          }
          else {
            console.log("Yeah!")
          }

        })
        .catch(error => {
        });
  
        
     
    }

  
  componentWillMount() {
    this.handleFollow()
    Notification.requestPermission().then(function (result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      }
      if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }
      // Do something with the granted permission.
    });
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(pos => {
        let marker = { markerOffset: -25, name: "You are here", coordinates: [pos.coords.latitude, pos.coords.longitude] }
        this.setState({ marker })
      })
    } else {
      /* geolocation IS NOT available */
    }
   
    let _this = this
    ref.once("value", function(snapshot) {
      var items = [];
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var childKey = childSnapshot.key;
        childData.key = childKey;
        items.push(childData);
        // ...
      });

      _this.setState({
        events: items
      });
    })
    
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    console.log(this.state.events)
    return (
      <div className="App">
        <Menu style={{ fontFamily: 'Roboto Mono' }}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="previous">
            <Icon type="area-chart" />Previous
        </Menu.Item>
          <Menu.Item key="live">
            <Icon type="wifi" />Live
        </Menu.Item>
          <Menu.Item key="report">
            <Icon type="fork" />Report
        </Menu.Item>
          <Menu.Item key="admin">
            <Icon type="user" />Admin
        </Menu.Item>
          <Menu.Item key="stats">
            <Icon type="dot-chart" />stats
        </Menu.Item>
        </Menu>

        <div className='nasa-container-window' >
          <div className='nasa-jumbo'>
            <h1>{this.state.current === 'previous' ? 'Past Events' : this.state.current === 'report' ? 'Report' : this.state.current === 'live' ? 'Live Landslides' : this.state.current === 'stats' ? 'Year Stats' : 'Admin Login'}</h1>
            {this.state.current === 'previous' ? <p> <strong>Previous Landslide Viewer</strong> click on the blue dots to know more about the Landslides. Data is taken from NASA GCL Dataset. </p> : null}
            {this.state.current == 'stats' ? (
              <div className="nasa-stats">
                <h2>→ Landslides Reported</h2>
                <h2 className="nasa-stats-number">1255 </h2>
                <h2>→ Most Reported Reason</h2>
                <h2 className="nasa-stats-number">Rain 🌧</h2>
                <h2>→ People Injured</h2>
                <h2 className="nasa-stats-number">1000</h2>
                <h2>→ Most Landslides Country</h2>
                <h2 className="nasa-stats-number">China 🇨🇳 </h2>
              </div>
            ) : null}
            {this.state.current === 'admin'?
            this.state.events.map(e=>
              <Card
              hoverable
              // style={{ width: 240 }}
              cover={<img alt="example" src="http://www.cronica.com.mx/oimagenes11/1/f94ae83365.jpg" />}
            >
              <Meta
                title={e.title}
                description={<div><p>{e.description}</p>
                  <span className='nasa-chip' >LARGE</span>
                  <span className='nasa-chip land' >LANDSLIDE</span>
                  <span className='nasa-chip' >{e.count} INJURY</span>
                </div>}
              />
              <Button  style={{margin:'1rem'}}onClick={_=>{
                this.setState({events:[]})
                eventref.push(e)}}>Approve</Button>
            </Card>
            )
                     
            :null}
            {this.state.current === 'report' ? (<div>
              <Card>
                <div>
                  <Input placeholder="Title" onChange={e=>this.setState({title: e.target.value})} />
                  <Input placeholder="Description" onChange={e=>this.setState({description: e.target.value})} />
                  <Input placeholder="Location"  onChange={e=>this.setState({location: e.target.value})} />
                  <Input placeholder="Disaster type" onChange={e=>this.setState({disaster: e.target.value})}  />
                  <Input placeholder="Injured count" type='number'  onChange={e=>this.setState({count: e.target.value})} />
                  <div className='flex-center'>
                    <Upload>
                      <Button>
                        <Icon type="upload" /> Upload Image
      </Button>
                    </Upload>
                  </div>
                  <Button onClick={_=>{
                    let data = {
                      title:this.state.title,
                      description:this.state.description,
                      count:this.state.count,
                      location:this.state.location,
                      disaster:this.state.disaster,
                      isApproved:false
                    }
                    ref.push(data).then(_=>{
                      console.log('done')
                    })
                  }} >Submit </Button>
                </div>
              </Card>
            </div>) : null}
            {this.state.current === 'live'? (
              <div>,
                {true === true? (
                  <div>
                  <h2 className='nasa-stats-banner' > ⚠️ Landslide Alert</h2>
                  <h2 className='nasa-stats-banner' > 🚨 Rithala 🚨</h2>
                  <div style={{margin:'1rem'}} >
                
                  <Button onClick={_=> window.open('https://www.google.com/maps/dir/?api=1&origin=Rithala&destination=Kamala Nagar')}> 🏃🏻‍♂️ Get To Safe Zone</Button>
                  <Button  onClick={_=> window.open('https://www.google.com/maps/search/?api=1&query=Rithala')} style={{margin:'1rem'}}>🚨 LandSlide</Button>
                  </div>
                  
                  </div>
                ):(  <h2 className='nasa-stats-banner'>😻 No Landslide Active found in your Area.</h2>)}
              
              </div>
            ):null}
          </div>
          {this.state.current === 'previous' ? (<ComposableMap
            projectionConfig={{ scale: 150 }}
            width={1000}
            height={1000}
            style={{
              width: "100%",
              marginLeft: '-10vw',
              marginTop: '-20vh',
              height: "auto",
            }}
          >
            <ZoomableGroup center={[-60, -25]} >
              <Geographies geography="/world-50m.json">
                {(geographies, projection) =>
                  geographies.map((geography, i) =>
                    (
                      <Geography
                        key={i}
                        geography={geography}
                        projection={projection}
                        style={{
                          default: {
                            fill: "#ECEFF1",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          hover: {
                            fill: "#CFD8DC",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                          pressed: {
                            fill: "#1890ff",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none",
                          },
                        }}
                      />
                    )
                  )
                }
              </Geographies>
              <Markers>
                {markers.map((marker, i) => (
                  <Marker
                    key={i}
                    marker={marker}
                    onClick={_=>info(marker)}
                    style={{
                      default: { fill: "#1890ff" },
                      hover: { fill: "#1890ff" },
                      pressed: { fill: "#1890ff" },
                    }}
                  >
                    <circle
                      cx={0}
                      cy={0}
                      r={2}
                      style={{
                        stroke: "#1890ff",
                        strokeWidth: 3,
                        opacity: 0.9,
                      }}
                    />
                    <text
                      textAnchor="middle"
                      y={marker.markerOffset}
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fill: "#607D8B",
                      }}
                    >
                      {marker.name}
                    </text>
                  </Marker>
                ))}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
          ) : null}


        </div>
      </div>
    );
  }
}

export default App;
