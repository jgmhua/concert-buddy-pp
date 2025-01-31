import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./PlaylistCard.scss";

export default function PlaylistCard( { id, name, image, tracksTotal }) {

    return (

        <>
            <li className="playlists__item" key={id}>
                <section className="playlists__playlist">
                    <Link
                        className="playlists__url"
                        to={`/playlists/${id}`}
                    >
                        <h3 className="playlists__text">{name}</h3>
                        <img
                            className="playlists__cover"
                            src={image}
                        />
                        <p className="playlists__text playlists__text--details">
                            Total tracks: {tracksTotal}
                        </p>
                    </Link>
                </section>
            </li>



        </>


    )

}