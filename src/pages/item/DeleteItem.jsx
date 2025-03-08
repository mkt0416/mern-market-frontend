
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../utils/useAuth';

const DeleteItem = () => {
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
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/item/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const jsonData = await response.json();
            alert(jsonData.message);
            navigate('/');
        } catch (err) {
            console.log(err);
            alert('アイテム削除失敗');
        }
    };

    if (loginUserEmail === email) {
        return (
            <div className='delete-page'>
                <h1 className='page-title'>アイテム削除</h1>
                <form onSubmit={handleSubmit}>
                    <h2>{title}</h2>
                    {image && <img src={image} alt='item-image' />}
                    <h3>￥{price}</h3>
                    <p>{description}</p>
                    <button type='submit'>
                        削除
                    </button>
                </form>
            </div>
        );
    } else {
        return <h1>権限がありません</h1>
    }
};

export default DeleteItem;