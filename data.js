const modulesData = {
    'sample-rate': {
        id: 'sample-rate',
        title: 'Sample Rate (Taxa de Amostragem)',
        subtitle: 'Quantas vezes por segundo o som é medido?',
        icon: 'fa-chart-line',
        theory: `
            <p>O <strong>sample rate</strong> (taxa de amostragem) indica quantas amostras do som são registradas por segundo. É medido em hertz (Hz) ou quilohertz (kHz): por exemplo, <code>44.100 Hz</code> significa 44.100 medições por segundo.</p>
            <p>De acordo com o teorema de Nyquist, para representar uma frequência, a taxa de amostragem precisa ser pelo menos duas vezes maior que ela. O áudio de CD usa 44,1 kHz, suficiente para representar frequências audíveis até aproximadamente 22,05 kHz.</p>
            <div class="info-box info-box-info"><i class="fas fa-lightbulb" aria-hidden="true"></i><div><strong>Em resumo</strong><p>Uma taxa maior pode representar frequências mais altas, mas também aumenta a quantidade de dados. Ela não significa automaticamente que o áudio terá melhor qualidade em qualquer situação.</p></div></div>
        `,
        image: { alt: 'Onda sonora com pontos de amostragem distribuídos ao longo do tempo' },
        audioDemos: [
            { id: 'sr-high', label: '44,1 kHz (referência)', description: 'Amostragem alta com componentes agudos preservados.', quality: 'high', badge: '44,1 kHz' },
            { id: 'sr-low', label: 'Taxa reduzida (~4 kHz)', description: 'Amostragem baixa; frequências altas sofrem aliasing. Simulação didática.', quality: 'low', badge: '~4 kHz' }
        ]
    },
    'bit-depth': {
        id: 'bit-depth',
        title: 'Bit Depth (Profundidade de Bits)',
        subtitle: 'Quantos níveis de volume podem ser representados?',
        icon: 'fa-layer-group',
        theory: `
            <p>A <strong>profundidade de bits</strong> determina quantos valores diferentes podem representar a amplitude de cada amostra. Com <code>n</code> bits, existem <code>2ⁿ</code> níveis possíveis.</p>
            <p>Por exemplo, 16 bits oferecem 65.536 níveis e são usados em áudio de CD. Com 24 bits, há muito mais margem para gravação e processamento, especialmente útil em estúdios.</p>
            <div class="info-box info-box-success"><i class="fas fa-check-circle" aria-hidden="true"></i><div><strong>Importante</strong><p>Mais bits reduzem o erro de quantização e ampliam a faixa dinâmica disponível. A diferença é mais relevante durante gravação, edição e processamento do que em todo cenário de escuta.</p></div></div>
        `,
        image: { alt: 'Comparação entre poucos e muitos níveis de quantização' },
        audioDemos: [
            { id: 'bd-16', label: '16 bits (referência)', description: 'Resolução de amplitude alta, típica de CD.', quality: 'high', badge: '16-bit' },
            { id: 'bd-3', label: '3 bits (degradado)', description: 'Poucos níveis de quantização — erro audível de propósito.', quality: 'low', badge: '3-bit' }
        ]
    },
    bitrate: {
        id: 'bitrate',
        title: 'Bitrate (Taxa de Bits)',
        subtitle: 'Quantos dados são usados por segundo de áudio?',
        icon: 'fa-tachometer-alt',
        theory: `
            <p>O <strong>bitrate</strong> representa a quantidade de dados usada para armazenar ou transmitir um segundo de áudio, normalmente em kilobits por segundo (kbps).</p>
            <p>Em formatos comprimidos com perdas, como MP3 ou AAC, um bitrate maior geralmente preserva mais detalhes e gera arquivos maiores. O resultado também depende do codec e do material sonoro.</p>
            <div class="info-box info-box-warning"><i class="fas fa-exclamation-triangle" aria-hidden="true"></i><div><strong>Não confunda</strong><p>Bitrate não é a mesma coisa que sample rate ou bit depth. Em áudio PCM sem compressão, a taxa de dados pode ser estimada multiplicando sample rate × bit depth × número de canais.</p></div></div>
            <p>Nas demonstrações abaixo, o mesmo sinal é processado para simular o efeito perceptivo típico de compressão em <strong>64 kbps</strong>, <strong>128 kbps</strong> e <strong>320 kbps</strong> (artefatos de banda, quantização e suavização). Não são arquivos codificados por um codec real, mas aproximam o que se ouve na prática.</p>
        `,
        image: { alt: 'Fluxos com diferentes quantidades de dados por segundo' },
        audioDemos: [
            { id: 'br-320', label: '320 kbps', description: 'Alta taxa: detalhes e agudos bem preservados.', quality: 'high', badge: '320 kbps' },
            { id: 'br-128', label: '128 kbps', description: 'Taxa média comum em streaming; leve perda de brilho.', quality: 'mid', badge: '128 kbps' },
            { id: 'br-64', label: '64 kbps', description: 'Taxa baixa: banda estreita, artefatos e menos definição.', quality: 'low', badge: '64 kbps' }
        ]
    },
    formats: {
        id: 'formats',
        title: 'Formatos de Áudio',
        subtitle: 'Entenda as diferenças entre formatos comprimidos e sem perdas.',
        icon: 'fa-file-audio',
        theory: `
            <p>Um <strong>formato de áudio</strong> define como o som é armazenado. WAV e AIFF são contêineres frequentemente usados com áudio PCM sem compressão; FLAC comprime sem descartar informação; MP3 e AAC normalmente usam compressão com perdas.</p>
            <p>Formatos sem perdas preservam os dados do áudio original, embora possam ocupar mais espaço. Formatos com perdas diminuem o tamanho removendo informações consideradas menos perceptíveis.</p>
            <div class="info-box info-box-info"><i class="fas fa-lightbulb" aria-hidden="true"></i><div><strong>Como escolher</strong><ul><li>Para edição e preservação: prefira formatos sem perdas.</li><li>Para compartilhar ou economizar espaço: um formato com perdas pode ser conveniente.</li><li>Considere compatibilidade, tamanho e finalidade do áudio.</li></ul></div></div>
            <p>As demonstrações abaixo simulam o caráter sonoro típico de cada abordagem (PCM/WAV, FLAC sem perdas, MP3 e AAC com perdas). O áudio é gerado no navegador; não são arquivos binários reais desses formatos.</p>
        `,
        image: { alt: 'Diferenças entre formatos de áudio sem perdas e com perdas' },
        audioDemos: [
            { id: 'fmt-wav', label: 'WAV (PCM)', description: 'Sem compressão: referência completa do sinal.', quality: 'high', badge: 'WAV' },
            { id: 'fmt-flac', label: 'FLAC (sem perdas)', description: 'Comprime o tamanho, mas o áudio reconstruído é idêntico ao original.', quality: 'high', badge: 'FLAC' },
            { id: 'fmt-mp3', label: 'MP3 (~128 kbps)', description: 'Com perdas: redução de detalhes e de agudos.', quality: 'mid', badge: 'MP3' },
            { id: 'fmt-aac', label: 'AAC (~96 kbps)', description: 'Com perdas mais eficiente; ainda assim remove informação.', quality: 'low', badge: 'AAC' }
        ]
    }
};

const audioReferences = [
    {
        title: 'Shannon, C. E. (1949). Communication in the Presence of Noise. Proceedings of the IRE, 37(1), 10–21.',
        url: 'https://doi.org/10.1109/JRPROC.1949.232969'
    },
    {
        title: 'Pohlmann, K. C. Principles of Digital Audio. 6ª edição. McGraw-Hill, 2010.',
        url: 'https://www.accessengineeringlibrary.com/content/book/9780071663465'
    },
    {
        title: 'Xiph.Org Foundation. FLAC — Free Lossless Audio Codec: documentação oficial.',
        url: 'https://xiph.org/flac/'
    },
    {
        title: 'International Organization for Standardization. ISO/IEC 11172-3: MPEG-1 Audio.',
        url: 'https://www.iso.org/standard/22412.html'
    }
];

const quizData = [
    {
        question: 'O que indica a taxa de amostragem (sample rate)?',
        options: ['A quantidade de canais de áudio', 'O número de amostras registradas por segundo', 'O tamanho final do arquivo', 'A quantidade de níveis de volume'],
        correct: 1,
        explanation: 'A taxa de amostragem, medida em Hz, informa quantas medições do sinal são feitas por segundo.'
    },
    {
        question: 'Quantos níveis de quantização podem ser representados com 16 bits?',
        options: ['16', '256', '32.768', '65.536'],
        correct: 3,
        explanation: 'A quantidade de níveis é 2ⁿ. Portanto, com 16 bits: 2¹⁶ = 65.536 níveis.'
    },
    {
        question: 'O que normalmente acontece quando se aumenta o bitrate de um arquivo com perdas?',
        options: ['O arquivo sempre fica menor', 'A taxa de amostragem cai automaticamente', 'Mais dados podem preservar mais detalhes, com arquivo maior', 'O áudio passa a ter mais canais'],
        correct: 2,
        explanation: 'Em geral, um bitrate maior em um codec com perdas preserva mais informação e exige mais espaço.'
    },
    {
        question: 'Qual formato é conhecido por comprimir áudio sem perdas?',
        options: ['MP3', 'FLAC', 'JPEG', 'GIF'],
        correct: 1,
        explanation: 'FLAC reduz o tamanho do arquivo sem descartar informação do áudio original.'
    },
    {
        question: 'Qual afirmação sobre o teorema de Nyquist está correta?',
        options: ['A taxa de amostragem deve ser pelo menos o dobro da maior frequência representada', 'A profundidade de bits deve ser sempre 44.100', 'O bitrate define a frequência máxima', 'Todo áudio precisa ter exatamente dois canais'],
        correct: 0,
        explanation: 'Para representar uma frequência sem aliasing, a taxa de amostragem deve ser pelo menos duas vezes essa frequência.'
    }
];
