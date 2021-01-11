import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from "react-router-dom";

export default function FinishReservation() {
    return <><Hero>
        <Banner title='Rezerwacja została zarejestrowana' subtitle="Dostaniesz powiadomienie o potwierdzeniu rezerwacji">
            <Link to="/" className="btn-primary">
                wróć
            </Link>
        </Banner>
    </Hero>
    <br />
    <div id="pls"></div></>;
}