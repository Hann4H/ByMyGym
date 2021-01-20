import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from "react-router-dom";

export default function Error() {
    return <><Hero>
        <Banner title='404' subtitle="nie znaleziono strony">
            <Link to="/" className="btn-primary">
                wróć
            </Link>
        </Banner>
    </Hero>
    <div id="pls"></div>
    <div id="pls"></div></>;
}