
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ReadAllitems = () => {
    const [allItems, setAllItems] = useState([]);

    useEffect(() => {
        const getAllItems = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}`);
                const jsonData = await response.json();
                setAllItems(jsonData.allItems);
            } catch (err) {
                console.log(err);
            }
        };
        getAllItems();
    }, []);

    return (
        <div>
            <div className='grid-container-in'>
                {allItems && allItems.map((item) => (
                    <Link
                        key={item._id}
                        to={`/item/${item._id}`}
                        className='card'
                    >
                        <img src={item.image} alt="item-image" />
                        <div className='texts-area'>
                            <h2>￥{item.price}</h2>
                            <h3>{item.title}</h3>
                            <p>{item.description.substring(0, 80)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ReadAllitems;