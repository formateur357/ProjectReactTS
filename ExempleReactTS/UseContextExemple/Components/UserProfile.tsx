import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserProfile: React.FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserProfile doit être utilisé dans un UserProvider");
  }

  const { user, logout } = context;

  if (!user) {
    return <p>Utilisateur non connecté.</p>;
  }

  return (
    <div>
      <h2>Profil Utilisateur</h2>
      <p>
        <strong>Nom :</strong> {user.name}
      </p>
      <p>
        <strong>Email :</strong> {user.email}
      </p>
      <button onClick={logout}>Se Déconnecter</button>
    </div>
  );
};

export default UserProfile;
