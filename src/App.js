import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  //Adquirir o botão "New User", a janela de cadastro e atualização.
  const registrationWindow = document.getElementById("registration-window");
  const updateWindow = document.getElementById("update-window");

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
      alert("Por favor, preencha os campos corretamente!");
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

  //Cancelar mudanças.
  const cancelChanges = () =>{
    clearForm();
    closeUpdateWind();
    openRegistrationWind();
  };

  //Abrir janela de cadastro.
  const openRegistrationWind = ()=>{
    registrationWindow.style.display = 'flex';
  };

  //Fechar janela de cadastro.
  const closeRegistrationWind = () => {
    registrationWindow.style.display = 'none';

    setNameClient(undefined);
    setEmailClient(undefined);
    setPhoneClient(undefined);
    setCountryClient(undefined);

    inputName.value = "";
    inputEmail.value = "";
    inputPhone.value = "";
    inputCountry.value = "";
  };

  //Abrir a janela de atualização
  const openUpdateWindow = ()=>{
    updateWindow.style.display = "flex";
  };

  //Fechar janela de Atualização.
  const closeUpdateWind = () => {
    updateWindow.style.display = "none";
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
    openRegistrationWind();
  };

  //Checar os dados e direcionar para função de atualização dos dados.
  const checkDatas = () => {
      const updateButton  = document.getElementById("update-button").value;

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
        updateClient(updateButton, clientModel);
        setDataClient(getLocalStorage);
        clearForm();
      };
  };

  //Definir uma ação.
  const toDefineAction = (action) =>{
    const dataButton = action.target.dataset.action;
    const indexButton = action.target.id;
    document.getElementById("update-button").value = indexButton;

    if (dataButton === "update"){
      
      const getDB = getLocalStorage()[indexButton];

      closeRegistrationWind();
      openUpdateWindow();

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
        <fieldset className="name"><label>NAME</label></fieldset>
        <fieldset className="email"><label>EMAIL</label></fieldset>
        <fieldset className="phone"><label>PHONE</label></fieldset>
        <fieldset className="country"><label>ADDRESS</label></fieldset>
        <fieldset className="country"><label>ACTIONS</label></fieldset>
      </div>
      <fieldset className="reader-datas">
        {dataClient.length > 0 ? (
          <div className="maped-list">
            {dataClient.map((item,id) => (
            <div className="added-datas-list" key={id}>
              <fieldset className="name"><label>{item.name}</label></fieldset>
              <fieldset className="email"><label>{item.email}</label></fieldset>
              <fieldset className="phone"><label>{item.phone}</label></fieldset>
              <fieldset className="country"><label>{item.country}</label></fieldset>
              <fieldset className="action-buttons">
                <button onClick={ toDefineAction } data-action="update" id={id} className="edit-button">EDIT</button>
                <button onClick={ toDefineAction } data-action="delete" id={id} className="delete-button">DELETE</button>
              </fieldset>
            </div>))}
          </div>):(
          <div className="notification">
            <label>Ops! There are no registered users on this system...</label>
            <label>Click "New User" to registration.</label>
          </div>
          )}
      </fieldset>

      <fieldset id="registration-window" className="registration-window" style={{ display: "flex" }}>
        <fieldset><input id="name-input" onChange={ toAssignName } placeholder="Type user name"></input></fieldset>
        <fieldset><input id="email-input" onChange={ (e) => setEmailClient(emailClient = e.target.value) } placeholder="Ex: exempleemail@exemple.com"></input></fieldset>
        <fieldset><input id="phone-input" onChange={ formatPhoneNumber } placeholder="Ex: 99 99999-999"></input></fieldset>
        <fieldset><input id="country-input" onChange={ toAssignCountry } placeholder="User address"></input></fieldset>
        <fieldset className="action-buttons">
        <button id="register-button" className="edit-button" onClick={ createClient }>REGISTER</button>
        <button id="clear-button" className="clear-button" onClick={ clearForm }>CLEAR</button>
        </fieldset>
      </fieldset>

      <fieldset id="update-window" className="registration-window" style={{ display: "none" }}>
        <fieldset><input id="up-name-input" onChange={ toAssignName } placeholder="Type user name"></input></fieldset>
        <fieldset><input id="up-email-input" onChange={ (e) => setEmailClient(emailClient = e.target.value) } placeholder="Ex: exempleemail@exemple.com"></input></fieldset>
        <fieldset><input id="up-phone-input" onChange={ formatPhoneNumber } placeholder="Ex: 99 99999-999"></input></fieldset>
        <fieldset><input id="up-country-input" onChange={ toAssignCountry } placeholder="User address"></input></fieldset>
        <fieldset className="action-buttons">
        <button id="update-button" className="edit-button" onClick={ checkDatas }>UPDATE</button>
        <button id="cancel-button" className="clear-button" onClick={ cancelChanges }>CANCEL</button>
        </fieldset>
      </fieldset>
      
      <p className="credits">Desenvolvido por Marcos Aurélio Lopes de Araújo</p>

    </div>
  );
};

export default App;