import onboarding from "../pages/selectors/intro.json"
import timer from "../pages/selectors/timer.json"
import room from "../pages/selectors/room-content.json"

describe('Funcionalidade: Timer', () => {

    beforeEach(() => {
        cy.step('Abrir página inicial');
        cy.visit('/', {
            headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
            }
        });

    
        cy.step('Acessar aplicação sem logar');
        cy.get(onboarding.onboarding.btnNext[1]).click();
        cy.get(onboarding.onboarding.btnNext[2]).click();
        cy.get(onboarding.onboarding.btnNext[3]).click();
        cy.get(onboarding.onboarding.btnNext[4]).click();
        cy.get(onboarding.onboarding.btnNext.skipLogin).click();
        cy.get(onboarding.onboarding.inputName).type("asd");
        cy.get(onboarding.onboarding.btnNext.saveNameBtn).click();
        cy.get(onboarding.onboarding.btnNext.finish).should('be.visible').click();

        cy.step('Abrir widget: timer');
        cy.get(room.navbar.timer).click();
    });

    it('CT-1: Timer abre em estado inicial', () => {
        cy.step('Verificar estado inicial dos elementos');
        cy.get(timer.display).should('have.text', '00:00');
        cy.get(timer.btnPlay._).should('have.text', timer.btnPlay.textDefault);
    })
    
    it('CT-2: Timer atualiza os minutos e segundos corretamente', () => {
        const minutes = '10';
        const seconds = '30';
        cy.step('Modificar os minutos')
        cy.get(timer.input.minutes).type(minutes);
        cy.get(timer.input.btnSet).click();

        cy.step('Verificar se os minutos foram atualizados');
        cy.get(timer.display).should('have.text', `${minutes}:00`);

        cy.step('Modificar os segundos');
        cy.get(timer.input.seconds).type(seconds);
        cy.get(timer.input.btnSet).click();

        cy.step('Verificar se os segundos foram atualizados');
        cy.get(timer.display).should('have.text', `${minutes}:${seconds}`);
    });

    it('CT-3: Timer não aceita tempo negativo', () => {
        const minutes = '-10';
        const seconds = '-30';
        cy.step('Modificar os minutos')
        cy.get(timer.input.minutes).type(minutes);
        cy.get(timer.input.btnSet).click();

        cy.step('Verificar se os minutos foram atualizados');
        cy.get(timer.display).should('have.text', `00:00`);

        cy.step('Modificar os segundos');
        cy.get(timer.input.seconds).type(seconds);
        cy.get(timer.input.btnSet).click();

        cy.step('Verificar se os segundos foram atualizados');
        cy.get(timer.display).should('have.text', `00:00`);
    });

    it('CT-4: Timer não aceita mais do que 99 minutos', () => {
        cy.step('Modificar os minutos');
        cy.get(timer.input.minutes).type('100');
        cy.get(timer.input.btnSet).click();

        cy.step('Verificar se o display foi atualizado');
        cy.get(timer.display).should('have.text', `00:00`);
    });

    it('CT-5: Timer não aceita mais do que 59 segundos', () => {
        cy.step('Modificar os segundos');
        cy.get(timer.input.seconds).type('60');
        cy.get(timer.input.btnSet).click();

        cy.step('Verificar se o display foi atualizado');
        cy.get(timer.display).should('have.text', `00:00`);
    });

    it('CT-6: Timer botão de start está funcionando', () => {
        cy.step('Adicionar tempo no timer');
        cy.clock();
        cy.get(timer.input.minutes).type('5');
        cy.get(timer.input.btnSet).click();

        cy.step('Iniciar o timer');
        cy.get(timer.btnPlay._).click();
        cy.tick(50000);

        cy.step('Verificar se o display contabilizou o tempo passado');
        cy.get(timer.display).should('have.text', '04:10')
    });

    it('CT-7: Timer interrompe ao chegar no final do tempo', () => {
        cy.step('Adicionar tempo no timer');
        cy.clock();
        cy.get(timer.input.minutes).type('5');
        cy.get(timer.input.btnSet).click();

        cy.step('Iniciar o timer');
        cy.get(timer.btnPlay._).click();
        cy.tick(300000);

        cy.step('Verificar se o display está zerado');
        cy.get(timer.display).should('have.text', '00:00');

        cy.step('Garantir que o tempo não está passando');
        cy.tick(10000);
        cy.get(timer.display).should('have.text', '00:00');
    });

    it('CT-8: Resetar timer após concluir volta para o tempo definido', () => {
        cy.step('Adicionar tempo no timer');
        cy.clock();
        cy.get(timer.input.minutes).type('5');
        cy.get(timer.input.btnSet).click();

        cy.step('Iniciar o timer');
        cy.get(timer.btnPlay._).click();
        cy.tick(300000);

        cy.step('Clicar em Resetar');
        cy.get(timer.btnReset).click();

        cy.step('Verificar se o display está mostrando o tempo definido novamente');
        cy.get(timer.display).should('have.text', '05:00');
    });

    it('CT-9: Resetar timer após concluir volta para o tempo definido mesmo com novo input', () => {
        cy.step('Adicionar tempo no timer');
        cy.clock();
        cy.get(timer.input.minutes).type('5');
        cy.get(timer.input.btnSet).click();

        cy.step('Iniciar o timer');
        cy.get(timer.btnPlay._).click();
        cy.tick(300000);

        cy.step('Modificar tempo no input');
        cy.get(timer.input.minutes).clear().type('9');
        cy.get(timer.input.seconds).type('40');

        cy.step('Clicar em Resetar');
        cy.get(timer.btnReset).click();

        cy.step('Verificar se o display está mostrando o tempo definido novamente');
        cy.get(timer.display).should('have.text', '05:00');
    });

    it('CT-10: Botão de pause está pausando o timer', ()=> {
        cy.step('Adicionar tempo no timer');
        cy.clock();
        cy.get(timer.input.minutes).type('5');
        cy.get(timer.input.btnSet).click();

        cy.step('Iniciar o timer');
        cy.get(timer.btnPlay._).click();
        cy.tick(150000);

        cy.step('Pausar o timer');
        cy.get(timer.btnPlay._).click();

        cy.step('Verificar se o display está com o tempo correto');
        cy.get(timer.display).should('have.text', '02:30');
    });

    it('CT-11: Botão de continuar está funcionando', () => {
        cy.step('Adicionar tempo no timer');
        cy.clock();
        cy.get(timer.input.minutes).type('5');
        cy.get(timer.input.btnSet).click();

        cy.step('Iniciar o timer');
        cy.get(timer.btnPlay._).click();
        cy.tick(120000);

        cy.step('Pausar o timer');
        cy.get(timer.btnPlay._).click();

        cy.step('Aguardar 1 minutos');
        cy.tick(60000);

        cy.step('Verificar se o display está com o tempo correto');
        cy.get(timer.display).should('have.text', '03:00');
    });

    it('CT-12: Clicar em defenir enquanto o timer está rodando, reseta e define novo valor de timer', () => {
        cy.step('Adicionar tempo no timer');
        cy.clock();
        cy.get(timer.input.minutes).type('10');

        cy.step('Dar play no timer');
        cy.get(timer.btnPlay._);
        cy.tick(30000)

        cy.step('Definir novo tempo no timer');
        cy.get(timer.input.minutes).clear().type('15');
        cy.get(timer.input.btnSet).click();
        cy.get(timer.btnPlay._).should('have.text', timer.btnPlay.textDefault);
    });

    it('CT-13: Timer continua rodando após minimizar o widget', () => {
        cy.step('Adicionar tempo no timer');
        cy.clock();
        cy.get(timer.input.minutes).type('10');
        cy.get(timer.input.btnSet).click();

        cy.step('Dar play no timer');
        cy.get(timer.btnPlay._).click();

        cy.step('Minimizar tela');
        cy.get(room.desktop.actions.minimize).click();
        cy.tick(30000);

        cy.step('Verificar se o tempo passou no widget timer');
        cy.get(room.navbar.timer).click();
        cy.get(timer.display).should('have.text', '09:30');
    });

    it('CT-14: Notificar que o tempo finalizou com o timer minimizado', () => {
        cy.step('Adicionar tempo no timer');
        cy.clock();
        cy.get(timer.input.minutes).type('10');
        cy.get(timer.input.btnSet).click();

        cy.step('Dar play no timer');
        cy.get(timer.btnPlay._).click();

        cy.step('Minimizar tela');
        cy.get(room.desktop.actions.minimize).click();
        cy.tick(600000);

        cy.step('Verificar se o tempo passou no widget timer');
        cy.get(room.navbar.timer).click();
        cy.get(timer.display).should('have.text', '00:00');
    });

    it('CT-15: Timer funciona corretamente após 23:59', () => {
        cy.step('Configurar relógio para 23:58');
        const time = new Date();
        time.setHours(23, 58, 0, 0);
        cy.clock(time.getTime());

        cy.step('Adicionar tempo no timer');
        cy.get(timer.input.minutes).type('5');
        cy.get(timer.input.btnSet).click();

        cy.step('Iniciar Timer');
        cy.get(timer.btnPlay._).click();
        cy.tick(180000);

        cy.step('Verificar tempo restante no display');
        cy.get(timer.display).should('have.text', '02:00');
    });
});