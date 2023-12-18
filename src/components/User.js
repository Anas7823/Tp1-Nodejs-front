

import '../style/App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Commentaire from './Commentaire';
import { Link } from 'react-router-dom';

function User() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    email: "",
  });


  // Récupérer les utilisateurs au chargement du composant
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get('http://localhost:8000/utilisateur');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    }

    getUsers();
  }, []);

  // Fonction pour ajouter un utilisateur
  const ajouterUser = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/utilisateur', newUser);
      console.log('Utilisateur ajouté avec succès');
      
      // Actualiser la liste des utilisateurs après l'ajout
      setUsers([...users, response.data]);
      
      // Réinitialiser les champs du formulaire
      setNewUser({ nom: "", prenom: "", email: "" });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
    }
  };

  const supprimerUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/utilisateur/${id}`);
      console.log('Utilisateur supprimé avec succès');
      
      // Actualiser la liste des utilisateurs après la suppression
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  }

  const modifierUser = async (id) => {
    try {
      await axios.put(`http://localhost:8000/utilisateur/${id}`);
      console.log('Utilisateur modifié avec succès');
      
      // Actualiser la liste des utilisateurs après la modification
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Erreur lors de la modification de l\'utilisateur :', error);
    }
  }
  // Mettre à jour les valeurs du nouvel utilisateur au fur et à mesure de la saisie
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <div className="User">
      <Link to="/commentaire">Commentaire</Link>
      <header className="User-header">
        {users.map((user, index) => (
          <div key={index}>
            <p>{user.nom} {user.prenom} {user.email}</p> <button onClick={() => supprimerUser(user.id)}>Supprimer</button>
          </div>
        ))}
        <form onSubmit={ajouterUser}>
          <input
            type="text"
            placeholder="nom"
            name="nom"
            value={newUser.nom}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="prenom"
            name="prenom"
            value={newUser.prenom}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <button type="submit">Ajouter</button>
        </form>
        
      </header>
    </div>
  );
}

export default User;