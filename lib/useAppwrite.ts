import {useEffect, useState} from "react";
import {Alert} from "react-native";

const useAppwrite = (fn, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchData = async () => {
        setIsLoading(true)
        try {
            if (query) {
                const data = await fn(query)
                setData(data)
            } else {
                const data = await fn()
                setData(data)
            }
        } catch (e) {
            Alert.alert('Error', e.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => fetchData()
    if(data){
        return {data:data.documents, refetch}
    }else {
        return {data: [{}], refetch}
    }
}

export default useAppwrite;