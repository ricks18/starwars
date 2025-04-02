let paginaAtual = 1;
let totalPaginas = 1;
let secaoAtual = 'personagens';
let buscaTimeout;
let carregando = false;

const traducoes = {
    personagens: {
        endpoint: 'people',
        titulo: 'Personagens',
        icone: 'fa-user',
        campos: {
            'name': 'Nome',
            'height': 'Altura',
            'mass': 'Peso',
            'birth_year': 'Ano de Nascimento',
            'gender': 'Gênero',
            'hair_color': 'Cor do Cabelo',
            'eye_color': 'Cor dos Olhos',
            'skin_color': 'Cor da Pele'
        }
    },
    planetas: {
        endpoint: 'planets',
        titulo: 'Planetas',
        icone: 'fa-globe',
        campos: {
            'name': 'Nome',
            'climate': 'Clima',
            'terrain': 'Terreno',
            'population': 'População',
            'diameter': 'Diâmetro',
            'gravity': 'Gravidade',
            'orbital_period': 'Período Orbital',
            'rotation_period': 'Período de Rotação'
        }
    },
    naves: {
        endpoint: 'starships',
        titulo: 'Naves Espaciais',
        icone: 'fa-space-shuttle',
        campos: {
            'name': 'Nome',
            'model': 'Modelo',
            'manufacturer': 'Fabricante',
            'cost_in_credits': 'Custo em Créditos',
            'length': 'Comprimento',
            'crew': 'Tripulação',
            'passengers': 'Passageiros',
            'cargo_capacity': 'Capacidade de Carga'
        }
    },
    filmes: {
        endpoint: 'films',
        titulo: 'Filmes',
        icone: 'fa-film',
        campos: {
            'title': 'Título',
            'episode_id': 'Episódio',
            'director': 'Diretor',
            'producer': 'Produtor',
            'release_date': 'Data de Lançamento'
        }
    },
    'ordem-cronologica': {
        endpoint: '',
        titulo: 'Ordem Cronológica',
        icone: '',
        campos: {}
    }
};

const trailersPtBR = {
    1: "https://www.youtube.com/embed/bD7bpG-zDJQ?si=hvEXgu88dhkfPzUc", // A Ameaça Fantasma - A Threat of the Phantom
    2: "https://www.youtube.com/embed/P1IZVrHW7Cs?si=HoVL0t1Zp6Ys-P8w", // Ataque dos Clones - Attack of the Clones
    3: "https://www.youtube.com/embed/5UnjrG_N8hU", // A Vingança dos Sith - Revenge of the Sith
    4: "https://www.youtube.com/embed/k-Ua033oKAk?si=WOMok95VmVUNK-_y", // Uma Nova Esperança - A New Hope
    5: "https://www.youtube.com/embed/JNwNXF9Y6kY?si=laA5b8ktug0xsJue", // O Império Contra-Ataca
    6: "https://www.youtube.com/embed/5UfA_aKBGMc"  // O Retorno de Jedi - The Return of the Jedi
};

const imagensPersonagens = {
    'Luke Skywalker': 'https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_fb34a1ff.jpeg',
    'C-3PO': 'https://lumiere-a.akamaihd.net/v1/images/c-3po-main_417a2902.jpeg',
    'R2-D2': 'https://lumiere-a.akamaihd.net/v1/images/r2-d2-main_f315b094.jpeg',
    'Darth Vader': 'https://lumiere-a.akamaihd.net/v1/images/darth-vader-main_4560aff7.jpeg',
    'Leia Organa': 'https://sm.ign.com/ign_br/screenshot/default/princess-leia-organa_ys5d.jpg',
    'Owen Lars': 'https://lumiere-a.akamaihd.net/v1/images/owen-lars-main_08c717c8.jpeg',
    'Beru Whitesun lars': 'https://365starwars.com/wp-content/uploads/2018/09/Day-259-Beru-Whitesun-Lars-1024x512.jpg',
    'R5-D4': 'https://lumiere-a.akamaihd.net/v1/images/r5-d4_main_image_7d5f078e.jpeg',
    'Biggs Darklighter': 'https://lumiere-a.akamaihd.net/v1/images/image_606ff7f7.jpeg?region=352%2C0%2C1170%2C878',
    'Obi-Wan Kenobi': 'https://lumiere-a.akamaihd.net/v1/images/obi-wan-kenobi-main_95819950.jpeg',
    'Anakin Skywalker': 'https://observatoriodocinema.com.br/wp-content/plugins/seox-image-magick/imagick_convert.php?width=904&height=508&format=.jpg&quality=91&imagick=/wp-content/uploads/2022/06/ANAKIN-1200x900.jpg',
    'Wilhuff Tarkin': 'https://lumiere-a.akamaihd.net/v1/images/Tarkin-3%402x_16f7b5db.jpeg?region=0%2C0%2C1200%2C800',
    'Chewbacca': 'https://lumiere-a.akamaihd.net/v1/images/chewie-main_e1968a8a.jpeg',
    'Han Solo': 'https://lumiere-a.akamaihd.net/v1/images/han-solo-main_a4c8ff79.jpeg',
    'Greedo': 'https://lumiere-a.akamaihd.net/v1/images/databank_greedo_01_169_3e4b96ef.jpeg?region=0%2C0%2C1560%2C878',
    'Jabba Desilijic Tiure': 'https://lumiere-a.akamaihd.net/v1/images/jabba-the-hutt-main_0b2c759e.jpeg',
    'Wedge Antilles': 'https://lumiere-a.akamaihd.net/v1/images/wedge-antilles-main_8c9f9f71.jpeg',
    'Jek Tono Porkins': 'https://lumiere-a.akamaihd.net/v1/images/jek-porkins-main_0b1e2c99.jpeg',
    'Yoda': 'https://lumiere-a.akamaihd.net/v1/images/Yoda-Retina_2a7ecc26.jpeg?region=0%2C0%2C1536%2C768',
    'Palpatine': 'https://lumiere-a.akamaihd.net/v1/images/emperor-palpatine-main_d6632d0a.jpeg',
    'Boba Fett': 'https://lumiere-a.akamaihd.net/v1/images/boba-fett-main_a8fade4d.jpeg',
    'IG-88': 'https://lumiere-a.akamaihd.net/v1/images/ig-88-main_10b5b447.jpeg',
    'Bossk': 'https://lumiere-a.akamaihd.net/v1/images/bossk-main_c733d27b.jpeg',
    'Lando Calrissian': 'https://lumiere-a.akamaihd.net/v1/images/lando-calrissian-main_a207290e.jpeg',
    'Lobot': 'https://lumiere-a.akamaihd.net/v1/images/lobot-main_90a3f6c6.jpeg',
    'Ackbar': 'https://lumiere-a.akamaihd.net/v1/images/admiral-ackbar-main_f0e9868a.jpeg',
    'Mon Mothma': 'https://lumiere-a.akamaihd.net/v1/images/mon-mothma-main_06f17008.jpeg',
    'Arvel Crynyd': 'https://lumiere-a.akamaihd.net/v1/images/arvel-crynyd-main_937b0413.jpeg',
    'Wicket Systri Warrick': 'https://lumiere-a.akamaihd.net/v1/images/wicket-main_0a1d935a.jpeg',
    'Nien Nunb': 'https://lumiere-a.akamaihd.net/v1/images/nien-nunb-main_fb51bf60.jpeg',
    'Qui-Gon Jinn': 'https://lumiere-a.akamaihd.net/v1/images/qui-gon-jinn-main_80a12ce7.jpeg',
    'Nute Gunray': 'https://lumiere-a.akamaihd.net/v1/images/nute-gunray-main_372744f2.jpeg',
    'Finis Valorum': 'https://lumiere-a.akamaihd.net/v1/images/valorum-main_d7ff49ec.jpeg',
    'Padmé Amidala': 'https://disneyplusbrasil.com.br/wp-content/uploads/2024/05/Rainha-Padme-Amidala.jpg',
    'Jar Jar Binks': 'https://lumiere-a.akamaihd.net/v1/images/jar-jar-binks-main_d6970dc4.jpeg',
    'Roos Tarpals': 'https://lumiere-a.akamaihd.net/v1/images/roos-tarpals-main_1f7a832c.jpeg',
    'Rugor Nass': 'https://lumiere-a.akamaihd.net/v1/images/boss-nass-main_d743c85d.jpeg',
    'Ric Olié': 'https://lumiere-a.akamaihd.net/v1/images/ric-olie-main_3b960b12.jpeg',
    'Watto': 'https://lumiere-a.akamaihd.net/v1/images/watto-main_72fe3015.jpeg',
    'Sebulba': 'https://lumiere-a.akamaihd.net/v1/images/sebulba-main_d55c0140.jpeg',
    'Quarsh Panaka': 'https://lumiere-a.akamaihd.net/v1/images/captain-panaka-main_7f08f18b.jpeg',
    'Shmi Skywalker': 'https://lumiere-a.akamaihd.net/v1/images/shmi-skywalker-main_b5d2b0d8.jpeg',
    'Darth Maul': 'https://lumiere-a.akamaihd.net/v1/images/darth-maul-main_4f69c0b9.jpeg',
    'Ayla Secura': 'https://lumiere-a.akamaihd.net/v1/images/aayla-secura-main_0af5b957.jpeg',
    'Ratts Tyerell': 'https://lumiere-a.akamaihd.net/v1/images/ratts-tyerell-main_09af267d.jpeg',
    'Dud Bolt': 'https://lumiere-a.akamaihd.net/v1/images/dud-bolt-main_fb78c1f4.jpeg',
    'Gasgano': 'https://lumiere-a.akamaihd.net/v1/images/gasgano-main_a5f92f3f.jpeg',
    'Ben Quadinaros': 'https://lumiere-a.akamaihd.net/v1/images/ben-quadinaros-main_7f2f2cc0.jpeg',
    'Mace Windu': 'https://lumiere-a.akamaihd.net/v1/images/mace-windu-main_b35f8095.jpeg',
    'Ki-Adi-Mundi': 'https://lumiere-a.akamaihd.net/v1/images/ki-adi-mundi-main_7c2f7e20.jpeg',
    'Kit Fisto': 'https://lumiere-a.akamaihd.net/v1/images/kit-fisto-main_c6c3ae72.jpeg',
    'Eeth Koth': 'https://lumiere-a.akamaihd.net/v1/images/eeth-koth-main_9a85c2d5.jpeg',
    'Adi Gallia': 'https://lumiere-a.akamaihd.net/v1/images/adi-gallia-main_5e8a23b5.jpeg',
    'Saesee Tiin': 'https://lumiere-a.akamaihd.net/v1/images/saesee-tiin-main_3f0f47a4.jpeg',
    'Yarael Poof': 'https://lumiere-a.akamaihd.net/v1/images/yarael-poof-main_c7f1e811.jpeg',
    'Plo Koon': 'https://lumiere-a.akamaihd.net/v1/images/plo-koon-main_c3c3d4f7.jpeg',
    'Mas Amedda': 'https://lumiere-a.akamaihd.net/v1/images/mas-amedda-main_2f3a3c9c.jpeg',
    'Gregar Typho': 'https://lumiere-a.akamaihd.net/v1/images/captain-typho-main_e365c3d7.jpeg',
    'Cordé': 'https://lumiere-a.akamaihd.net/v1/images/corde-main_3c608b64.jpeg',
    'Cliegg Lars': 'https://lumiere-a.akamaihd.net/v1/images/cliegg-lars-main_d4d3b497.jpeg',
    'Poggle the Lesser': 'https://lumiere-a.akamaihd.net/v1/images/poggle-the-lesser-main_1498b886.jpeg',
    'Luminara Unduli': 'https://lumiere-a.akamaihd.net/v1/images/luminara-unduli-main_c037d106.jpeg',
    'Barriss Offee': 'https://lumiere-a.akamaihd.net/v1/images/barriss-offee-main_3017e9f3.jpeg',
    'Dormé': 'https://lumiere-a.akamaihd.net/v1/images/dorme-main_fb75bc58.jpeg',
    'Dooku': 'https://lumiere-a.akamaihd.net/v1/images/count-dooku-main_a089acc4.jpeg',
    'Bail Prestor Organa': 'https://lumiere-a.akamaihd.net/v1/images/bail-organa-main_78c632d4.jpeg',
    'Jango Fett': 'https://lumiere-a.akamaihd.net/v1/images/jango-fett-main_a0ce5f5b.jpeg',
    'Zam Wesell': 'https://lumiere-a.akamaihd.net/v1/images/zam-wesell-main_c8d35c78.jpeg',
    'Dexter Jettster': 'https://lumiere-a.akamaihd.net/v1/images/dexter-jettster-main_3b37c6f1.jpeg',
    'Lama Su': 'https://lumiere-a.akamaihd.net/v1/images/lama-su-main_c8e8c76b.jpeg',
    'Taun We': 'https://lumiere-a.akamaihd.net/v1/images/taun-we-main_2d1d5675.jpeg',
    'Jocasta Nu': 'https://lumiere-a.akamaihd.net/v1/images/jocasta-nu-main_3b767a6d.jpeg',
    'R4-P17': 'https://lumiere-a.akamaihd.net/v1/images/r4-p17-main_a6d0f7b3.jpeg',
    'Wat Tambor': 'https://lumiere-a.akamaihd.net/v1/images/wat-tambor-main_a3f5e62f.jpeg',
    'San Hill': 'https://lumiere-a.akamaihd.net/v1/images/san-hill-main_f4d21592.jpeg',
    'Shaak Ti': 'https://lumiere-a.akamaihd.net/v1/images/shaak-ti-main_d6a9ce0b.jpeg',
    'Grievous': 'https://lumiere-a.akamaihd.net/v1/images/general-grievous-main_c491d139.jpeg',
    'Tarfful': 'https://lumiere-a.akamaihd.net/v1/images/tarfful-main_d7f49b32.jpeg',
    'Raymus Antilles': 'https://lumiere-a.akamaihd.net/v1/images/raymus-antilles-main_f45d4a1c.jpeg',
    'Sly Moore': 'https://lumiere-a.akamaihd.net/v1/images/sly-moore-main_f97c0ca7.jpeg',
    'Tion Medon': 'https://lumiere-a.akamaihd.net/v1/images/tion-medon-main_7a37c9c9.jpeg'
};

const imagensNaves = {
    'Death Star': 'https://lumiere-a.akamaihd.net/v1/images/Death-Star-I-copy_36ad2500.jpeg',
    'Millennium Falcon': 'https://lumiere-a.akamaihd.net/v1/images/millennium-falcon-main-tlj-a_7cf89d3a.jpeg',
    'Star Destroyer': 'https://lumiere-a.akamaihd.net/v1/images/Star-Destroyer_ab6b94bb.jpeg',
    'X-wing': 'https://lumiere-a.akamaihd.net/v1/images/X-Wing-Fighter_47c7c342.jpeg',
    'TIE Fighter': 'https://lumiere-a.akamaihd.net/v1/images/TIE-Fighter_25397c64.jpeg'
};

const imagensPlanetas = {
    'Tatooine': 'https://lumiere-a.akamaihd.net/v1/images/tatooine-main_127c43c7.jpeg',
    'Alderaan': 'https://lumiere-a.akamaihd.net/v1/images/alderaan-main_f5b676cf.jpeg',
    'Yavin IV': 'https://lumiere-a.akamaihd.net/v1/images/yavin-4-main_75a25bf5.jpeg',
    'Hoth': 'https://lumiere-a.akamaihd.net/v1/images/hoth-main_d4e9c23d.jpeg',
    'Dagobah': 'https://lumiere-a.akamaihd.net/v1/images/dagobah-main_e8b31780.jpeg',
    'Bespin': 'https://lumiere-a.akamaihd.net/v1/images/bespin_04d59593.jpeg',
    'Endor': 'https://lumiere-a.akamaihd.net/v1/images/endor-main_7c6c5643.jpeg',
    'Naboo': 'https://lumiere-a.akamaihd.net/v1/images/naboo-main_60654020.jpeg'
};

const traducoesCores = {
    'blue': 'azul',
    'brown': 'marrom',
    'green': 'verde',
    'yellow': 'amarelo',
    'black': 'preto',
    'red': 'vermelho',
    'orange': 'laranja',
    'white': 'branco',
    'grey': 'cinza',
    'unknown': 'desconhecido',
    'n/a': 'não se aplica',
    'none': 'nenhum'
};

function extrairIdDaUrl(url) {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : null;
}

async function verificarImagem(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

function obterImagem(nome, tipo) {
    switch (tipo) {
        case 'personagens':
            return imagensPersonagens[nome] || 'https://lumiere-a.akamaihd.net/v1/images/sw-placeholder-image_0_1_95807c25.jpeg';
        case 'naves':
            return imagensNaves[nome] || 'https://lumiere-a.akamaihd.net/v1/images/sw-placeholder-image_0_1_95807c25.jpeg';
        case 'planetas':
            return imagensPlanetas[nome] || 'https://lumiere-a.akamaihd.net/v1/images/sw-placeholder-image_0_1_95807c25.jpeg';
        default:
            return 'https://lumiere-a.akamaihd.net/v1/images/sw-placeholder-image_0_1_95807c25.jpeg';
    }
}

function criarCard(item) {
    const nome = item.name || item.title;
    const imagem = obterImagem(nome, secaoAtual);
    
    return `
        <div class="card" onclick="mostrarDetalhes(${JSON.stringify(item).replace(/"/g, '&quot;')})">
            <div class="card-image">
                <img src="${imagem}" alt="${nome}" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${nome}</h3>
                ${Object.entries(traducoes[secaoAtual].campos)
                    .slice(0, 3)
                    .map(([campo, traducao]) => {
                        const valor = item[campo];
                        if (campo !== 'title' && campo !== 'name') {
                            return `<p><strong>${traducao}:</strong> ${traduzirValor(valor, campo)}</p>`;
                        }
                        return '';
                    }).join('')}
            </div>
        </div>
    `;
}

function traduzirValor(valor, campo) {
    if (!valor || valor === 'unknown' || valor === 'n/a') return 'Desconhecido';
    if (campo.includes('color')) return traducoesCores[valor.toLowerCase()] || valor;
    if (campo === 'height') return `${valor} cm`;
    if (campo === 'mass') return `${valor} kg`;
    if (campo === 'cost_in_credits') return `${parseInt(valor).toLocaleString('pt-BR')} créditos`;
    if (campo === 'population') return parseInt(valor).toLocaleString('pt-BR');
    return valor;
}

function atualizarBotoesPaginacao() {
    const btnAnterior = document.getElementById('pagina-anterior');
    const btnProxima = document.getElementById('proxima-pagina');
    const infoPagina = document.getElementById('info-pagina');

    btnAnterior.disabled = paginaAtual === 1;
    btnProxima.disabled = paginaAtual === totalPaginas;
    infoPagina.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
}

async function carregarDados(pagina = 1, busca = '') {
    if (carregando) return;
    carregando = true;
    
    const container = document.querySelector('.cards-grid');
    const loadingAnimation = document.querySelector('.loading-animation');
    
    // Atualizar título e ícone da seção
    document.querySelector('.section-icon i').className = `fas ${traducoes[secaoAtual].icone}`;
    document.querySelector('.section-title').textContent = traducoes[secaoAtual].titulo;
    
    container.innerHTML = '';
    loadingAnimation.style.display = 'flex';

    try {
        const endpoint = traducoes[secaoAtual].endpoint;
        const url = `https://swapi.dev/api/${endpoint}/?page=${pagina}${busca ? `&search=${busca}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();

        loadingAnimation.style.display = 'none';

        totalPaginas = Math.ceil(data.count / 16);
        paginaAtual = pagina;
        atualizarBotoesPaginacao();

        const items = Array(16).fill(null);
        
        data.results.forEach((item, index) => {
            if (index < 16) {
                items[index] = item;
            }
        });

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            
            if (item) {
                card.onclick = () => mostrarDetalhes(item);
                const conteudo = criarCard(item);
                card.innerHTML = conteudo;
            } else {
                card.style.visibility = 'hidden';
            }
            
            container.appendChild(card);
        });

    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        loadingAnimation.style.display = 'none';
        container.innerHTML = '<p class="erro">Erro ao carregar dados. Tente novamente.</p>';
    }
    
    carregando = false;
}

function atualizarBotoesPaginacao() {
    const btnAnterior = document.getElementById('pagina-anterior');
    const btnProxima = document.getElementById('proxima-pagina');
    const infoPagina = document.getElementById('info-pagina');

    btnAnterior.disabled = paginaAtual === 1;
    btnProxima.disabled = paginaAtual === totalPaginas;
    infoPagina.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
}

async function carregarDados(pagina = 1, busca = '') {
    if (carregando) return;
    carregando = true;
    
    const container = document.querySelector('.cards-grid');
    const loadingAnimation = document.querySelector('.loading-animation');
    
    // Atualizar título e ícone da seção
    document.querySelector('.section-icon i').className = `fas ${traducoes[secaoAtual].icone}`;
    document.querySelector('.section-title').textContent = traducoes[secaoAtual].titulo;
    
    container.innerHTML = '';
    loadingAnimation.style.display = 'flex';

    try {
        const endpoint = traducoes[secaoAtual].endpoint;
        const url = `https://swapi.dev/api/${endpoint}/?page=${pagina}${busca ? `&search=${busca}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();

        loadingAnimation.style.display = 'none';

        totalPaginas = Math.ceil(data.count / 16);
        paginaAtual = pagina;
        atualizarBotoesPaginacao();

        const items = Array(16).fill(null);
        
        data.results.forEach((item, index) => {
            if (index < 16) {
                items[index] = item;
            }
        });

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            
            if (item) {
                card.onclick = () => mostrarDetalhes(item);
                const conteudo = criarCard(item);
                card.innerHTML = conteudo;
            } else {
                card.style.visibility = 'hidden';
            }
            
            container.appendChild(card);
        });

    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        loadingAnimation.style.display = 'none';
        container.innerHTML = '<p class="erro">Erro ao carregar dados. Tente novamente.</p>';
    }
    
    carregando = false;
}

async function mostrarDetalhes(item) {
    const modal = document.getElementById('modal');
    const modalBody = modal.querySelector('.modal-body');
    const secao = traducoes[secaoAtual];
    
    // Limpar o conteúdo anterior
    modalBody.innerHTML = '';
    
    let conteudoExtra = '';
    
    if (secaoAtual === 'filmes') {
        const trailerId = trailersPtBR[item.episode_id];
        if (trailerId) {
            conteudoExtra = `
                <div class="trailer-container">
                    <h3>Trailer Oficial</h3>
                    <iframe width="100%" 
                            height="315" 
                            src="${trailerId}" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
            `;
        }
    }

    const conteudo = `
        <button class="close-btn">&times;</button>
        <h2 class="modal-title">${secaoAtual === 'filmes' ? item.title : item.name}</h2>
        <div class="detalhes-grid">
            ${Object.entries(secao.campos)
                .map(([campo, traducao]) => {
                    if (campo !== 'title' && campo !== 'name') {
                        const valor = item[campo];
                        return `
                            <div class="detalhe-item">
                                <strong>${traducao}:</strong>
                                <span>${traduzirValor(valor, campo)}</span>
                            </div>
                        `;
                    }
                    return '';
                }).join('')}
        </div>
        ${conteudoExtra}
    `;

    modalBody.innerHTML = conteudo;

    // Mostrar o modal
    modal.style.display = 'block';

    // Configurar o botão de fechar
    const fecharModal = () => {
        modal.style.display = 'none';
        if (secaoAtual === 'filmes') {
            const iframe = modalBody.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src;
            }
        }
    };

    modal.querySelector('.close-btn').onclick = fecharModal;
    window.onclick = (event) => {
        if (event.target === modal) {
            fecharModal();
        }
    };
}

// Event Listeners
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.nav-btn.active').classList.remove('active');
        btn.classList.add('active');
        secaoAtual = btn.dataset.section;
        
        // Mostrar/esconder seções apropriadas
        if (secaoAtual === 'ordem-cronologica') {
            document.getElementById('conteudo-principal').style.display = 'none';
            document.getElementById('ordem-cronologica').style.display = 'block';
        } else {
            document.getElementById('conteudo-principal').style.display = 'block';
            document.getElementById('ordem-cronologica').style.display = 'none';
            carregarDados(1);
        }
    });
});

document.querySelector('.explore-btn').addEventListener('click', () => {
    document.getElementById('conteudo-principal').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
    // Esconder a seção de ordem cronológica inicialmente
    document.getElementById('ordem-cronologica').style.display = 'none';
    // Carregar dados da seção inicial
    carregarDados(1);
});

document.getElementById('busca').addEventListener('input', (e) => {
    clearTimeout(buscaTimeout);
    buscaTimeout = setTimeout(() => {
        carregarDados(1, e.target.value);
    }, 300);
});

document.getElementById('pagina-anterior').addEventListener('click', () => {
    if (paginaAtual > 1) {
        carregarDados(paginaAtual - 1);
    }
});

document.getElementById('proxima-pagina').addEventListener('click', () => {
    if (paginaAtual < totalPaginas) {
        carregarDados(paginaAtual + 1);
    }
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Controle do Sabre de Luz e Lado da Força
const initializeLightsaber = () => {
    const forceSideSwitch = document.getElementById('forceSideSwitch');
    const blade = document.querySelector('.blade');
    const body = document.body;

    // Ativar o sabre de luz imediatamente
    blade.classList.add('active');

    // Mudar o lado da força
    forceSideSwitch.addEventListener('change', () => {
        if (forceSideSwitch.checked) {
            // Lado Sombrio
            blade.classList.add('dark-side');
            body.style.setProperty('--primary-color', '#ff3333');
        } else {
            // Lado da Luz
            blade.classList.remove('dark-side');
            body.style.setProperty('--primary-color', '#FFE81F');
        }
    });

    // Efeito de hover no sabre
    const lightsaber = document.querySelector('.lightsaber');
    lightsaber.addEventListener('mouseenter', () => {
        blade.style.transform = 'rotate(-5deg)';
    });

    lightsaber.addEventListener('mouseleave', () => {
        blade.style.transform = 'rotate(0deg)';
    });
};

// Garantir que o código só execute após o DOM estar completamente carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLightsaber);
} else {
    initializeLightsaber();
}

// Inicialização
carregarDados(1);
