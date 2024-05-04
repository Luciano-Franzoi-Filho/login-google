function fecharMenu(event) {
    let menu = document.querySelector('.opcoes-menu');
    let toggle = document.getElementById('opcoes-menu-toggle');
    let label = document.querySelector('.criar_conta label');
    if (!menu.contains(event.target) && event.target !== toggle && event.target !== label) {
        toggle.checked = false;
    }
}

function validarEmail(emailInput, emailSpan, email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
        // Email válido
        emailInput.style.borderColor = ''; // Remove a cor da borda (volta ao padrão)
        emailSpan.style.color = ''; // Remove a cor do texto (volta ao padrão)
        emailSpan.textContent = 'E-mail ou telefone'; // Restaura o texto padrão
        console.log('E-mail válido:', email);
    } else {
        // Email inválido
        emailInput.style.borderColor = 'red'; // Define a cor da borda como vermelha
        emailSpan.style.color = 'red'; // Define a cor do texto como vermelha
        emailSpan.textContent = 'E-mail inválido'; // Altera o texto para indicar que o e-mail é inválido
        emailInput.style.borderWidth = '3px'; // Ajusta a espessura da borda para 2px
        console.log('E-mail inválido:', email);
    }
}

function limparEstilos(emailInput, emailSpan) {
    emailInput.style.borderColor = ''; // Remove a cor da borda (volta ao padrão)
    emailSpan.style.color = ''; // Remove a cor do texto (volta ao padrão)
    emailSpan.textContent = 'E-mail ou telefone'; // Restaura o texto padrão
    emailInput.style.borderWidth = ''; // Remove a espessura da borda (volta ao padrão)
}
document.addEventListener('click', fecharMenu);

document.addEventListener('DOMContentLoaded', function() {
    let emailInput = document.getElementById('emailInput');
    let emailSpan = document.querySelector('.login_input span');
    let avancarButton = document.getElementById('botaoAvancar');
    avancarButton.addEventListener('click', function() {
        let email = emailInput.value;
        validarEmail(emailInput, emailSpan, email);
    });
    emailInput.addEventListener('input', function() {
        limparEstilos(emailInput, emailSpan);
    });
});

// a partir daqui começa o salvamento no  localStorage

function salvarDadosLogin(email, valido) {
    // hora atual para salvar junto com o email no localStorage 
    let dataAtual = new Date();
    let horaAtual = dataAtual.getHours() + ':' + dataAtual.getMinutes();
    // Verificando se há dados anteriores no localStorage
    let dadosAnteriores = localStorage.getItem('dadosLogin');
    let dadosArray = [];
    if (dadosAnteriores) {
        // Se houver dados anteriores converte o JSON para array
        dadosArray = JSON.parse(dadosAnteriores);
    }
    dadosArray.push({
        email: email,
        hora: horaAtual,
        valido: valido
    });
    // Convertendo o array para JSON
    let dadosJSON = JSON.stringify(dadosArray);
    // salvar  no localStorage
    localStorage.setItem('dadosLogin', dadosJSON);
    console.log('Dados de login salvos no localStorage:', localStorage.getItem('dadosLogin'));
}
document.addEventListener('DOMContentLoaded', function() {
    let emailInput = document.getElementById('emailInput');
    let avancarButton = document.getElementById('botaoAvancar');
    avancarButton.addEventListener('click', function() {
        let email = emailInput.value;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
        // validação do email para dizer se é true ou false no localStorage
        let valido = emailPattern.test(email);
        salvarDadosLogin(email, valido);
    });
});