import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./PlaylistCard.scss";

export default function PlaylistCard({ id, name, image, tracksTotal }) {

    return (

        <>
            <li className="playlists__item" key={id}>
                <section className="playlists__playlist">
                    <Link
                        className="playlists__url"
                        to={`/playlists/${id}`}
                    >
                        <div className='playlists__cover-container'>
                            <img
                                className="playlists__cover"
                                src={image}
                            />
        
                        </div>

                        <div className="playlists__info-container">
                            <h3 className="playlists__title">{name}</h3>
                            <p className="playlists__tracks">Total tracks: {tracksTotal}</p>
                        </div>

                    </Link>
                </section>
            </li>



        </>


    )

}