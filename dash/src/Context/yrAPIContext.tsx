import {createContext, useContext, useState} from "react";
import {PropsOf} from "@emotion/react";


// Create context
const YrContext = createContext<any>({});
// Getting the provider from projectContext
const {Provider} = YrContext

interface WeatherPoint {
    date: Date,
    temp: Number,
    humidity: Number,
    cloudPct: Number,
    wind: Number
}

const YrProvider = ({ children }: PropsOf<any>)  => {
    const [weatherPoints, setWeatherPoints] = useState<WeatherPoint[]>([])
    const [timeFetched, setTimeFetched] = useState<Date>()

    //const [showSearch, setShowSearch] = useState<boolean>(false)
    const lat = 59.4345119
    const lon = 10.6948694
    const api_url = "https://api.met.no/weatherapi/locationforecast/2.0/compact?altitude=50&lat="+lat+"&lon="+lon

    function fetchYrData() {
        fetch(api_url, {
            method: "GET",
        })
            .then(response => response.json())
            .then((responseJSON) => {
                const timeseriesData = responseJSON.properties.timeseries
                console.log(responseJSON.properties.timeseries)
                const tmpList: WeatherPoint[] = []
                timeseriesData.map((item: any) => {
                    const details = item.data.instant.details
                    tmpList.push({temp: details.air_temperature,
                                    humidity: details.relative_humidity,
                                    cloudPct: details.cloud_area_fraction,
                                    wind: details.wind_speed,
                                    date: new Date(item.time)
                    })
                })
                setWeatherPoints(tmpList)
                setTimeFetched(new Date(timeseriesData[0].time))
            })
    }


    /**
     * Returning the following functions for use for the files utilizing this context
     */
    return (
        // Wrap functions in the ProjectContext's Provider so children can access all these functions and states
        <Provider
            value={{
                fetchYrData,
                weatherPoints,
                timeFetched
            }}
        >
            {children}
        </Provider>
    );
}

export { YrContext, YrProvider };