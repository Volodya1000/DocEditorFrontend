import React, { useState } from 'react';

const UserSettings = ({ navigateTo}) => {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSave = () => {
        alert('Данные успешно сохранены!');
    };

    const handleChangePassword = () => {
        alert('Пароль успешно изменён!');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Настройки пользователя</h2>
            <div>
                <label>
                    Имя:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите ваше имя"
                    />
                </label>
            </div>
            <div>
                <label>
                    О себе:
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Напишите о себе"
                    />
                </label>
            </div>
            <button onClick={handleSave}>Сохранить</button>

            <h3>Смена пароля</h3>
            <div>
                <label>
                    Старый пароль:
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Введите старый пароль"
                    />
                </label>
            </div>
            <div>
                <label>
                    Новый пароль:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Введите новый пароль"
                    />
                </label>
            </div>
            <button onClick={handleChangePassword}>Сменить пароль</button>

            <button onClick={() => navigateTo('home')}>В главное меню</button>
        </div>
    );
};

export default UserSettings;