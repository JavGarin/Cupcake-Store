import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import './Profile.css';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setMessage("Contraseña actualizada correctamente");
      setNewPassword("");
    } catch (err) {
      setMessage("Error al actualizar contraseña");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center mt-5">Cargando perfil...</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Perfil de Usuario</h2>

        <div className="profile-info">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>

  

        {message && <p className="profile-message">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
