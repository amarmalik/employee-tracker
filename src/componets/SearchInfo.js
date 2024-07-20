import React from 'react';

const SearchInfo = ({ searchTerm, resultsCount }) => {
    return (
        <div>
            {searchTerm.length >= 3 && (
                <p>
                    Search term: <strong>{searchTerm}</strong> - Results found: <strong>{resultsCount}</strong>
                </p>
            )}
        </div>
    );
};

export default SearchInfo;
