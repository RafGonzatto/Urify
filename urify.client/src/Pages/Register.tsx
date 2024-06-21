import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            setError("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
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
                        throw new Error("Error registering.");
                    }
                    return response.status;
                })
                .then((status) => {
                    console.log(status); // Apenas para debug
                    setError("Successful register."); // Define o estado de erro como registro bem-sucedido
                })
                .catch((error) => {
                    console.error(error);
                    setError("Error registering.");
                });
        }
    };

    return (
        <div className="containerbox">
            <h3>Register</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>User Type:</label>
                    <div>
                        <input
                            type="radio"
                            id="student"
                            name="userType"
                            value="0"
                            checked={userType === "0"}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="student">Student</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="employee"
                            name="userType"
                            value="1"
                            checked={userType === "1"}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="employee">Employee</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="management"
                            name="userType"
                            value="2"
                            checked={userType === "2"}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="management">Management</label>
                    </div>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
                <div>
                    <button onClick={handleLoginClick}>Go to Login</button>
                </div>
            </form>

            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Register;
