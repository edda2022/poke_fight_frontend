import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Link } from "react-router-dom";
import PokemonList from "./PokemonList";



export default function PokeFight({playerA, playerB }) {


    return(
        <>
        <div className="pokefight">
             
             <div> 1 player selected: {playerA}
             </div>

             <div>
                2 player selected: {playerB}

              
             </div>

        </div>
        </>
    )
}