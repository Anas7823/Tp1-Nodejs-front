import '../style/App.css'; // c normal pour le css
import axios from "axios";
import React, { useEffect, useState } from "react";

function Commentaire() {
    const [commentaires, setCommentaires] = useState([]);
    const [newCommentaire, setNewCommentaire] = useState({
        commentaire: "",
        id_user: "",
        id_tech: "",
    });
    
    useEffect(() => {
        async function getCommentaires() {
        try {
            const response = await axios.get('http://localhost:8000/commentaire');
            setCommentaires(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des commentaires :', error);
        }
        }
    
        getCommentaires();
    }, []);
    
    // Fonction pour ajouter un utilisateur
    const ajouterCommentaire = async (event) => {
        event.preventDefault();
    
        try {
        const response = await axios.post('http://localhost:8000/commentaire', newCommentaire);
        console.log('Commentaire ajouté avec succès');
        
        // Actualiser la liste des utilisateurs après l'ajout
        setCommentaires([...commentaires, response.data]);
        
        // Réinitialiser les champs du formulaire
        setNewCommentaire({ nom: "", prenom: "", email: "" });
        } catch (error) {
        console.error('Erreur lors de l\'ajout du commentaire :', error);
        }
    };
    
    return (
        <div className='Commentaire'>
            <h1>Commentaire</h1>
            {/* affichage des commentaire */}
            <h2>Liste des commentaires</h2>
            <ul>
                {commentaires.map((commentaire) => (
                    <li key={commentaire.id}>
                        {commentaire.commentaire} {commentaire.id_user} {commentaire.id_tech}
                    </li>
                ))}
            </ul>
            
            {/* ajout des commentaire */}
            <form onSubmit={ajouterCommentaire}>
                <input
                    type='text'
                    placeholder='Commentaire'
                    value={newCommentaire.commentaire}
                    onChange={(event) => setNewCommentaire({ ...newCommentaire, commentaire: event.target.value })}
                />
                <input
                    type='text'
                    placeholder='Id user'
                    value={newCommentaire.id_user}
                    onChange={(event) => setNewCommentaire({ ...newCommentaire, id_user: event.target.value })}
                />
                <input
                    type='text'
                    placeholder='Id tech'
                    value={newCommentaire.id_tech}
                    onChange={(event) => setNewCommentaire({ ...newCommentaire, id_tech: event.target.value })}
                />
                <button type='submit'>Ajouter</button>
            </form>
            <ul>
                {commentaires.map((commentaire) => (
                    <li key={commentaire.id}>
                        {commentaire.nom} {commentaire.prenom} {commentaire.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Commentaire;
