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
                    <li>Jak zarezerwować salę?</li>
                        <p>Na profilu danej sali znajduje się formularz, który należy uzupełnić. Następnie musisz wybrać przedział czasowy (rezerwacja krótko- lub długoterminowa), potem zostaje tylko akceptacja rezerwacji przez właściciela.</p>
                    <li>Jak można zostać właścicielem sali, która istnieje już na stronie?</li>
                        <p>Wystarczy, że napiszesz do nas poprzez formularz kontaktowy, do którego link znajduje się na dole strony. Możesz również kliknąć tutaj. Po weryfikacji dostaniesz uprawnienia właściciela - możliwość edycji danych sali oraz przyjmowania czy odrzucania rezerwacji.</p>
                    <li>Czy aby zarezerwować salę należy mieć konto?</li>
                        <p>Nie, można to zrobić bez konta. Wystarczy, że podasz wszystkie wymagane dane w formularzu, który znajduje się w profilu sali.</p>
                    <li>Czy możliwa jest płatność na stronie?</li>
                        <p>Nie, płatności dokonuje się poza stroną.</p>
                    <li>Czemu po dodaniu sali nie pojawia się ona od raz w wyszukiwaniu?</li>
                        <p>Aby sala pojawiała się w wyszukiwaniu musi najpierw zostać zatwierdzona przez admina.</p>
                    <li>Jak mogę odwołać rezerwację jeśli nie mam konta?</li>
                        <p>Skontaktuj się wtedy z opiekunem sali poprzez maila, którego znajdziesz na profilu sali.</p>
                    <li>Gdzie mogę zobaczyć swoje aktualne rezerwacje?</li>
                        <p>Te informacje znajdują się na profilu zarejestrowanego użytkownika.</p>
                </ol> 
            </div>
        </div>
        <div id="pls"></div>
      </>
    );
  }
}

export default FAQ;
