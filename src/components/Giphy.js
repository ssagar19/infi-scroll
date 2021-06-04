import { useState } from "react";
import Form from "./Form";
import useFetchImage from "./useFetchImage";
import InfiniteScroll from "react-infinite-scroll-component";

const Giphy = (count) => {
    const [page, setPage] = useState(0);
    const [images, setImages] = useFetchImage(page);

    return (
        <div className="m-2">
            <h1 className="banner">Giphisix</h1>
            <Form />
            <div className="container gifs">
                <InfiniteScroll
                    dataLength={images.length}
                    next={() => setPage(page + 5)}
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
