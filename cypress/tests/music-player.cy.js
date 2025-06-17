import onboarding from "../pages/selectors/intro.json"
import musicPlayer from "../pages/selectors/music-player.json"
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
        cy.get(onboarding.onboarding.btnNext[1])
            .click();
        cy.get(onboarding.onboarding.btnNext[2])
            .click();
        cy.get(onboarding.onboarding.btnNext[3])
            .click();
        cy.get(onboarding.onboarding.btnNext[4])
            .click();
        cy.get(onboarding.onboarding.btnNext.skipLogin)
            .click();
        cy.get(onboarding.onboarding.inputName)
            .type("asd");
        cy.get(onboarding.onboarding.btnNext.saveNameBtn)
            .click();
        cy.get(onboarding.onboarding.btnNext.finish)
            .should('be.visible')
            .click();

        cy.step('Abrir widget: music player');
        cy.get(room.navbar["music-player"])
            .click();
    });

    it('CT-16: Dar play inicia a música selecionada', () => {
        cy.step('Dar play na música');
        cy.get(musicPlayer.btnPlay)
            .click();

        cy.step('Verificar se a música está tocando');
        cy.get(musicPlayer.audio)
            .should('have.prop', 'paused', false);
    });

    it('CT-17: Modificar volume', () => {
        cy.step('Dar play na música');
        cy.get(musicPlayer.btnPlay).click();

        cy.step('Aumentar volume');
        cy.get(musicPlayer.volume)
            .invoke('val', 0.9)
            .trigger('input')
            .trigger('change');

        cy.step('Verificar se o volume aumentou');
        cy.get(musicPlayer.audio).then($audio => {
            expect($audio[0].volume).to.be.equal(0.9);
        });

        cy.step('Diminuir volume');
        cy.get(musicPlayer.volume)
            .invoke('val', 0.2)
            .trigger('input')
            .trigger('change');

        cy.step('Verificar se o volume reduziu');
        cy.get(musicPlayer.audio).then($audio => {
            expect($audio[0].volume).to.be.equal(0.2);
        });
        
    });

    it('CT-18: Pausar reprodução da música', () => {
        cy.step('Iniciar música');
        cy.get(musicPlayer.btnPlay).click();

        cy.step('Pausar música');
        cy.wait(2500) //Buscar forma melhor de aguardar a resposta da função play() antes de chamar a função pause()
        cy.get(musicPlayer.btnPlay)
            .click();

        cy.step('Verificar se a música está tocando');
        cy.get(musicPlayer.audio)
            .should('have.prop', 'paused', true);
    });

    it('CT-19: A música é alterada ao ser concluída', () => {
        cy.step('Reproduzir primeira música');
        cy.get(musicPlayer["progress-bar"]).then(($slider) => {
            const max = parseFloat($slider.prop('max'));
            cy.wrap($slider).invoke('val', max-1).trigger('input').trigger('change');
        });
        cy.get(musicPlayer.btnPlay).click();

        cy.step('Aguardar música 2 segundos');
        cy.wait(2000); //Buscar forma melhor de aguardar o tempo passar para a música

        cy.step('Verificar se começou a tocar a música seguinte');
        cy.fixture('musics.json').then((songs) => {
            cy.get(musicPlayer.audio).then(($audio) => {
                expect($audio[0].src).to.include(songs.apart)
            });
        });
    });

    it('CT-20: A música é alterada para a próxima ao clicar no botão next', () => {
        cy.step('Guardar o nome da musica inicial');
        cy.get(musicPlayer.audio).then(($audio) => {
            cy.wrap($audio[0].src).as('firstSong');
        });

        cy.step('Ir para a próxima música');
        cy.get(musicPlayer.btnNext).click();

        cy.step('Verificar se mudou de música');
        cy.get(musicPlayer.audio).then(($audio) => {
            cy.get('@firstSong').then((firstSong) => {
                expect($audio[0].src).not.be.equal(firstSong);
            });
        });
    });

    it('CT-21: A música é alterada para a próxima ao clicar no botão prev', () => {
        cy.step('Guardar o nome da musica inicial');
        cy.get(musicPlayer.audio).then(($audio) => {
            cy.wrap($audio[0].src).as('firstSong');
        });

        cy.step('Ir para a música anterior');
        cy.get(musicPlayer.btnPrev).click();

        cy.step('Verificar se mudou de música');
        cy.get(musicPlayer.audio).then(($audio) => {
            cy.get('@firstSong').then((firstSong) => {
                expect($audio[0].src).not.be.equal(firstSong);
            });
        });
    });

    it('CT-22: A música fica repetindo quando Repeat está ativo', () => {
        cy.step('Ativar o repeat');
        cy.get(musicPlayer.btnRepeat)
            .click();

        cy.step('Guardar nome da musica inicial')
        cy.get(musicPlayer.audio).then(($audio) => {
            cy.wrap($audio[0].src).as('song');
        });

        cy.step('Reproduzir a partir do fim da música');
        cy.get(musicPlayer["progress-bar"]).then(($slider) => {
            const max = parseFloat($slider.prop('max'));
            cy.wrap($slider).invoke('val', max-1).trigger('input').trigger('change');
        });
        cy.get(musicPlayer.btnPlay).click();

        cy.step('Aguardar fim da música');
        cy.wait(2000); //Buscar forma melhor de aguardar o tempo passar para a música

        cy.step('Verificar se música não mudou e continua tocando');
        cy.get(musicPlayer.audio).then(($audio) => {
            cy.get('@song').then((song) => {
                expect($audio[0].src).to.be.equal(song);
            });
        });
    });

    it.only('CT-23: Upload de música', () => {
        cy.step('Salvar tamanho da lista de reprodução');
        cy.get(musicPlayer["music-list"]).then(($lista) => {
            cy.wrap($lista.length).as('tamanhoLista');
        })

        cy.step('Realizar upload da música');
        cy.get(musicPlayer["music-input"]).selectFile('HoliznaCC0 - Mutant Club.mp3', {force: true});

        cy.step('Verificar se lista aumentou');
        cy.get(musicPlayer["music-list"]).then(($lista) => {
            cy.get('@tamanhoLista').then((tamanhoLista) => {
                expect($lista.length).to.be.greaterThan(tamanhoLista);
            })
        })
    });
});