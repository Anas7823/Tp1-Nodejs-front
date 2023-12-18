import '../style/App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

function Technologie() {
    const [technologies, setTechnologies] = useState([]);
    const { IdTech } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                if (IdTech) {  // Vérifiez si IdTech a une valeur
                    const technologieResponse = await axios.get(`http://localhost:8000/technologie/${IdTech}`);
                    setTechnologies(technologieResponse.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        }

        fetchData();
    }, [IdTech]);
    console.log('Technologies dans l\'état :', technologies);


    return (
        <div className='Technologie'>
            <h1>Technologie</h1>
            <h2>Liste des technologies</h2>
            <ul>
            {technologies.length > 0 ? (
                    <ul>
                        {technologies.map((technologie) => (
                            <li key={technologie.id}>
                                {technologie.nom}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune technologie disponible.</p>
                )}

            </ul>
        </div>
    );
}

export default Technologie;
