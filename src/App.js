import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  //Adquirir o botão "New User", a janela de cadastro e atualização.
  const newUserButton = document.querySelector(".div-new-user-button");
  const registrationWindow = document.querySelector(".registration-window");
  const updateWindow = document.querySelector(".update-window");

  //Lista de usuários cadastrados.
  const [dataClient, setDataClient] = useState([]);

  //Atributos necessários para cadastrar usuários.
  var [nameClient, setNameClient] = useState(undefined);
  var [emailClient, setEmailClient] = useState(undefined);
  var [phoneClient, setPhoneClient] = useState(undefined);
  var [countryClient, setCountryClient] = useState(undefined);

  //Adquirindo o ID dos atributos de cadastro.
  const inputName = document.getElementById("name-input");
  const inputEmail = document.getElementById("email-input");
  const inputPhone = document.getElementById("phone-input");
  const inputCountry = document.getElementById("country-input");

  //Adquirindo o ID dos atributos de atualização.
  const upInputName = document.getElementById("up-name-input");
  const upInputEmail = document.getElementById("up-email-input");
  const upInputPhone = document.getElementById("up-phone-input");
  const upInputCountry = document.getElementById("up-country-input");

  //Acesso ao LocalStorage.
  const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [];
  const setLocalStorage = (addClient) => localStorage.setItem("db_client", JSON.stringify(addClient));

  //Lista acessa o conteúdo presente no LocalStorage ao iniciar.
  useEffect(()=>{
    setDataClient(getLocalStorage);
  },[]);

  //Atribuir nome.
  const toAssignName = (event) => {
    var formatName = event.target.value;
    formatName = formatName.toUpperCase();
    setNameClient(nameClient = formatName);

    inputName.value = formatName;
    upInputName.value = formatName;
  };

  //Atribuir cidade.
  const toAssignCountry = (country) => {
    var formatCountry = country.target.value;
    formatCountry = formatCountry.toUpperCase();
    setCountryClient(countryClient = formatCountry);

    inputCountry.value = formatCountry;
    upInputCountry.value = formatCountry;
  };

  //Formatar número de telefone.
  const formatPhoneNumber = (phone) => {
    var formatPhone = phone.target.value;
    formatPhone = formatPhone.replace(/\D/g,""); //remover tudo que não seja número.
    formatPhone = formatPhone.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca pararêntese em volta dos dois primeiros números.
    formatPhone = formatPhone.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e quinto item.
    inputPhone.value = formatPhone;
    setPhoneClient(phoneClient = formatPhone);
  };

  //Cadastrar usuário.
  const createClient = () => {
    if (nameClient === undefined ||
      emailClient === undefined || 
      phoneClient === undefined ||
      countryClient === undefined){
      alert("por favor, preencha os campos corretamente");
    } else {

      const clientModel = {
        name: nameClient,
        email: emailClient,
        phone: phoneClient,
        country: countryClient
      };
  
      const getDB = getLocalStorage();
      getDB.push(clientModel);
      setLocalStorage(getDB);
  
      setDataClient([...dataClient, clientModel]);
      clearForm();

      closeRegistrationWind();
    };
  };

  //Limpar formulário.
  const clearForm = () => {
  setNameClient(undefined);
  setEmailClient(undefined);
  setPhoneClient(undefined);
  setCountryClient(undefined);

  inputName.value = "";
  inputEmail.value = "";
  inputPhone.value = "";
  inputCountry.value = "";

  upInputName.value = "";
  upInputEmail.value = "";
  upInputPhone.value = "";
  upInputCountry.value = "";
  };

  //Abrir janela de cadastro.
  const openRegistrationWind = ()=>{
    newUserButton.style.display = 'none';
    updateWindow.style.display = 'none';
    registrationWindow.style.display = 'block';
  };

  //Fechar janela de cadastro.
  const closeRegistrationWind = () => {
    registrationWindow.style.display = 'none';
    newUserButton.style.display = 'block';

    setNameClient(undefined);
    setEmailClient(undefined);
    setPhoneClient(undefined);
    setCountryClient(undefined);

    inputName.value = "";
    inputEmail.value = "";
    inputPhone.value = "";
    inputCountry.value = "";
  };

  //Fechar janela de Atualização.
  const closeUpdateWind = () => {
    updateWindow.style.display = 'none';
    newUserButton.style.display = 'block';
  };
  //Deletar usuário cadastro.
  const deleteClient = (index) => {
    const getDB = getLocalStorage();
    getDB.splice(index, 1);
    setLocalStorage(getDB);

    setDataClient(getLocalStorage);
  };

  //Atualizar dados do usuário cadastrado.
  const updateClient = (index, client) => {
    const getDB = getLocalStorage();
    getDB[index] = client;
    setLocalStorage(getDB);

    closeUpdateWind();
  };

  //Checar os dados e direcionar para função de atualização dos dados.
  const checkDatas = () => {
      const saveButtonId  = document.getElementById("update-clicked").value;

      if (nameClient === undefined ||
        emailClient === undefined ||
        phoneClient === undefined ||
        countryClient === undefined){
        alert("por favor, preencha os campos corretamente");
      } else if (phoneClient < 11 && phoneClient > 11){
        alert("por favor, informe um numero de telefone válido");
      } else {

        const clientModel = {
          name: nameClient,
          email: emailClient,
          phone: phoneClient,
          country: countryClient
        };
        updateClient(saveButtonId, clientModel);
        setDataClient(getLocalStorage);
        clearForm();
      };
  };

  //Definir uma ação.
  const toDefineAction = (action) =>{
    const dataButton = action.target.dataset.action;
    const indexButton = action.target.id;
    document.getElementById("update-clicked").value = indexButton;

    if (dataButton === "update"){

      registrationWindow.style.display = 'none';
      newUserButton.style.display = 'none';
      updateWindow.style.display = 'block';

      const getDB = getLocalStorage()[indexButton];

      upInputName.value = getDB.name;
      upInputEmail.value = getDB.email;
      upInputPhone.value = getDB.phone;
      upInputCountry.value = getDB.country;

      setNameClient(nameClient = getDB.name);
      setEmailClient(emailClient = getDB.email);
      setPhoneClient(phoneClient = getDB.phone);
      setCountryClient(countryClient = getDB.country);

    } else if (dataButton === "delete"){

      const getName = getLocalStorage()[indexButton];
      var choose = window.confirm(`Tem certeza que deseja excluir os dados de ${getName.name}?`);

      if(choose === true){
        deleteClient(indexButton);
      };
    };
  };

  //retorno do componente.
  return (
    <div className="App">
      <div className="user-registred-header">
        <h3>REGISTERED USERS</h3>
      </div>

      <div className="nepca-field">
        <fieldset className="name">
          <label>NAME</label>
          </fieldset>

        <fieldset className="email">
          <label>EMAIL</label>
          </fieldset>

        <fieldset className="phone">
          <label>PHONE</label>
          </fieldset>

        <fieldset className="country">
          <label>ADDRESS</label>
          </fieldset>
        <fieldset className="country">
          <label>ACTIONS</label>
          </fieldset>
      </div>
      
      <fieldset className="reader-datas">
        {dataClient.length > 0 ? (
          <div className="maped-list">
            {dataClient.map((item,id) => (
            <div className="added-datas-list" key={id}>
                
              <fieldset className="name">
                <label>{item.name}</label>
              </fieldset>

              <fieldset className="email">
                <label>{item.email}</label>
              </fieldset>

              <fieldset className="phone">
                <label>{item.phone}</label>
              </fieldset>

              <fieldset className="country">
                <label>{item.country}</label>
              </fieldset>

              <fieldset className="action-buttons">
                <button onClick={toDefineAction} data-action="update" id={id} className="edit-button">EDIT</button>
                <button onClick={toDefineAction} data-action="delete" id={id} className="delete-button">DELETE</button>
              </fieldset>
            </div>
            ))}
          </div>
          ): (
          <div className="notification">
            <label>Ops! There are no registered users on this system...</label>
            <label>Click "New User" to registration.</label>
          </div>
          )}
      </fieldset>

      <div className="div-new-user-button" style={{display: 'block'}}>
        <button className="new-user-button" onClick={openRegistrationWind}>NEW USER</button>
      </div>

      <fieldset className="registration-window" style={{display: 'none'}}>
        <div className="header">
          <h4>NEW USER REGISTRATION</h4>
        </div>

        <div className="data-required">
        <fieldset className="name">
          <label>First name*</label>
          </fieldset>

        <fieldset className="email">
          <label>Email address*</label>
          </fieldset>

        <fieldset className="phone">
          <label>Phone Number*</label>
          </fieldset>

        <fieldset className="country">
          <label>Address*</label>
          </fieldset>
        </div>
        
        <div className="div-inputs">
          <input id="name-input" onChange={toAssignName} placeholder="Type the first name"></input>
          <input id="email-input" onChange={(email) => setEmailClient(email.target.value)} placeholder="Ex: example@email.com"></input>
          <input id="phone-input" onChange={formatPhoneNumber} placeholder="Ex: 999 9999-9999"></input>
          <input id="country-input" onChange={toAssignCountry} placeholder="Type user address"></input>
        </div>

        <div className="save-cancel-buttons">
          <button onClick={createClient} className="save-button">SAVE</button>
          <button onClick={closeRegistrationWind} className="cancel-button">CANCEL</button>
        </div>
      </fieldset>
      
      <fieldset className="update-window" style={{display: 'none'}}>
        <div className="header">
          <h4>UPDATE USER DATAS</h4>
        </div>

        <div className="data-required">
        <fieldset className="name">
          <label>First name*</label>
          </fieldset>

        <fieldset className="email">
          <label>Email address*</label>
          </fieldset>

        <fieldset className="phone">
          <label>Phone Number*</label>
          </fieldset>

        <fieldset className="country">
          <label>Address*</label>
          </fieldset>
        </div>

        <div className="div-inputs">
          <input id="up-name-input" onChange={toAssignName} placeholder="Nome completo"></input>
          <input id="up-email-input" onChange={(email) => setEmailClient(email.target.value)} placeholder="Ex: emailexemplo@dominio.com"></input>
          <input id="up-phone-input" onChange={formatPhoneNumber} placeholder="Ex: DD9888888"></input>
          <input id="up-country-input" onChange={toAssignCountry} placeholder="Digite o endereço do usuário"></input>
        </div>

        <div className="save-cancel-buttons">
          <button id="update-clicked" onClick={checkDatas} className="save-button" >UPDATE</button>
          <button onClick={closeUpdateWind} className="cancel-button">CANCEL</button>
        </div>
      </fieldset>
    </div>
  );
};

export default App;