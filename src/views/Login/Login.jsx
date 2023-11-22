import React, { useState } from 'react';
import axios from 'axios';
import { encryptData, decryptData } from '../../services/Criptography';
import { useUser } from "../../usercontext";

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const { singin } = useUser();

  const handleLogin = async () => {
    // Verifica el estado de isLoggedIn

      try {
        const apiUrl = 'https://omsappapi.azurewebsites.net/api/Users/login';
        const requestData = {
          user: encryptData(username),
          password: encryptData(password),
        };

        const response = await axios.post(apiUrl, requestData, {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
          },
        });

        const apiUrl2 = 'https://omsappapi.azurewebsites.net/api/Assignment/GetInfoDriver';

        const response2 = await axios.get(`${apiUrl2}?id=${response.data.userinfo.id}`, {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json',
          },
        });

        setResponse(response.data.success);
        console.log("data ",decryptData(response.data.userinfo.rolId))
        singin(response.data.userinfo,response2.data.dataList[0])
        console.log("data 2 ",response2.data.dataList[0])

        if (response.data.success === true) {
          props.setLoggedIn(true);

          if (decryptData(response.data.userinfo.rolId) == 2) {
            props.history.push("/control-dashboard");
          } else if (decryptData(response.data.userinfo.rolId) == 3) {
            props.history.push("/");
          }
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    }
  

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form>
        <label>
          Usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
