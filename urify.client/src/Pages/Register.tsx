import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userType, setUserType] = useState(""); // State para armazenar o tipo de usuário
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
        if (name === "firstName") setFirstName(value);
        if (name === "lastName") setLastName(value);
    };

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        setUserType(value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword || !firstName || !lastName || !userType) {
            setError("Preencha todas os campos.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Insira um Email válido");
        } else if (password !== confirmPassword) {
            setError("Senhas são diferentes.");
        } else {
            setError("");

            const queryString = `?Email=${encodeURIComponent(email)}&Password=${encodeURIComponent(password)}&FirstName=${encodeURIComponent(firstName)}&LastName=${encodeURIComponent(lastName)}&userType=${encodeURIComponent(userType)}`;

            fetch(`/add-user${queryString}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erro ao registrar.");
                    }
                    return response.status;
                })
                .then((status) => {
                    console.log(status); // Apenas para debug
                    setError("Registro bem sucedido."); // Define o estado de erro como registro bem-sucedido
                })
                .catch((error) => {
                    console.error(error);
                    setError("Erro ao registrar.");
                });
        }
    };

    return (
        <div className="register-container">
            <h2>Cadastrar</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">Nome</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Sobrenome</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group form-checkbox-group">
                    <label>Tipo de Usu{String.fromCharCode(225)}rio:</label>
                    <div className="form-checkbox">
                        <input
                            type="radio"
                            id="student"
                            name="userType"
                            value="0"
                            checked={userType === "0"}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="student">Estudante</label>
                    </div>
                    <div className="form-checkbox">
                        <input
                            type="radio"
                            id="employee"
                            name="userType"
                            value="1"
                            checked={userType === "1"}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="employee">Funcion{String.fromCharCode(225)}rio</label>
                    </div>
                    <div className="form-checkbox">
                        <input
                            type="radio"
                            id="management"
                            name="userType"
                            value="2"
                            checked={userType === "2"}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="management">Ger{String.fromCharCode(234)}ncia</label>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="register-button">Cadastrar</button>
                </div>
                <div className="form-group">
                    <button type="button" onClick={handleLoginClick} className="login-button">Ir para Login</button>
                </div>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Register;
