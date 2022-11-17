import { useState } from "react";

function searchBar() {

    return (
        <input
            type="search"
            placeholder="Search..."
            style={{ borderRadius: "20px", border: "2px solid #1376BD" }}
            onChange={(event) => setSearch(event.target.value)}
        />
    );
}

export default searchBar;