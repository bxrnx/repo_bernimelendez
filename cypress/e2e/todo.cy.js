 describe("Pruebas del gestor de tareas TODOMVc", () => {
    beforeEach(() => {
      cy.visit("https://todomvc.com/examples/react/dist/");
    });
  
    it("1. Debería ingresar una tarea", () => {
      //Ingresa la nueva tarea
      cy.get(".new-todo").type("Aprender Cypress{enter}");
      //Comprueba que la tarea ha sido añadida, y de forma correcta
      cy.get(".todo-list li")
      .should("have.length", 1)
      .and("contain", "Aprender Cypress");
      cy.url().should("contain", "todo");
    });

    it("2. Debería marcar la tarea como completada", () =>{
      //Introduce la tarea y pulsa enter
      cy.get(".new-todo").type("Aprender Cypress{enter}");
      //clicka sobre el botón de marcar como completada
      cy.get(".todo-list li")
      .first()
      .find(".toggle").click();
      //comprueba que la tarea ha sido completada
      cy.get(".todo-list li").should("have.class", "completed");
    });

    it("3. Debería marcar la tarea como no completada", () => {
      cy.get(".new-todo").type("Aprender Cypress{enter}");
      //Marco la tarea como completada
      cy.get(".todo-list li").first().find(".toggle").click();
      //La marco otra vez, para marcarla como no completada
      cy.get(".todo-list li").first().find(".toggle").click();
      //Comprueba que no tiene clase con el método .should("not.have.class","..." );
      cy.get(".todo-list li").should("not.have.class", "completed");
    });

    it("4. Debería editar la tarea correctamente", () =>{
      //Ingresa la tarea
      cy.get(".new-todo").type("Aprender Cypress{enter}");
      //Edita la tarea
      cy.get('.todo-list li').first().dblclick()
      //Busca el nuevo elemento "input", que se crea al pulsar dos veces sobre la página
      .find("input")
      //Borra lo que hay dentro 
      .clear()
      //Escribe el nombre de la nueva tarea
      .type("Tarea Editada{enter}");
      //Compruebas que se ha quedado la tarea editada correctamente, con el nuevo texto 
      cy.get(".todo-list li").should("have.length", 1).and("contain", "Tarea Editada");
    });

    it("5. Debería de borrar la tarea de la lista", () =>{
      //Introduces la tarea
      cy.get(".new-todo").type("Aprender Cypress{enter}")
      //Pulsas el botón X de borrado, tengo que forzar que pueda ser clickado, ya que no es visible
      cy.get(".todo-list li").first().find("button.destroy").click({force: true});
      //Aseguras que no exista la lista, ya que has borrado el único elemento de la lista
      cy.get(".todo-list li").should("not.exist");
    });

    it("6. Debería filtrar adecuadamente las tareas", () =>{
      //Agrego 3 tareas
      cy.get(".new-todo").type("Aprender Cypress{enter}");
      cy.get(".new-todo").type("Aprender Abeto{enter}");
      cy.get(".new-todo").type("Aprender Olivo{enter}");
      //Completo una de las dos, en este caso la primera
      cy.get(".todo-list li")
      .first()
      .find(".toggle").click();
      //Hago click en el elemento li que contenga Completed
      cy.get(".filters li")
      .contains("Completed")
      .click();
      //Verifico que solo muestra la tarea completada
      cy.get(".todo-list li").should("have.length", 1);
      cy.get(".todo-list li").should("contain.text", "Aprender Cypress");
      //Compruebo el filtro de tareas activas,  y si está la tarea que no debería
      cy.get(".filters li").contains("Active").click();
      cy.get(".todo-list li").should("have.length", 2)
      cy.get(".todo-list li").should("not.contain.text", "Aprender Cypress");
      // Vuelvo al filtro de "All"
      cy.get(".filters li")
      .contains("All")
      .click();
      //Compruebo que están todos 
      cy.get(".todo-list li").should("have.length", 3);
    });
  });