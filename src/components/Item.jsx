import React, {memo} from 'react';

export const Item = memo(({data}) => {
    return (
        <div
            style={{
                border: '1px solid black',
                marginTop: '30px',
                padding: '25px'
            }}
        >
            {data.thumbnail !== 'self' && (
                <img src={data.thumbnail} alt=""/>
            )}
            <p>{data.title}</p>
            <p>Number of comments: {data.num_comments}</p>
            <a href={'https://www.reddit.com' + data.permalink}
               target='_blank'
               rel="noopener noreferrer"
            >
                link
            </a>
        </div>
    );
});