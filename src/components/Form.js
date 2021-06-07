const Form = ({ search, handlesubmit, handleSearch }) => {
    return (
        <form className="form-inline justify-content-center m-2 search-form">
            <input
                value={search}
                onChange={(e) => handleSearch(e)}
                type="text"
                placeholder="search for more Gifs"
                className="form-control"
            />
            <button
                type="submit"
                className="btn btn-primary mx-2"
                onClick={(e) => handlesubmit(e, search)}
            >
                Search
            </button>
        </form>
    );
};

export default Form;
