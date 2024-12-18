import React from 'react';
import styled from 'styled-components';

const UserListContainer = styled.div`
    max-height: 400px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
`;

const UserItem = styled.li`
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const RoleSelector = styled.select`
    margin-left: 10px;
`;

const ShowUsersNotInDocument = ({ addUser, usersWithoutRole }) => {
    return (
        <UserListContainer>
            <ul>
                {usersWithoutRole.map((user) => (
                    <UserItem key={user.id}>
                        {user.userName}
                        <RoleSelector onChange={(e) => addUser(user, e.target.value)}>
                            <option value="">Выберите роль</option>
                            <option value="viewer">Читатель</option>
                            <option value="editor">Редактор</option>
                            <option value="admin">Администратор</option>
                        </RoleSelector>
                    </UserItem>
                ))}
            </ul>
        </UserListContainer>
    );
};

export default ShowUsersNotInDocument;
