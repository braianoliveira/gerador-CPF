const DIGITOS_CPF_SEM_VERIFICADOR = 9;
const DIGITOS_CPF_COM_VERIFICADOR = 11;

export function gerarDV( cpf ) {
    checarCPF( cpf, DIGITOS_CPF_SEM_VERIFICADOR );

    // PASSO 1
    let soma = 0;

    for( let i = 0; i < DIGITOS_CPF_SEM_VERIFICADOR; i++ ){
        soma += Number( cpf[i] ) * ( 10 - i );
    }

    let dv1 = soma % 11;
    dv1 = dv1 < 2 ? 0 : ( 11 - dv1 );

    // PASSO 2
    cpf += dv1.toString();
    soma = 0;

    for( let i = 0; i < DIGITOS_CPF_SEM_VERIFICADOR + 1; i++ ){
        soma += Number( cpf[i] ) * ( 11 - i );
    }

    let dv2 = soma % 11;
    dv2 = dv2 < 2 ? 0 : ( 11 - dv2 );

    return dv1.toString() + dv2.toString();
}

function checarCPF( cpf, digitos ){
    if( typeof cpf !== 'string' ){
        throw new Error( 'O cpf deve ser uma string.' );
    }

    if( cpf.length !== digitos ){
        throw new Error( `O cpf deve ter ${digitos} dígitos` );
    }

    if( ! /^[0-9]+$/.test( cpf ) ){
        throw new Error( `O cpf deve ter ${digitos} dígitos numéricos` );
    }
}

export function validarCPF( cpf ){
    checarCPF( cpf, DIGITOS_CPF_COM_VERIFICADOR );

    const cpfSemDV = cpf.substring( 0, DIGITOS_CPF_SEM_VERIFICADOR );
    return gerarDV( cpfSemDV ) === cpf.substring( cpfSemDV.length )
}

function gerarNumeros( tamanho ){
    let numero = '';
    for( let i = 0; i < tamanho; i++ ){
        numero += inteiroAleatorio(0, 9);
    }
    return numero;
}

function inteiroAleatorio( min, max ){
    return Math.trunc( min + Math.random() * ( max - min + 1 ) ); // >= min && <= max
}

export function gerarCPF(){
    const digitosSemDV = gerarNumeros( DIGITOS_CPF_SEM_VERIFICADOR );
    return digitosSemDV + gerarDV( digitosSemDV );
}