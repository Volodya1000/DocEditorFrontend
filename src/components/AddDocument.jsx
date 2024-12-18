import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../features/auth/authSlice';
import { addDocument } from '../features/documents/documentSlice';
import { createDocument } from '../services/documents';

const AddDocument = () => {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId); 

    const handleAddDocument = async () => {
        if (name) {
            const docId = await createDocument(userId, name);
            dispatch(addDocument({ title:name, userRoleIdDocument: "Admin", id: docId }));

            console.log('Создан документ:', docId);
            setName('');
        }
    };
    
    return (
        <div>
            <input 
                type="text" 
                placeholder="Название документа" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <button onClick={handleAddDocument}>Создать документ</button>
        </div>
    );
};

export default AddDocument;
