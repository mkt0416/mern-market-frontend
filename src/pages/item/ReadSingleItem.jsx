
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const ReadSingleItem = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const getSingleItem = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/item/${id}`);
                const jsonData = await response.json();
                const { title, price, image, description } = jsonData.singleItem;
                setTitle(title);
                setPrice(price);
                setImage(image);
                setDescription(description);
            } catch (err) {
                console.log(err);
            }
        };
        getSingleItem();
    }, [id]);
    return (
        <div className='grid-container-si'>
            <div>
                {image && <img src={image} alt='item-image' />}
            </div>
            <div>
                <h1>{title}</h1>
                <h2>￥{price}</h2>
                <hr />
                <p>{description}</p>
            </div>
            <div>
                <Link to={`/item/update/${id}`}>編集</Link>
                <Link to={`/item/delete/${id}`}>削除</Link>
            </div>
        </div>
    );
};

export default ReadSingleItem;