
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../utils/useAuth';
import ImgInput from '../../components/ImgInput';

const CreateItem = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const loginUserEmail = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/item/create`, {
                method: 'POST',
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
            alert('アイテム作成失敗');
        }
    };

    if (loginUserEmail) {
        return (
            <div>
                <h1 className='page-title'>アイテム作成</h1>
                <ImgInput setImage={setImage} />
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name='title'
                        placeholder='アイテム名'
                        required
                    />
                    <input
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
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        name='description'
                        placeholder='商品説明'
                        rows={15}
                        required
                    />
                    <button type='submit'>
                        作成
                    </button>
                </form>
            </div>
        );
    }
};

export default CreateItem;