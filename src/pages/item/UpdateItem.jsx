
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../utils/useAuth';

const UpdateItem = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const loginUserEmail = useAuth();

    useEffect(() => {
        const getSingleItem = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/item/${id}`);
                const jsonData = await response.json();
                const { title, price, image, description, email } = jsonData.singleItem;
                setTitle(title);
                setPrice(price);
                setImage(image);
                setDescription(description);
                setEmail(email);
            } catch (err) {
                console.log(err);
            }
        };
        getSingleItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/item/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            navigate('/');
        } catch (err) {
            console.log(err);
            alert('アイテム編集失敗');
        }
    };

    if (loginUserEmail === email) {
        return (
            <div>
                <h1 className='page-title'>アイテム編集</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name='title'
                        placeholder='アイテム名'
                        required
                    />
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        name='price'
                        placeholder='価格'
                        required
                    />
                    <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                        name='image'
                        placeholder='画像'
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        name='description'
                        placeholder='商品説明'
                        rows={15}
                        required
                    />
                    <button type='submit'>
                        編集
                    </button>
                </form>
            </div>
        );
    } else {
        return <h1>権限がありません</h1>
    }
};

export default UpdateItem;