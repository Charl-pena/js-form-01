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

function showUserInfo(dataObject){
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
   return (regexEmail.test(userEmail)) ? false: "Fallo tu email";
}

function validateUserPassword(userPassword)
{
   const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:<>?[\]\/.,])(?!.*\s).{10,16}$/
   return (regexPassword.test(userPassword))? false: "Fallo tu password";
}