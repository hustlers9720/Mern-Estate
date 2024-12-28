import { useState } from 'react';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: ["data:image/jpeg;base64,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","https://img.freepik.com/free-photo/house-with-large-roof-balcony-with-tree-middle_1340-35839.jpg" , "data:image/jpeg;base64,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"],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log(formData);
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setImageUploadError(false);
                    setUploading(false);
                })
                .catch((err) => {
                    setImageUploadError('Image upload failed (2 mb max per image)');
                    setUploading(false);
                });
        } else {
            setImageUploadError('You can only upload 6 images per listing');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (
            e.target.id === 'parking' ||
            e.target.id === 'furnished' ||
            e.target.id === 'offer'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === 'number' ||
            e.target.type === 'text' ||
            e.target.type === 'textarea'
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // if (formData.imageUrls.length < 1)
            //     return setError('You must upload at least one image');
            if (+formData.regularPrice < +formData.discountPrice)
                return setError('Discount price must be lower than regular price');
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>
                Create a Listing
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        type='text'
                        placeholder='Name'
                        className='border p-3 rounded-lg'
                        id='name'
                        maxLength='62'
                        minLength='10'
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        type='text'
                        placeholder='Description'
                        className='border p-3 rounded-lg'
                        id='description'
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        type='text'
                        placeholder='Address'
                        className='border p-3 rounded-lg'
                        id='address'
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'sale'}
                            />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bathrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg'
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='regularPrice'
                                min='50'
                                max='10000000'
                                required
                                className='p-3 border border-gray-300 rounded-lg'
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                {formData.type === 'rent' && (
                                    <span className='text-xs'>($ / month)</span>
                                )}
                            </div>
                        </div>
                        {formData.offer && (
                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    id='discountPrice'
                                    min='0'
                                    max='10000000'
                                    required
                                    className='p-3 border border-gray-300 rounded-lg'
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                />
                                <div className='flex flex-col items-center'>
                                    <p>Discounted price</p>

                                    {formData.type === 'rent' && (
                                        <span className='text-xs'>($ / month)</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-600 ml-2'>
                            The first image will be the cover (max 6)
                        </span>
                    </p>
                    <div className='flex gap-4'>
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className='p-3 border border-gray-300 rounded w-full'
                            type='file'
                            id='images'
                            accept='image/*'
                            multiple
                        />
                        <button
                            type='button'
                            disabled={uploading}
                            onClick={handleImageSubmit}
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-700 text-sm'>
                        {imageUploadError && imageUploadError}
                    </p>
                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div
                                key={url}
                                className='flex justify-between p-3 border items-center'
                            >
                                <img
                                    src={url}
                                    alt='listing image'
                                    className='w-20 h-20 object-contain rounded-lg'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    <button
                        disabled={loading || uploading}
                        className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        {loading ? 'Creating...' : 'Create listing'}
                    </button>
                    {error && <p className='text-red-700 text-sm'>{error}</p>}
                </div>
            </form>
        </main>
    );
}