import axios from "axios";

//根据经纬度获取当地空气质量
export async function fetchEnvironment(LngLat) {
    /*
    return {
        aqi: 25,
        aqi_level: "优",
        co: 0.8,
        no2: 34,
        o3: 36,
        pm10: 25,
        pm25: 16,
        so2: 3,
    }
    */
    const url = `https://eolink.o.apispace.com/34324/air/v001/aqi?lonlat=${LngLat.Lng},${LngLat.Lat}`;
    const headers = {
        'X-APISpace-Token': '9eenljb5pg26t3p028da518axi7feqt4'
    };
    const response = axios.get(url, { headers });
    console.log(response);
    return (await response).data.result.realtimeAqi;
}