const seleccioncont = document.querySelector(".seleccionespecialidadcont");
const confirmarcont = document.querySelector(".confirmacioncont");
const formMedicoregistro = document.querySelector(".formmedicocont");



function abrirespecialidades(){

    
    if(seleccioncont.classList.contains("active")){
        

        seleccioncont.classList.remove("active");
        confirmarcont.classList.add("active");
    }
    else if (confirmarcont.classList.contains("active")){

        formMedicoregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");

    }
    else if (formMedicoregistro.classList.contains("active")){

        seleccioncont.classList.add("active");
        confirmarcont.classList.remove("active");
        formMedicoregistro.classList.remove("active");

    }

}

function cerrarrespecialidades(){

    


    if(seleccioncont.classList.contains("active")){
        
        formMedicoregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");
    }
    else if (confirmarcont.classList.contains("active")){

        formMedicoregistro.classList.remove("active");
        seleccioncont.classList.add("active");
        confirmarcont.classList.remove("active");

    }
    

}