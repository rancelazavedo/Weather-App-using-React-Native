import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native"

const Dev_Height = Dimensions.get("window").height
const Dev_Width = Dimensions.get("window").width
const api = {
  key: "40b162fb48005b043b26169fe6e2590e",
  base: "https://api.openweathermap.org/data/2.5/"
}
let today = new Date().toDateString()

import Icon from "react-native-vector-icons/AntDesign"

export default class App extends React.Component{
  constructor(props){
    super(props);
      this.state ={
        data: [],
        isLoading: true,
        temp:"",
        city:"Hokkaido",
        icon:"",
        city_display:"",
        desc: "",
        main:"",
        humidity:"",
        pressure:"",
        visiblity:"",
        bgimage:"https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
        date:today
      }
    this.fetch_weather()
  }

  fetch_weather=()=> {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.state.city+'&appid=40b162fb48005b043b26169fe6e2590e')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
        this.setState({ temp : (json.main.temp-273.15).toFixed(2)+" °C" })
        this.setState({ city_display : json.name })
        this.setState({ icon: json.weather[0].icon})
        this.setState({ desc : json.weather[0].description})
        this.setState({ main : json.weather[0].main})
        this.setState({ humidity : json.main.humidity+" %"})
        this.setState({ pressure : json.main.pressure+" hPa"})
        this.setState({ visibility : (json.visibility/1000).toFixed(2)+" Km"})
        this.setState({ date:today })
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  
  }

  render(){
    return(
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor="#000"/>

      <ImageBackground source=
      {
        
          ((this.state.main === 'Snow') ? {uri:'https://wallpapercave.com/wp/wp6981239.jpg'} :
          ((this.state.main === 'Rain') ? {uri:'https://i.pinimg.com/originals/78/4c/e7/784ce7eebc3fe635d3387f30128bc846.jpg'} : 
          ((this.state.main === 'Haze') ? {uri:'https://images.unsplash.com/photo-1510596713412-56030de252c8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80'} : 
          ((this.state.main === 'Clouds') ? {uri:'https://i.pinimg.com/originals/69/7b/cd/697bcd518f85220e6af8b86b8f397a18.jpg'} : 
          ((this.state.main === 'Clear') ? {uri:'https://i.pinimg.com/originals/ab/6c/fe/ab6cfe0cb3bcf0fcab53e0d9d4d8a1b6.jpg'} : 
          {uri:'https://i.pinimg.com/originals/69/7b/cd/697bcd518f85220e6af8b86b8f397a18.jpg'}
          )
          )
          )
          )
          )
      } 
      style={styles.Image_Background_Style}>

        <View style={styles.Search_Box_View}>
          <TextInput placeholder="Search" placeholderTextColor="#FFF" style={styles.Search_Box} onChangeText={(text)=>this.setState({city : text})} />
            <TouchableOpacity style={styles.button_touch} onPress={this.fetch_weather}>
              <Icon name="search1" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

        <View style={styles.Weather_Box_Main}>
          <View style={styles.Weather_Holder_View}>
              <Image tintColor='#FFF' source={{uri:"http://openweathermap.org/img/wn/"+this.state.icon+"@2x.png",}} style={styles.Weather_Image}/>
              <View>
                <Text style={styles.time_text}>{this.state.date}</Text>       
                <Text style={styles.temprature_text}>{this.state.temp}</Text>
                <Text style={styles.city_text}>{this.state.city_display}</Text>  
                       
              </View>
            
            </View>
            
        </View>

        <View style={styles.Info_Box_View}>
          <View style={styles.Info_Holder_Veiw}>
            <Text style={styles.Main_Weather_Text}>{this.state.main}</Text>
            <Text style={styles.description_text}>{this.state.desc}</Text>
            <Text style={styles.humidity_text}>Humidity : {this.state.humidity}</Text>
            <Text style={styles.other_text}>Pressure : {this.state.pressure}</Text>
            <Text style={styles.other_text}>Visibility : {this.state.visibility}</Text>
          </View>
        </View>
      </ImageBackground>
      
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height:Dev_Height,
    width: Dev_Width
  },
  Image_Background_Style:{
    height:"100%",
    width:"100%"
  },
  Search_Box_View:{
    height:"20%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  Search_Box:{
    height:"35%",
    width:"80%",
    borderColor:"#FFF",
    borderWidth:1,
    borderRadius:15,
    color:"#FFF",
    paddingHorizontal:15
  },
  button_touch:{
    marginLeft:"5%",
    height:"35%",
    width:"8%",
    justifyContent:"center",
    alignItems:"center"
  },
  Weather_Box_Main:{
    height:"30%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  Weather_Holder_View:{
    height:"80%",
    width:"90%",
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius:15,
    alignItems:"center",
    flexDirection:"row"
  },
  Weather_Image:{
    height:"80%",
    width:"50%"
  },
  temprature_text:{
    fontSize:30,
    color:"#FFF",
    marginLeft:"5%",
    marginTop:"3%"
  },
  city_text:{
    fontSize:20,
    color:"#FFF",
    marginLeft:"5%",
    marginTop:"3%"
  },
  time_text:{
    fontSize:18,
    color:"#FFF",
    marginLeft:"5%"
  },
  Info_Box_View:{
    height:"45%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  Info_Holder_Veiw:{
    height:"80%",
    width:"90%",
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius:15
  },
  Main_Weather_Text:{
    fontSize:28,
    color:"#464646",
    marginLeft:"8%",
    marginTop:"8%",
    fontWeight:"bold"
  },
  description_text:{
    fontSize:20,
    color:"#121212",
    marginLeft:"8%",
    marginTop:"3%"
  },
  humidity_text:{
    fontSize:18,
    color:"#121212",
    marginLeft:"8%",
    marginTop:"5%"
  },
  other_text:{
    fontSize:18,
    color:"#121212",
    marginLeft:"8%",
    marginTop:"2%"
  }
})
