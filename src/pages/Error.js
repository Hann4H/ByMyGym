import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from "react-router-dom";

export default function Error() {
    return <><div id="pls"></div><Hero>
        <Banner title='404' subtitle="nie znaleziono strony">
            <Link to="/" className="btn-primary">
                wróć
            </Link>
        </Banner>
    </Hero></>;
}