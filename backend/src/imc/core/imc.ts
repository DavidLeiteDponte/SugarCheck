import { UserId } from "../../user/core/value-objects/UserId";
import { ImcAltura } from "./value-objects/imcAltura"; // Corregido CapitalCase
import { ImcPeso } from "./value-objects/imcPeso";     // Corregido CapitalCase

export class Imc {
    private readonly idUser: UserId;
    private readonly peso: ImcPeso;
    private readonly altura: ImcAltura;

    // Usar constructor público o un método estático 'create' si necesitas validaciones extra
    public constructor(idUser: UserId, peso: ImcPeso, altura: ImcAltura) {
        this.idUser = idUser;
        this.peso = peso;
        this.altura = altura;
    }

    /**
     * Calcula el Índice de Masa Corporal.
     * El resultado se redondea a 2 decimales para mayor limpieza.
     */
    public calcular(): number {
        const alturaEnMetros = this.altura.value / 100;
        const resultadoIMC = this.peso.value / Math.pow(alturaEnMetros, 2);

        return Number(resultadoIMC.toFixed(2));
    }

    // Getters útiles
    get userId(): UserId { return this.idUser; }
    get currentPeso(): number { return this.peso.value; }
    get currentAltura(): number { return this.altura.value; }
}