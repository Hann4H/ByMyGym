import React, { Component } from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import Banner from "./Banner";


import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light'
};

class Home extends Component {
  render() {
    const { isAuthenticated, login } = this.props.auth;
    return <Hero>
      <Banner title="ZAREZERWUJ SALĘ" subtitle="bez zbędnych telefonów">
        <Link to='/gyms' className='btn-primary'>
          ZOBACZ SALE
        </Link>
      </Banner>
    </Hero>;
    {/*(
      <>
      <header>
        
        <img src={require("./img/header_img.png")} style={{width: "100%"}} />
        <h1>Zarezerwuj salę</h1>
        <p>bez zbędnych telefonów</p>
      </header>
      

      <slider><h2>Znajdź odpowiednią salę gimnastyczną</h2></slider>

      {/*<calendar>
      <mobiscroll.Form>
                <div className="mbsc-grid">
                    <div className="mbsc-row">
                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                            <mobiscroll.FormGroup>
                                <mobiscroll.FormGroupTitle>Multi-day</mobiscroll.FormGroupTitle>
                                <mobiscroll.Calendar
                                    select="multiple"
                                    display="inline"
                                    type="hidden"
                                />
                            </mobiscroll.FormGroup>
                        </div>
                    </div>
                </div>
            </mobiscroll.Form>
      </calendar>*

      </>

    ); */}
  }
}

export default Home;
