import React from "react";
import ImageSet from "../components/ImageSet/ImageSet";

const Characters = () => (
  <div className="o-wrapper o-wrapper--slim@ds">

    <h1 className="c-heading c-heading--large@ds">
      Ficha Técnica
    </h1>

    <div className="o-layout">
   
      <div className="flag flag--stack@mb o-layout__item">
        <div className="flag__solid-cp">
          <ImageSet src="/images/characters/elisangela.png" />
        </div>
        <div className="flag__fluid-cp u-pad-left-large">
          <h2 className="c-heading">Elisângela da Silva</h2>
          <p>
            Elisângela da Silva é cuidadora e ex-moradora do Pinheirinho, onde foi coordenadora da ocupação. Por 30 dias ela ocupou um terreno no bairro do Campo dos Alemães, junto com outros trabalhadores que viriam a realizar a primeira ocupação no terreno que futuramente iria se tornar conhecido como Pinheirinho. Apesar de ter vivido e ajudado a construir o bairro do Pinheirinho de 2004 a 2012, ela não foi contemplada pelo programa de habitação da prefeitura de São José dos Campos e continua a luta pela justa indenização.
          </p>
        </div>
      </div>

      <div className="flag flag--stack@mb o-layout__item">
        <div className="flag__solid-cp">
          <ImageSet src="/images/characters/gina.png" />
        </div>
        <div className="flag__fluid-cp u-pad-left-large">
          <h2 className="c-heading">Gina de Souza</h2>
          <p>
            Gina de Souza é garçonete e ex-moradora do Pinheirinho. Chegou nos primeiros meses da ocupação e conseguiu um terreno, onde construiu uma casa de três cômodos e uma mercearia que mais tarde viria a ser um bar. Ficou 8 anos no Pinheirinho, onde morava com o marido e os filhos numa casa com piso de taco. Gina era uma das únicas mulheres que faziam parte da tropa de resistência do Pinheirinho.
          </p>
        </div>
      </div>

      <div className="flag flag--stack@mb o-layout__item u-margin-bottom">
        <div className="flag__solid-cp">
          <ImageSet src="/images/characters/carmen.png" />
        </div>
        <div className="flag__fluid-cp u-pad-left-large">
          <h2 className="c-heading">Carmen Benedita</h2>
          <p>
            Carmen Benedita é costureira e ex-moradora do Pinheirinho. Em 2005 ela morava em Rio Comprido, Jacareí, quando ficou sabendo da ocupação pela TV, no aniversário de 1 ano do bairro. Com o aluguel vencido, mudou-se para lá e construiu uma casa num amplo terreno onde cultivava a própria horta. A fartura era tanta que além dos alimentos para ela e para sua família, compartilhava com os vizinhos. Durante a desocupação, foi ferida na perna pelos policiais. Carmen promete lutar para que todas as pessoas que moraram no Pinheirinho garantam o seu próprio lugar.
          </p>
        </div>
      </div>

      <div className="o-layout__item">
      <ul style={{marginTop: "2em"}}>
        <li className="u-mg-bottom-small">Empresa Produtora: <b>Davi Filmes</b></li>
        <li className="u-mg-bottom-small">Direção: <b>Viny Psoa</b></li>
        <li className="u-mg-bottom-small">Co-Direção: <b>Lívia Perez</b></li>
        <li className="u-mg-bottom-small">Roteiro: <b>Viny Psoa, Lívia Perez</b></li>
        <li className="u-mg-bottom-small">Produção Executiva: <b>Viny Psoa, Daniel Perseguim</b></li>
        <li className="u-mg-bottom-small">Consultoria Jurídica: <b>Karina Quintanilha</b></li>
        <li className="u-mg-bottom-small">Produção: <b>Maria Psoa</b></li>
        <li className="u-mg-bottom-small">Fotografia: <b>Daniel Perseguim</b></li>
        <li className="u-mg-bottom-small">Assistência de Fotografia: <b>Angélica de Paula, Diego Moreira, Douglas Dias</b></li>
        <li className="u-mg-bottom-small">Imagens aéreas: <b>Rodrigo Correia</b></li>
        <li className="u-mg-bottom-small">Som: <b>Giovanni Francischelli, Vanessa Negrine</b></li>
        <li className="u-mg-bottom-small">Montagem: <b>Viny Psoa</b></li>
        <li className="u-mg-bottom-small">Finalização de cor: <b>Igor Ângelo</b></li>
        <li className="u-mg-bottom-small">Trilha Sonora: <b>Tássia Reis</b></li>
        <li className="u-mg-bottom-small">Trilha Original e finalização de Som: <b>Renato Navarro</b></li>
        <li className="u-mg-bottom-small">Maquiagem: <b>Camilla Lima, Milena Tenreiro</b></li>
        <li className="u-mg-bottom-small">Design: <b>Romerito Pontes</b></li>
        <li className="u-mg-bottom-small">Design e programação: <b>Giovanni Francischelli Santos</b></li>
      </ul>
      </div>

    </div>
  </div>
);

export default Characters;
