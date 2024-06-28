import { FC, useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Загрузка...</div>
      </div>
    );
  }

  if (!store.isAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <LoginForm />
        {/* <div className="mt-6">
          <button
            onClick={getUsers}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Получить пользователей
          </button>
        </div> */}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-700">
          {store.isAuth
            ? `Пользователь авторизован: ${store.user.email}`
            : "Авторизуйтесь"}
        </h1>
        <h2 className="mb-4 text-xl text-gray-600">
          {store.user.isActivated
            ? "Аккаунт подтвержден по почте"
            : "Подтвердите аккаунт"}
        </h2>
        <button
          onClick={() => store.logout()}
          className="w-full px-4 py-2 mb-4 font-bold text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none"
        >
          Выйти
        </button>
        <div className="mb-6">
          <button
            onClick={getUsers}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Получить пользователей
          </button>
        </div>
        {users.map((user) => (
          <div
            key={user.email}
            className="p-2 mb-2 text-gray-700 bg-gray-100 rounded-md"
          >
            {user.email}
          </div>
        ))}
      </div>
    </div>
  );
};
export default observer(App);
