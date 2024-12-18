import axiosInstance from "./axiosInstance";

export const createDocument= async(creatorId, title)=> {
    try {
        const response = await axiosInstance.post('/documents/create', {
            creatorId,
            title
        });

        const document = await response.data;
        console.log('Документ успешно создан:', document);
        return document; 
    } catch (error) {
        console.error('Не удалось создать документ:', error);
        throw error; 
    }
}


export const GetDocument = async (documentId, userId) => {
    try {
        const params = {
            documentId,
            userId
        };
        const response = await axiosInstance.get('/documents/', { params });

        const document = await response.data;
        console.log('Документ получен:', document);
        return document; 
    } catch (error) {
        console.error('Не удалось получить документ:', error);
        throw error; 
    }
}


export const EditDocument = async (documentId, userId,content,title) => {
    try {
       await axiosInstance.put('/documents/edit/', {
        DocumentId: documentId,
        EditorId: userId,
        NewContent: content,
        NewTitle: title
        });
        console.log('Документ изменен');
        return ; 
    } catch (error) {
        console.error('Не удалось изменить документ:', error);
        throw error; 
    }
}

export const GetAllDocuments = async (userId) => {
    try {
        const params = { userId };

        const response = await axiosInstance.get('/documents/all', { params });
        const documents = await response.data;
        console.log('Получены документы:', documents);
        return documents; 
    } catch (error) {
        console.error('Не удалось получить документы:', error);
        throw error; 
    }
};


export const GetUsersWithoutRoleInDocument = async (documentId) => {
    try {
        const params = { documentId };
        
        const response = await axiosInstance.get('/documents/notin/', { params });
        const users = await response.data;
        console.log('Получены пользователи:', users);
        return users; 
    } catch (error) {
        console.error('Не удалось получить пользователей:', error);
        throw error; 
    }
};

export const AddUserToDocument= async(userId, documentId,roleName,requesterId)=> {
    try {
        await axiosInstance.post('/documents/add-user', {
            UserId:userId,
            DocumentId:documentId,
            RoleName:roleName,
            RequesterId:requesterId
        });

        console.log('В документ добавлена роль');
        return ; 
    } catch (error) {
        console.error('Не удалось добавить роль:', error);
        throw error; 
    }
}




export const RemoveUserFromDocument = async (userId,documentId, requesterId) => {
    try {
        const params = {
            userId,
            documentId,
            requesterId
        };
        await axiosInstance.delete('/documents/remove-user', { params });

        
        console.log('Пользователь удалён:', document);
        return ; 
    } catch (error) {
        console.error('Не удалось удалить пользователя:', error);
        throw error; 
    }
}

export const RemoveDocument = async (documentId, deleterId) => {
    try {
        console.log('Удаление документа documentId: ', documentId,"requesterId: ",deleterId);
        const params = {
            documentId,
            deleterId
        };
        await axiosInstance.delete('/documents/delete/', { params });

        
        console.log('Документ удалён:', document);
        return ; 
    } catch (error) {
        console.error('Не удалось удалить документ:', error);
        throw error; 
    }
}
