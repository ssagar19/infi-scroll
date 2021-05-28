import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Paginate from "./Paginate";

const Giphy = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const response = await fetch(
                    "https://api.giphy.com/v1/gifs/trending?api_key=hZ7mmre1MO3P756r2fAh5lCKNGrGrKdE&limit=100"
                );
                const results = await response.json();

                setData(results.data);
            } catch (err) {
                setIsError(true);
                console.log(err);
                setTimeout(() => setIsError(false), 4000);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const renderGifs = () => {
        if (isLoading) {
            return <Loader />;
        }
        return currentItems.map((el) => {
            return (
                <div key={el.id} className="gif">
                    <img src={el.images.fixed_height.url} alt="" />
                </div>
            );
        });
    };
    const renderError = () => {
        if (isError) {
            return (
                <div
                    className="alert alert-primary alert-dismissible fade show"
                    role="alert"
                >
                    Unable to get Gifs, please try again in a few minutes
                </div>
            );
        }
    };
    const handleSearchChange = async (e) => {
        setSearch(e.target.value);
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=hZ7mmre1MO3P756r2fAh5lCKNGrGrKdE&limit=100`
        );
        const results = await response.json();
        setData(results.data);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsError(false);
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=hZ7mmre1MO3P756r2fAh5lCKNGrGrKdE&limit=100`
            );
            const results = await response.json();
            setData(results.data);
        } catch (err) {
            setIsError(true);
            console.log(err);
            setTimeout(() => setIsError(false), 4000);
        }
        // setSearch(search);
        setIsLoading(false);
    };

    const pageSelected = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="m-2">
            {renderError()}
            <form className="form-inline justify-content-center m-2">
                <input
                    value={search}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="search"
                    className="form-control"
                />
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-primary mx-2"
                >
                    Search
                </button>
            </form>
            <Paginate
                pageSelected={pageSelected}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={data.length}
            />
            <div className="container gifs">{renderGifs()}</div>;
        </div>
    );
};

export default Giphy;
