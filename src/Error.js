import React from 'react';
import Hero from './Hero';
import Banner from './Banner';
import { Link } from "react-router-dom";

export default function Error() {
    return <Hero>
        <Banner title='404' subtitle="nie znaleziono strony">
            <Link to="/" className="btn-primary">
                wróć
            </Link>
        </Banner>
    </Hero>;
}