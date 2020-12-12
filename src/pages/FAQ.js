import React, { Component } from "react";

class FAQ extends Component {

  render() {
    return (
      <>
        <div id="slash"></div>
        <div id="pls"></div>
        <div id="idk-11">
            <div className="faq-container">
                <h1 className="faq-h1">FAQ</h1>
                <ol>
                    <li>Jak można zostać właścicielem sali, która isteniej już na stronie?</li>
                        <p>Wystarczy, że napiszesz do nas poprzez formularz kontaktowey, do którego link znajduje się na dole strony. Możesz również kliknąć tutaj. Po weryfikacji dostaniesz uprawnienia właściciela - możliwość edycji danych sali oraz przyjmowania czy odrzucania rezerwacji.</p>
                    <li>Czy aby zarezerwować salę należy mieć konto?</li>
                        <p>Nie, można to zrobić bez konta. Wystarczy, że podasz wszystkie wymagane dane w formularzu, który znajduje się w profilu sali.</p>
                    <li>Czy możliwa jest płatność na stronie?</li>
                        <p>Nie, płatności dokonuje się poza stroną.</p>
                </ol> 
            </div>
        </div>
        <div id="pls"></div>
      </>
    );
  }
}

export default FAQ;
