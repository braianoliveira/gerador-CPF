import { describe, it, expect } from "vitest";
import { gerarCPF, gerarDV, validarCPF } from "../src/index.js";

describe( gerarDV.name, () => {
    it( 'Lança exceção se o cpf não for string', () => {
        expect( () => {
            gerarDV( 12345679 );
        }).toThrow( /string/i );
    });

    it( 'Deve ter 9 dígitos numéricos', () => {
        expect( () => {
            gerarDV( '1234567890' );
        }).toThrow( /9/i );

        expect( () => {
            gerarDV( '12345679' );
        }).toThrow( /9/i );
    });

    it( 'Aceita apenas dígitos numéricos', () => {
        expect( () => {
            gerarDV( '12345678A' );
        }).toThrow( /numéricos/i );

        expect( () => {
            gerarDV( '123.456.7' );
        }).toThrow( /numéricos/i );
    });

    it( 'Gera o DV corretamente', () => {
        const resultado = gerarDV('062910040');
        expect( resultado ).toBe( '38' );

        expect( gerarDV( '111111111') ).toBe( '11' );
        expect( gerarDV( '222222222') ).toBe( '22' );
    });
});

describe( validarCPF.name, ()=> {
    it( 'Lança exceção se o cpf não for string', () => {
        expect( () => {
            validarCPF( 1234567911 );
        }).toThrow( /string/i );
    });

    it( 'Deve ter 11 dígitos numéricos', () => {
        expect( () => {
            validarCPF( '123456789036' );
        }).toThrow( /11/i );

        expect( () => {
            validarCPF( '12345679' );
        }).toThrow( /11/i );
    });

    it( 'Aceita apenas dígitos numéricos', () => {
        expect( () => {
            validarCPF( '1234567890A' );
        }).toThrow( /numérico/i );

        expect( () => {
            validarCPF( '123.456.711' );
        }).toThrow( /numérico/i );
    });

    it( 'Valida o DV corretamente', () => {
        const resultado = validarCPF('06291004038');
        expect( resultado ).toBeTruthy();
    })
});

describe( gerarCPF.name, () => {
    it( 'gera um CPF correto', () => {
        expect( validarCPF( gerarCPF() ) ).toBeTruthy();
    })
});