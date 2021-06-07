import Axios from "axios";
import { useState, useEffect } from "react";
import Form from "./Form";
import InfiniteScroll from "react-infinite-scroll-component";

const Giphy = () => {
    const [search, setSearch] = useState("");

    const [images, setImages] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [page]);

    // used asynd and await for fetching data
    async function fetchData() {
        if (search) {
            const res = await Axios.get(
                `https://api.giphy.com/v1/gifs/search?api_key=hZ7mmre1MO3P756r2fAh5lCKNGrGrKdE&q=${search}&offset=${page}&limit=${10}`
            );
            setImages((prev) => [...prev, ...res.data.data]);
        } else {
            const res = await Axios.get(
                `https://api.giphy.com/v1/gifs/trending?api_key=hZ7mmre1MO3P756r2fAh5lCKNGrGrKdE&offset=${page}&limit=${10}`
            );
            setImages((prev) => [...prev, ...res.data.data]);
        }
    }

    function handleSearchChange(e) {
        setSearch(e.target.value);
    }

    async function handleSubmit(e, search) {
        console.log(search);
        setImages([]);
        e.preventDefault();
        Axios.get(
            `https://api.giphy.com/v1/gifs/search?api_key=hZ7mmre1MO3P756r2fAh5lCKNGrGrKdE&q=${search}&offset=${page}&limit=${10}`
        ).then((res) => {
            console.log(res);
            setImages((prev) => [...prev, ...res.data.data]);
        });
    }

    return (
        <div className="m-2">
            <h1 className="banner">Giphisix</h1>
            <Form
                handleSearch={handleSearchChange}
                search={search}
                handlesubmit={handleSubmit}
            />
            <div className="container gifs">
                <InfiniteScroll
                    dataLength={images.length}
                    next={() => setPage((page) => page + 10)}
                    hasMore={true}
                >
                    {images.map((el) => (
                        <div id="photos" key={el.id} className="gif">
                            <img src={el.images.fixed_height.url} alt="" />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
            ;
        </div>
    );
};

export default Giphy;
