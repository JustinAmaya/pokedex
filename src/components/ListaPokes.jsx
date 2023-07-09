import React, { useEffect, useState } from 'react'
import CardPokemon from './CardPokemon';

export default function ListaPokes() {
    //declarando un estado para el arreglo de pokemones
    const [pokemones, setPokemones] = useState([]);

    //metodo para llamar a la API pokemon
    const getPokemones = async () => {
        //estamos solicitando una peticion asincrona por medio de fetch para que nos devuelva una promesa
        const resultado = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        //convertimos la promesa en un json
        const datos = await resultado.json();

        //creando un metodo para potener la informacion de cada pokemon por su nombre
        function caracteristicasPokemon(resultado){ //[]
            resultado.forEach(async (pokemon) => {
              const respoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
              
              const datopoke = await respoke.json();

              //console.log(datopoke);

              //actualizando el estado
              setPokemones((listaActual) => [...listaActual, datopoke]);
              await pokemones.sort(); 
            });

            

        }

          //llamando a la funcion de cada pokemon
          caracteristicasPokemon(datos.results);
        
    }

    //useEffect => un gancho de efectos (montar el estado, actualizarlo y desmontarlo)

    //primer parametro: ayuda a montar el estado o al metodo para renderizarlo
    //segundo parametro: [] eso significa que lo va a renderizar una vez
    useEffect(() => {
        getPokemones();
    }, [])

    console.log(pokemones)
  return (
    <div className='row'>
      {
        
        pokemones.map((pokemon, indice) => {

            return(
              <div className='col-md-4'>
              {
                /**mandando la infor del pokemon en otro componente */
                <CardPokemon
                key = {indice}
                id = {pokemon.id}
                name = {pokemon.name}
                specie = {pokemon.species.name}
                image = {pokemon.sprites.other["official-artwork"].front_default}
                height = {pokemon.height}
                weight = {pokemon.weight}
                stats = {pokemon.stats[0].base_stat}
                type = {pokemon.types[0].type.name}
                />
                  
                  
                
              }
            </div>
            )

          /*return(
            <div key={indice}>
              <h1>{pokemon.name}</h1>
              <p>ID: {pokemon.id}</p>
              <p>Especies: {pokemon.species.name}</p>
              <p>Stats: {pokemon.stats[0].base_stat}</p>

              {
                /*pokemon.stats.map((elemento) => {
                  return(
                    <p>{elemento.base_stat}</p>
                  )
                })
              }
            </div>
          )**/
        })
      }
    </div>
  )
}
