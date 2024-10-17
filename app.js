const formEL = document.querySelector("form");
console.log(formEL);

formEL.addEventListener("submit" , (e) =>
{
   e.preventDefault();
   // console.log(e);
   // console.log(e.target.elements);
   //const email = e.target.elements["email"].value;
   //const password = e.target.elements["password"].value;

   //const check = e.target.elements["check"].checked;

   //console.log(email, password, check);

   const data = [...new FormData(formEL)];
   // console.log(data);


   const dataObject = Object.fromEntries(data);
   // console.log(dataObject);
   
   // Esta es la solución para incluir un mensaje de error, según el caso (si falla el email o falla la password)
   let errorEmail;
   let errorPassword;
   
   if( !((errorEmail = validateUserEmail(dataObject.email)) || (errorPassword = validateUserPassword(dataObject.password)) ))
   {
      showUserInfo(dataObject)
   }else
   {
      let error = (errorEmail) ? errorEmail : errorPassword;
      showErrorAlert(error);
      return;
   }
});

function removePreviousAlert(selector)
{
   const previousAlert = document.querySelector(selector);
   if
   (previousAlert !== null) previousAlert.remove();
}

function showUserInfo(dataObject){
   removePreviousAlert(".alert");
   const alert = `
      <div class="alert alert-primary" role="alert">
         Este es el email de usuario ${dataObject.email}
         Esta es la password del usuario ${dataObject.password}
      </div>
   `
   formEL.insertAdjacentHTML("afterend", alert);
}

function showErrorAlert(mensaje)
{
   removePreviousAlert(".alert");
   const alert = `
      <div class="alert alert-danger mt-2" role="alert">
        <p>
          ${mensaje}
        </p>
      </div>
   `;

   formEL.insertAdjacentHTML("afterend", alert);
}

function validateUserEmail(userEmail)
{
   // const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Regex Alternativa pero dependiente de la validación por html
   const regexEmail =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   return (regexEmail.test(userEmail)) ? false: "Introduce un Email valido.";
}

// function validateUserPassword(userPassword)
// {
//    const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:<>?[\]\/.,])(?!.*\s).{10,16}$/
//    return (regexPassword.test(userPassword))? false: "Fallo tu password";
// }

function validateUserPassword(userPassword) {
   const breakLine = '<br>';
   let validaciones = 
   [
    /[A-Z]/, "- Debe contener al menos una letra mayúscula." + breakLine,
    /[0-9]/, "- Debe contener al menos un número." + breakLine,
    /[!@#$%^&*()_+{}|:<>?[\]\/.,]/, "- Debe contener al menos un carácter especial." + breakLine,
    /^\S*$/, "- No debe contener espacios." + breakLine,
    /^.{10,16}$/, "- Debe tener entre 10 y 16 caracteres." + breakLine
   ];

   let message = "";
   
   message = validaciones.reduce((acc, cur, i) => 
      (i % 2 === 0) 
      ? (cur.test(userPassword)) ? acc + "" : acc + validaciones[i + 1]
      : acc + ""
   , "");
   
   return (message.length === 0) ? false : message; 
}