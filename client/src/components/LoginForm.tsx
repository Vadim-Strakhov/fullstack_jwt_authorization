import { FC, useContext, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Пароль"
          className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        />
        <button
          onClick={() => store.login(email, password)}
          className="w-full px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Логин
        </button>
        <button
          onClick={() => store.registration(email, password)}
          className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-700 focus:outline-none"
        >
          Регистрация
        </button>
      </div>
    </div>
  );
};

export default observer(LoginForm);
