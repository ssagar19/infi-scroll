import { useState, useEffect } from "react";
import Axios from "axios";

export default function useFetchImage(page) {
    const [images, setImages] = useState([]);
    useEffect(() => {
        Axios.get(
            `https://api.giphy.com/v1/gifs/trending?api_key=hZ7mmre1MO3P756r2fAh5lCKNGrGrKdE&offset=${page}&limit=10`
        ).then((res) => {
            setImages((prev) => [...prev, ...res.data.data]);
        });
    }, [page]);
    return [images, setImages];
}
