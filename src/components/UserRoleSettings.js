import React from 'react';

const getUserName = (user) => {
    return user.userName || user.username || 'Неизвестный пользователь';
};

const getUserId = (user) => {
    return user.userId || user.id ;
};

const UserRoleSettings = ({ role, users, removeUser }) => {
    return (
        <div>
            <h3>{role}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Имя пользователя</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{getUserName(user)}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button onClick={() => removeUser(user)}>✖</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserRoleSettings;

