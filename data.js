const modulesData = {
    'sample-rate': {
        id: 'sample-rate',
        title: 'Sample Rate (Taxa de Amostragem)',
        subtitle: 'Quantas vezes por segundo o som é medido?',
        icon: 'fa-chart-line',
        theory: `
            <p>O <strong>sample rate</strong> (taxa de amostragem) indica quantas amostras do som são registradas por segundo. É medido em hertz (Hz) ou quilohertz (kHz): por exemplo, <code>44.100 Hz</code> significa 44.100 medições por segundo.</p>
            <p>De acordo com o teorema de Nyquist, para representar uma frequência, a taxa de amostragem precisa ser pelo menos duas vezes maior que ela. O áudio de CD usa 44,1 kHz, suficiente para representar frequências audíveis até aproximadamente 22,05 kHz.</p>
            <div class="info-box info-box-info"><i class="fas fa-lightbulb"></i><div><strong>Em resumo</strong><p>Uma taxa maior pode representar frequências mais altas, mas também aumenta a quantidade de dados. Ela não significa automaticamente que o áudio terá melhor qualidade em qualquer situação.</p></div></div>
        `,
        image: { src: '', alt: 'Representação de uma onda medida em diferentes instantes' },
        audioComparison: {
            original: { label: 'Amostragem alta', description: 'Demonstração de referência, com reprodução contínua do tom.', src: '' },
            degraded: { label: 'Amostragem reduzida', description: 'Demonstração com efeito de amostragem reduzida e quantização mais grosseira.', src: '' }
        }
    },
    'bit-depth': {
        id: 'bit-depth',
        title: 'Bit Depth (Profundidade de Bits)',
        subtitle: 'Quantos níveis de volume podem ser representados?',
        icon: 'fa-layer-group',
        theory: `
            <p>A <strong>profundidade de bits</strong> determina quantos valores diferentes podem representar a amplitude de cada amostra. Com <code>n</code> bits, existem <code>2ⁿ</code> níveis possíveis.</p>
            <p>Por exemplo, 16 bits oferecem 65.536 níveis e são usados em áudio de CD. Com 24 bits, há muito mais margem para gravação e processamento, especialmente útil em estúdios.</p>
            <div class="info-box info-box-success"><i class="fas fa-check-circle"></i><div><strong>Importante</strong><p>Mais bits reduzem o erro de quantização e ampliam a faixa dinâmica disponível. A diferença é mais relevante durante gravação, edição e processamento do que em todo cenário de escuta.</p></div></div>
        `,
        image: { src: '', alt: 'Representação dos níveis de quantização de uma onda sonora' },
        audioComparison: {
            original: { label: 'Maior profundidade', description: 'Tom com amplitude mais suave, como referência de maior resolução.', src: '' },
            degraded: { label: 'Profundidade reduzida', description: 'Tom quantizado com menos níveis, simulando distorção de quantização.', src: '' }
        }
    },
    bitrate: {
        id: 'bitrate',
        title: 'Bitrate (Taxa de Bits)',
        subtitle: 'Quantos dados são usados por segundo de áudio?',
        icon: 'fa-tachometer-alt',
        theory: `
            <p>O <strong>bitrate</strong> representa a quantidade de dados usada para armazenar ou transmitir um segundo de áudio, normalmente em kilobits por segundo (kbps).</p>
            <p>Em formatos comprimidos com perdas, como MP3 ou AAC, um bitrate maior geralmente preserva mais detalhes e gera arquivos maiores. O resultado também depende do codec e do material sonoro.</p>
            <div class="info-box info-box-warning"><i class="fas fa-exclamation-triangle"></i><div><strong>Não confunda</strong><p>Bitrate não é a mesma coisa que sample rate ou bit depth. Em áudio PCM sem compressão, a taxa de dados pode ser estimada multiplicando sample rate × bit depth × número de canais.</p></div></div>
        `,
        image: { src: '', alt: 'Comparação ilustrativa entre fluxos de áudio com diferentes taxas de dados' },
        audioComparison: {
            original: { label: 'Mais dados', description: 'Demonstração de referência com o sinal completo.', src: '' },
            degraded: { label: 'Menos dados', description: 'Demonstração simplificada de um sinal com menos informação.', src: '' }
        }
    },
    formats: {
        id: 'formats',
        title: 'Formatos de Áudio',
        subtitle: 'Entenda as diferenças entre formatos comprimidos e sem perdas.',
        icon: 'fa-file-audio',
        theory: `
            <p>Um <strong>formato de áudio</strong> define como o som é armazenado. WAV e AIFF são contêineres frequentemente usados com áudio PCM sem compressão; FLAC comprime sem descartar informação; MP3 e AAC normalmente usam compressão com perdas.</p>
            <p>Formatos sem perdas preservam os dados do áudio original, embora possam ocupar mais espaço. Formatos com perdas diminuem o tamanho removendo informações consideradas menos perceptíveis.</p>
            <div class="info-box info-box-info"><i class="fas fa-lightbulb"></i><div><strong>Como escolher</strong><ul><li>Para edição e preservação: prefira formatos sem perdas.</li><li>Para compartilhar ou economizar espaço: um formato com perdas pode ser conveniente.</li><li>Considere compatibilidade, tamanho e finalidade do áudio.</li></ul></div></div>
        `,
        image: { src: '', alt: 'Resumo visual de formatos de áudio sem perdas e com perdas' },
        audioComparison: {
            original: { label: 'Sem perdas', description: 'Demonstração de referência sem redução intencional do sinal.', src: '' },
            degraded: { label: 'Com perdas', description: 'Exemplo sonoro simplificado de redução da resolução do sinal.', src: '' }
        }
    }
};

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
