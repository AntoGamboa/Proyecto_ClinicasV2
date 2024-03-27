function crearbotonesmenuprincipal(){


    //funcion prueba para actualizar botones de el menu principal
    return;

    var a = verificarSession();

    if(a.permisos = 1){

        const templatebotonnav = document.getElementById("templatemedico").content;
        const seccionbotones = document.querySelector(".sectionbuttons .buttonscont");
    
        const clontemplate = templatebotonnav.cloneNode(true);

        barranav.appendChild(clontemplate);


    }else if(a.permisos = 2){

        const templatebotonnav = document.getElementById("templateadmin").content;
        const seccionbotones = document.querySelector(".sectionbuttons .buttonscont");
    
        const clontemplate = templatebotonnav.cloneNode(true);

        barranav.appendChild(clontemplate);
    }
    else if(a.permisos = 3){

        const templatebotonnav = document.getElementById("templaterecepcionista").content;
        const seccionbotones = document.querySelector(".sectionbuttons .buttonscont");
    
        const clontemplate = templatebotonnav.cloneNode(true);

        barranav.appendChild(clontemplate);
    }

    

}