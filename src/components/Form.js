const Form = (props) => {
    return (
        <form className="form-inline justify-content-center m-2 search-form">
            <input
                value={props.search}
                onChange={props.handleSearchChange}
                type="text"
                placeholder="search"
                className="form-control"
            />
            <button type="submit" className="btn btn-primary mx-2">
                Search
            </button>
        </form>
    );
};

export default Form;
