const AppState = {
    currentModule: 'home',
    visitedModules: new Set(['home']),
    quizState: {
        currentQuestion: 0,
        answers: [],
        score: 0,
        finished: false
    }
};

// ========================================
// SISTEMA DE NAVEGAÇÃO
// ========================================
function navigateTo(moduleId) {
    // Atualiza estado
    AppState.currentModule = moduleId;
    AppState.visitedModules.add(moduleId);
    
    // Atualiza URL (hash)
    window.location.hash = moduleId;
    
    // Atualiza sidebar
    updateSidebarActive(moduleId);
    
    // Atualiza progresso
    updateProgress();
    
    // Renderiza conteúdo com animação suave
    const mainContent = document.getElementById('mainContent');
    mainContent.style.animation = 'none';
    setTimeout(() => {
        mainContent.style.animation = 'fadeIn 0.5s ease';
        renderModule(moduleId);
    }, 10);
    
    // Scroll para o topo do conteúdo
    mainContent.scrollTop = 0;
}

function updateSidebarActive(moduleId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.module === moduleId) {
            item.classList.add('active');
        }
    });
}

function updateProgress() {
    const totalModules = Object.keys(modulesData).length + 2; // +home +quiz
    const progress = Math.round((AppState.visitedModules.size / totalModules) * 100);
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = `${progress}%`;
    }
}

// ========================================
// RENDERIZAÇÃO DE CONTEÚDO
// ========================================
function renderModule(moduleId) {
    const mainContent = document.getElementById('mainContent');
    
    if (moduleId === 'home') {
        mainContent.innerHTML = renderHome();
    } else if (moduleId === 'quiz') {
        mainContent.innerHTML = renderQuiz();
        attachQuizListeners();
    } else if (modulesData[moduleId]) {
        mainContent.innerHTML = renderModuleContent(modulesData[moduleId]);
        attachAudioListeners();
    } else {
        mainContent.innerHTML = '<h2>Módulo não encontrado</h2>';
    }
}

// ========================================
// RENDERIZAÇÃO: HOME (HUB)
// ========================================
function renderHome() {
    const moduleCards = Object.values(modulesData).map(mod => `
        <div class="module-card" data-module="${mod.id}">
            <div class="module-card-icon">
                <i class="fas ${mod.icon}"></i>
            </div>
            <div class="module-card-content">
                <h3>${mod.title}</h3>
                <p>${mod.subtitle}</p>
            </div>
            <div class="module-card-arrow">
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    `).join('');

    return `
        <div class="home-container">
            <div class="home-header">
                <h1 class="home-title">
                    Bem-vindo ao <span class="text-gradient">Áudio Digital</span>
                </h1>
                <p class="home-subtitle">
                    Explore os conceitos fundamentais do áudio digital de forma interativa. 
                    Escolha um módulo abaixo para começar sua jornada.
                </p>
            </div>
            
            <div class="modules-grid">
                ${moduleCards}
                
                <div class="module-card module-card-quiz" data-module="quiz">
                    <div class="module-card-icon">
                        <i class="fas fa-question-circle"></i>
                    </div>
                    <div class="module-card-content">
                        <h3>Quiz de Fixação</h3>
                        <p>Teste seus conhecimentos com 5 perguntas</p>
                    </div>
                    <div class="module-card-arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
            
            <div class="home-tips">
                <h3><i class="fas fa-graduation-cap"></i> Como aproveitar melhor:</h3>
                <ul>
                    <li><strong>Ouça os áudios comparativos</strong> — a diferença prática vale mais que a teoria!</li>
                    <li><strong>Use fones de ouvido</strong> para perceber melhor as nuances.</li>
                    <li><strong>Navegue livremente</strong> — a ordem é sua escolha.</li>
                    <li><strong>Faça o quiz</strong> ao final para fixar o conteúdo.</li>
                </ul>
            </div>
        </div>
    `;
}

// ========================================
// DIAGRAMAS ILUSTRATIVOS DOS MÓDULOS
// ========================================
function renderDiagram(module) {
    const diagrams = {
        'sample-rate': `
            <svg class="concept-diagram" viewBox="0 0 720 280" role="img" aria-label="Uma onda sonora contínua comparada com amostras em instantes regulares">
                <line class="diagram-axis" x1="55" y1="220" x2="680" y2="220" />
                <line class="diagram-axis" x1="55" y1="45" x2="55" y2="220" />
                <path class="diagram-wave" d="M55 130 C85 55 115 55 145 130 S205 205 235 130 S295 55 325 130 S385 205 415 130 S475 55 505 130 S565 205 595 130 S655 55 680 130" />
                <g class="diagram-samples">
                    <circle cx="55" cy="130" r="6"/><circle cx="100" cy="72" r="6"/><circle cx="145" cy="130" r="6"/><circle cx="190" cy="188" r="6"/><circle cx="235" cy="130" r="6"/><circle cx="280" cy="72" r="6"/><circle cx="325" cy="130" r="6"/><circle cx="370" cy="188" r="6"/><circle cx="415" cy="130" r="6"/><circle cx="460" cy="72" r="6"/><circle cx="505" cy="130" r="6"/><circle cx="550" cy="188" r="6"/><circle cx="595" cy="130" r="6"/><circle cx="640" cy="72" r="6"/><circle cx="680" cy="110" r="6"/>
                </g>
                <text class="diagram-label" x="365" y="258" text-anchor="middle">Amostras medidas em intervalos regulares</text>
                <text class="diagram-small" x="18" y="56">Amplitude</text>
            </svg>`,
        'bit-depth': `
            <svg class="concept-diagram" viewBox="0 0 720 280" role="img" aria-label="Comparação entre poucos e muitos níveis de quantização">
                <text class="diagram-label" x="190" y="36" text-anchor="middle">Poucos níveis</text>
                <text class="diagram-label" x="530" y="36" text-anchor="middle">Mais níveis</text>
                <g class="diagram-grid">
                    <line x1="55" y1="75" x2="325" y2="75"/><line x1="55" y1="115" x2="325" y2="115"/><line x1="55" y1="155" x2="325" y2="155"/><line x1="55" y1="195" x2="325" y2="195"/>
                    <line x1="395" y1="65" x2="665" y2="65"/><line x1="395" y1="85" x2="665" y2="85"/><line x1="395" y1="105" x2="665" y2="105"/><line x1="395" y1="125" x2="665" y2="125"/><line x1="395" y1="145" x2="665" y2="145"/><line x1="395" y1="165" x2="665" y2="165"/><line x1="395" y1="185" x2="665" y2="185"/><line x1="395" y1="205" x2="665" y2="205"/>
                </g>
                <path class="diagram-quantized" d="M55 155 H100 V115 H145 V75 H190 V115 H235 V155 H280 V195 H325" />
                <path class="diagram-quantized diagram-quantized-fine" d="M395 145 H430 V125 H465 V95 H500 V75 H535 V95 H570 V125 H605 V165 H640 V185 H665" />
                <text class="diagram-small" x="360" y="242" text-anchor="middle">Mais bits permitem representar mais níveis de amplitude</text>
            </svg>`,
        bitrate: `
            <svg class="concept-diagram" viewBox="0 0 720 280" role="img" aria-label="Fluxo de dados por segundo em bitrate baixo e alto">
                <text class="diagram-label" x="360" y="34" text-anchor="middle">Quantidade de dados transmitidos por segundo</text>
                <text class="diagram-small" x="65" y="103">Bitrate menor</text>
                <text class="diagram-small" x="65" y="190">Bitrate maior</text>
                <rect class="diagram-track" x="200" y="75" width="460" height="42" rx="8"/>
                <rect class="diagram-track" x="200" y="162" width="460" height="42" rx="8"/>
                <g class="diagram-data-low"><rect x="212" y="84" width="54" height="24" rx="4"/><rect x="284" y="84" width="54" height="24" rx="4"/><rect x="356" y="84" width="54" height="24" rx="4"/></g>
                <g class="diagram-data-high"><rect x="212" y="171" width="28" height="24" rx="3"/><rect x="248" y="171" width="28" height="24" rx="3"/><rect x="284" y="171" width="28" height="24" rx="3"/><rect x="320" y="171" width="28" height="24" rx="3"/><rect x="356" y="171" width="28" height="24" rx="3"/><rect x="392" y="171" width="28" height="24" rx="3"/><rect x="428" y="171" width="28" height="24" rx="3"/><rect x="464" y="171" width="28" height="24" rx="3"/><rect x="500" y="171" width="28" height="24" rx="3"/><rect x="536" y="171" width="28" height="24" rx="3"/><rect x="572" y="171" width="28" height="24" rx="3"/><rect x="608" y="171" width="28" height="24" rx="3"/></g>
                <text class="diagram-small" x="430" y="242" text-anchor="middle">Mais dados podem preservar mais detalhes e ocupar mais espaço</text>
            </svg>`,
        formats: `
            <svg class="concept-diagram" viewBox="0 0 720 280" role="img" aria-label="Formatos de áudio divididos entre sem perdas e com perdas">
                <rect class="diagram-format-box" x="260" y="18" width="200" height="52" rx="12"/>
                <text class="diagram-label" x="360" y="50" text-anchor="middle">Formatos de áudio</text>
                <path class="diagram-connector" d="M360 70 V102 M360 102 H190 V124 M360 102 H530 V124"/>
                <rect class="diagram-lossless" x="65" y="124" width="250" height="112" rx="12"/>
                <rect class="diagram-lossy" x="405" y="124" width="250" height="112" rx="12"/>
                <text class="diagram-label" x="190" y="157" text-anchor="middle">Sem perdas</text>
                <text class="diagram-small" x="190" y="185" text-anchor="middle">Preserva os dados originais</text>
                <text class="diagram-format-name" x="190" y="216" text-anchor="middle">WAV · AIFF · FLAC</text>
                <text class="diagram-label" x="530" y="157" text-anchor="middle">Com perdas</text>
                <text class="diagram-small" x="530" y="185" text-anchor="middle">Reduz dados e tamanho</text>
                <text class="diagram-format-name" x="530" y="216" text-anchor="middle">MP3 · AAC</text>
            </svg>`
    };

    return diagrams[module.id] || `<div class="diagram-placeholder"><i class="fas fa-project-diagram"></i><p>${module.image.alt}</p></div>`;
}

// ========================================
// RENDERIZAÇÃO: MÓDULOS DE CONTEÚDO
// ========================================
function renderModuleContent(module) {
    return `
        <div class="module-container">
            <div class="module-header">
                <div class="module-header-icon">
                    <i class="fas ${module.icon}"></i>
                </div>
                <div class="module-header-text">
                    <h1>${module.title}</h1>
                    <p>${module.subtitle}</p>
                </div>
            </div>
            
            <div class="module-body">
                <!-- Teoria -->
                <section class="theory-section">
                    <h2><i class="fas fa-book-open"></i> Teoria</h2>
                    <div class="theory-content">
                        ${module.theory}
                    </div>
                </section>
                
                                <!-- Diagrama -->
                <section class="diagram-section">
                    <h2><i class="fas fa-project-diagram"></i> Diagrama</h2>
                    <div class="diagram-container">
                        ${renderDiagram(module)}
                    </div>
                </section>
                
                <!-- Player Comparativo A/B -->
                <section class="audio-comparison-section">
                    <h2><i class="fas fa-headphones"></i> Comparação A/B</h2>
                    <p class="audio-comparison-intro">
                        Ouça os dois áudios abaixo e perceba a diferença na prática. 
                        <strong>Use fones de ouvido</strong> para melhor experiência.
                    </p>
                    
                    <div class="audio-players">
                        <!-- Player Original -->
                        <div class="audio-player audio-player-original" data-type="original" data-module="${module.id}">
                            <div class="audio-player-header">
                                <span class="audio-badge badge-original">ORIGINAL</span>
                                <h3>${module.audioComparison.original.label}</h3>
                            </div>
                            <p class="audio-description">${module.audioComparison.original.description}</p>
                            <div class="audio-controls">
                                <button class="audio-btn play-btn" data-src="${module.audioComparison.original.src}">
                                    <i class="fas fa-play"></i>
                                    <span>Ouvir</span>
                                </button>
                                <div class="audio-waveform">
                                    <span></span><span></span><span></span><span></span><span></span>
                                    <span></span><span></span><span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Player Degradado -->
                        <div class="audio-player audio-player-degraded" data-type="degraded" data-module="${module.id}">
                            <div class="audio-player-header">
                                <span class="audio-badge badge-degraded">DEGRADADO</span>
                                <h3>${module.audioComparison.degraded.label}</h3>
                            </div>
                            <p class="audio-description">${module.audioComparison.degraded.description}</p>
                            <div class="audio-controls">
                                <button class="audio-btn play-btn" data-src="${module.audioComparison.degraded.src}">
                                    <i class="fas fa-play"></i>
                                    <span>Ouvir</span>
                                </button>
                                <div class="audio-waveform">
                                    <span></span><span></span><span></span><span></span><span></span>
                                    <span></span><span></span><span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Elemento de áudio oculto -->
                    <audio id="audioPlayer" preload="metadata"></audio>
                </section>
            </div>
            
            <!-- Navegação entre módulos -->
            <div class="module-navigation">
                <button class="nav-btn nav-btn-prev" id="prevModule">
                    <i class="fas fa-arrow-left"></i>
                    <span>Módulo Anterior</span>
                </button>
                <button class="nav-btn nav-btn-next" id="nextModule">
                    <span>Próximo Módulo</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

// ========================================
// PLAYER DE ÁUDIO
// ========================================
let currentPlayingBtn = null;
const demoAudioUrls = {};

function createDemoAudioDataUrl(isDegraded) {
    const key = isDegraded ? 'degraded' : 'original';
    if (demoAudioUrls[key]) return demoAudioUrls[key];

    const sampleRate = 22050;
    const duration = 2.5;
    const sampleCount = Math.floor(sampleRate * duration);
    const bytesPerSample = 2;
    const buffer = new ArrayBuffer(44 + sampleCount * bytesPerSample);
    const view = new DataView(buffer);

    const writeText = (offset, text) => {
        for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i));
    };

    writeText(0, 'RIFF');
    view.setUint32(4, 36 + sampleCount * bytesPerSample, true);
    writeText(8, 'WAVE');
    writeText(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * bytesPerSample, true);
    view.setUint16(32, bytesPerSample, true);
    view.setUint16(34, 16, true);
    writeText(36, 'data');
    view.setUint32(40, sampleCount * bytesPerSample, true);

    const playbackRate = isDegraded ? 8000 : sampleRate;
    const levels = isDegraded ? 8 : 32767;
    let heldSample = 0;
    for (let i = 0; i < sampleCount; i++) {
        if (!isDegraded || i % Math.round(sampleRate / playbackRate) === 0) {
            const time = i / sampleRate;
            const tone = Math.sin(2 * Math.PI * 440 * time) * 0.55 + Math.sin(2 * Math.PI * 660 * time) * 0.2;
            heldSample = isDegraded ? Math.round(tone * levels) / levels : tone;
        }
        const envelope = Math.min(1, i / 500, (sampleCount - i) / 1000);
        view.setInt16(44 + i * bytesPerSample, Math.max(-1, Math.min(1, heldSample * envelope)) * 32767, true);
    }

    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    demoAudioUrls[key] = `data:audio/wav;base64,${btoa(binary)}`;
    return demoAudioUrls[key];
}

function attachAudioListeners() {
    const playButtons = document.querySelectorAll('.play-btn');
    const audioElement = document.getElementById('audioPlayer');
    
    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
                        const player = btn.closest('.audio-player');
            const isDegraded = player.classList.contains('audio-player-degraded');
            const src = btn.dataset.src || createDemoAudioDataUrl(isDegraded);
            
            // Se o mesmo botão está tocando, pausa
            if (currentPlayingBtn === btn && !audioElement.paused) {
                audioElement.pause();
                updatePlayButton(btn, false);
                return;
            }
            
            // Para qualquer áudio tocando anteriormente
            if (currentPlayingBtn) {
                audioElement.pause();
                updatePlayButton(currentPlayingBtn, false);
            }
            
            // Carrega e toca novo áudio
            audioElement.src = src;
            audioElement.play().catch(err => {
                console.warn('Erro ao tocar áudio:', err);
                alert('Áudio não encontrado. Verifique se o arquivo existe em: ' + src);
            });
            
            updatePlayButton(btn, true);
            currentPlayingBtn = btn;
        });
    });
    
    // Quando o áudio termina, reseta o botão
    audioElement.addEventListener('ended', () => {
        if (currentPlayingBtn) {
            updatePlayButton(currentPlayingBtn, false);
            currentPlayingBtn = null;
        }
    });
    
    // Configura navegação entre módulos
    attachModuleNavigation();
}

function updatePlayButton(btn, isPlaying) {
    const icon = btn.querySelector('i');
    const text = btn.querySelector('span');
    const player = btn.closest('.audio-player');
    const waveform = player.querySelector('.audio-waveform');
    
    if (isPlaying) {
        icon.className = 'fas fa-pause';
        text.textContent = 'Pausar';
        player.classList.add('playing');
        waveform.classList.add('active');
    } else {
        icon.className = 'fas fa-play';
        text.textContent = 'Ouvir';
        player.classList.remove('playing');
        waveform.classList.remove('active');
    }
}

function attachModuleNavigation() {
    const moduleKeys = Object.keys(modulesData);
    const currentIndex = moduleKeys.indexOf(AppState.currentModule);
    
    const prevBtn = document.getElementById('prevModule');
    const nextBtn = document.getElementById('nextModule');
    
    if (prevBtn) {
        if (currentIndex <= 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.5';
        } else {
            prevBtn.addEventListener('click', () => {
                navigateTo(moduleKeys[currentIndex - 1]);
            });
        }
    }
    
    if (nextBtn) {
        if (currentIndex >= moduleKeys.length - 1) {
            // Último módulo - leva ao quiz
            nextBtn.querySelector('span').textContent = 'Ir para o Quiz';
            nextBtn.addEventListener('click', () => {
                resetQuiz();
                navigateTo('quiz');
            });
        } else {
            nextBtn.addEventListener('click', () => {
                navigateTo(moduleKeys[currentIndex + 1]);
            });
        }
    }
}

// ========================================
// SISTEMA DE QUIZ
// ========================================
function renderQuiz() {
    if (AppState.quizState.finished) {
        return renderQuizResult();
    }
    
    const q = quizData[AppState.quizState.currentQuestion];
    const total = quizData.length;
    const current = AppState.quizState.currentQuestion + 1;
    const progress = (current / total) * 100;
    
    const optionsHTML = q.options.map((opt, idx) => `
        <button class="quiz-option" data-index="${idx}">
            <span class="quiz-option-letter">${String.fromCharCode(65 + idx)}</span>
            <span class="quiz-option-text">${opt}</span>
        </button>
    `).join('');
    
    return `
        <div class="quiz-container">
            <div class="quiz-header">
                <h1><i class="fas fa-question-circle"></i> Quiz de Fixação</h1>
                <div class="quiz-progress">
                    <div class="quiz-progress-bar">
                        <div class="quiz-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="quiz-progress-text">Pergunta ${current} de ${total}</span>
                </div>
            </div>
            
            <div class="quiz-body">
                <div class="quiz-question">
                    <h2>${q.question}</h2>
                </div>
                
                <div class="quiz-options">
                    ${optionsHTML}
                </div>
                
                <div class="quiz-feedback hidden" id="quizFeedback">
                    <div class="quiz-feedback-icon"></div>
                    <div class="quiz-feedback-text"></div>
                </div>
                
                <div class="quiz-actions">
                    <button class="quiz-btn quiz-btn-next hidden" id="quizNextBtn">
                        <span>Próxima Pergunta</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderQuizResult() {
    const total = quizData.length;
    const score = AppState.quizState.score;
    const percentage = Math.round((score / total) * 100);
    
    let message, icon, colorClass;
    if (percentage >= 80) {
        message = 'Excelente! Você dominou os conceitos!';
        icon = 'fa-trophy';
        colorClass = 'result-excellent';
    } else if (percentage >= 60) {
        message = 'Muito bom! Você está no caminho certo.';
        icon = 'fa-star';
        colorClass = 'result-good';
    } else {
        message = 'Continue estudando! Revise os módulos.';
        icon = 'fa-book';
        colorClass = 'result-review';
    }
    
    return `
        <div class="quiz-result-container">
            <div class="quiz-result-icon ${colorClass}">
                <i class="fas ${icon}"></i>
            </div>
            <h1>Quiz Finalizado!</h1>
            <p class="quiz-result-message">${message}</p>
            
            <div class="quiz-result-score">
                <div class="score-circle ${colorClass}">
                    <span class="score-value">${score}</span>
                    <span class="score-total">/ ${total}</span>
                </div>
                <div class="score-percentage">${percentage}% de acerto</div>
            </div>
            
            <div class="quiz-result-details">
                <h3>Resumo das respostas:</h3>
                <div class="result-details-list">
                    ${quizData.map((q, idx) => {
                        const userAnswer = AppState.quizState.answers[idx];
                        const isCorrect = userAnswer === q.correct;
                        return `
                            <div class="result-detail-item ${isCorrect ? 'correct' : 'incorrect'}">
                                <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                <div>
                                    <strong>${q.question}</strong>
                                    <p>Sua resposta: ${userAnswer !== undefined && userAnswer !== null ? q.options[userAnswer] : 'Não respondida'}</p>
                                    ${!isCorrect ? `<p class="correct-answer">Correta: ${q.options[q.correct]}</p>` : ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="quiz-result-actions">
                <button class="result-btn result-btn-retry" id="quizRetryBtn">
                    <i class="fas fa-redo"></i>
                    <span>Tentar Novamente</span>
                </button>
                <button class="result-btn result-btn-home" id="quizHomeBtn">
                    <i class="fas fa-home"></i>
                    <span>Voltar ao Início</span>
                </button>
            </div>
        </div>
    `;
}

function attachQuizListeners() {
    // Se o quiz já terminou, anexa listeners dos botões de resultado
    if (AppState.quizState.finished) {
        const retryBtn = document.getElementById('quizRetryBtn');
        const homeBtn = document.getElementById('quizHomeBtn');
        
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                resetQuiz();
                renderModule('quiz');
                attachQuizListeners();
            });
        }
        
        if (homeBtn) {
            homeBtn.addEventListener('click', () => {
                resetQuiz();
                navigateTo('home');
            });
        }
        return;
    }
    
    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('quizNextBtn');
    const currentQ = quizData[AppState.quizState.currentQuestion];
    
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            // Evita múltiplas respostas na mesma pergunta
            if (feedback.classList.contains('show')) return;
            
            const selectedIndex = parseInt(opt.dataset.index);
            const isCorrect = selectedIndex === currentQ.correct;
            
            // Salva resposta
            AppState.quizState.answers[AppState.quizState.currentQuestion] = selectedIndex;
            if (isCorrect) AppState.quizState.score++;
            
            // Marca visualmente
            options.forEach(o => o.classList.add('disabled'));
            opt.classList.add(isCorrect ? 'correct' : 'incorrect');
            
            if (!isCorrect) {
                options[currentQ.correct].classList.add('correct');
            }
            
            // Mostra feedback com animação
            feedback.classList.remove('hidden');
            setTimeout(() => feedback.classList.add('show'), 10);
            
            const feedbackIcon = feedback.querySelector('.quiz-feedback-icon');
            const feedbackText = feedback.querySelector('.quiz-feedback-text');
            
            if (isCorrect) {
                feedback.classList.add('feedback-correct');
                feedbackIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
                feedbackText.innerHTML = `<strong>Correto!</strong><p>${currentQ.explanation}</p>`;
            } else {
                feedback.classList.add('feedback-incorrect');
                feedbackIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
                feedbackText.innerHTML = `<strong>Incorreto.</strong><p>${currentQ.explanation}</p>`;
            }
            
            // Mostra botão próxima
            nextBtn.classList.remove('hidden');
        });
    });
    
    // Botão próxima pergunta
    nextBtn.addEventListener('click', () => {
        AppState.quizState.currentQuestion++;
        
        if (AppState.quizState.currentQuestion >= quizData.length) {
            AppState.quizState.finished = true;
        }
        
        renderModule('quiz');
        attachQuizListeners();
    });
}

function resetQuiz() {
    AppState.quizState = {
        currentQuestion: 0,
        answers: [],
        score: 0,
        finished: false
    };
}

// ========================================
// TEMA CLARO / ESCURO
// ========================================
function setTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-theme', isLight);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = `<i class="fas ${isLight ? 'fa-sun' : 'fa-moon'}"></i>`;
        themeToggle.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
        themeToggle.setAttribute('title', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================
function initApp() {
    const themeToggle = document.getElementById('themeToggle');
    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem('audio-digital-theme') || 'dark';
    } catch (error) {
        // O tema continua funcionando mesmo se o armazenamento estiver indisponível.
    }
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            setTheme(nextTheme);
            try {
                localStorage.setItem('audio-digital-theme', nextTheme);
            } catch (error) {
                // A alternância permanece ativa até a página ser recarregada.
            }
        });
    }

    // Event listeners da sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleId = link.closest('.nav-item').dataset.module;
            
            if (moduleId === 'quiz') {
                resetQuiz();
            }
            
            navigateTo(moduleId);
        });
    });
    
    // Event delegation para os cards da home
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.module-card');
        if (card) {
            const moduleId = card.dataset.module;
            if (moduleId === 'quiz') {
                resetQuiz();
            }
            navigateTo(moduleId);
        }
    });
    
    // Suporte a navegação via hash (botões voltar/avançar do navegador)
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (hash && hash !== AppState.currentModule) {
            if (hash === 'quiz') resetQuiz();
            navigateTo(hash);
        }
    });
    
    // Carrega módulo inicial baseado na URL ou home
    const initialModule = window.location.hash.substring(1) || 'home';
    navigateTo(initialModule);
}

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);
