function abrirespecialidades(){

    const seleccioncont = document.querySelector(".seleccionespecialidadcont");
    const confirmarcont = document.querySelector(".confirmacioncont");
    const formregistro = document.querySelector(".formmedicocont");


    if(seleccioncont.classList.contains("active")){
        

        seleccioncont.classList.remove("active");
        confirmarcont.classList.add("active");
    }
    else if (confirmarcont.classList.contains("active")){

        formregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");

    }
    else if (formregistro.classList.contains("active")){

        seleccioncont.classList.add("active");
        confirmarcont.classList.remove("active");
        formregistro.classList.remove("active");

    }

}

function cerrarrespecialidades(){

    const seleccioncont = document.querySelector(".seleccionespecialidadcont");
    const confirmarcont = document.querySelector(".confirmacioncont");
    const formregistro = document.querySelector(".formmedicocont");


    if(seleccioncont.classList.contains("active")){
        
        formregistro.classList.add("active");
        seleccioncont.classList.remove("active");
        confirmarcont.classList.remove("active");
    }
    else if (confirmarcont.classList.contains("active")){

        formregistro.classList.remove("active");
        seleccioncont.classList.add("active");
        confirmarcont.classList.remove("active");

    }
    

}