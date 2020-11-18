import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from "react-router-dom";

export default function NoAccess() {
    return <><Hero>
        <Banner title='Błąd' subtitle="Brak uprawnień">
            <Link to="/" className="btn-primary">
                wróć
            </Link>
        </Banner>
    </Hero>
    <div id="pls"></div></>;
}