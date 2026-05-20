import { UserId } from '../../shared/core/value-objects/UserId';
import { ErrorAbstract } from '../../shared/error-abstract';
import { Result } from '../../shared/result';
import { Preference } from '../core/Preference';
import { PreferenceRepository } from '../core/PreferenceRepository';
import { UnitMeasure } from '../core/value-objects/UnitMeasure';
import { InsulinRatios } from '../core/value-objects/InsulinRatios';
import { SensitivityFactor } from '../core/value-objects/SensitivityFactor';
import { Thresholds } from '../core/value-objects/Thresholds';

// Definimos un DTO para agrupar los datos opcionales a actualizar
export interface UpdatePreferenceDTO {
  unitMeasure?: string;
  thresholds?: { hypo: number; hiper: number };
  insulinRatios?: { breakfast: number; lunch: number; dinner: number };
  sensitivity?: number;
}

export class UpdatePreference {
  constructor(private readonly repository: PreferenceRepository) {}

  async run(
    userId: string,
    data: UpdatePreferenceDTO
  ): Promise<Result<Preference, ErrorAbstract>> {
    
    // 1. Validar el ID (obligatorio)
    const idRes = UserId.create(userId);
    if (!idRes.isValid) return Result.fail(idRes.getError());

    // 2. Objeto para recolectar solo los Value Objects que se van a actualizar
    // Usamos 'any' o un tipo de propiedades si tus propiedades en Preference son privadas
    const updateProps: any = {};

    // 3. Validar de forma individual solo lo que viene en el DTO
    if (data.unitMeasure !== undefined) {
      const unitMeasureRes = UnitMeasure.create(data.unitMeasure);
      if (!unitMeasureRes.isValid) return Result.fail(unitMeasureRes.getError());
      updateProps.unitMeasure = unitMeasureRes.getValue();
    }

    if (data.thresholds !== undefined) {
      const thresholdsRes = Thresholds.create({ ...data.thresholds });
      if (!thresholdsRes.isValid) return Result.fail(thresholdsRes.getError());
      updateProps.thresholds = thresholdsRes.getValue();
    }

    if (data.insulinRatios !== undefined) {
      const insulinRatiosRes = InsulinRatios.create(
        data.insulinRatios.breakfast,
        data.insulinRatios.lunch,
        data.insulinRatios.dinner,
      );
      if (!insulinRatiosRes.isValid) return Result.fail(insulinRatiosRes.getError());
      updateProps.insulinRatios = insulinRatiosRes.getValue();
    }

    if (data.sensitivity !== undefined) {
      const sensitivityRes = SensitivityFactor.create(data.sensitivity);
      if (!sensitivityRes.isValid) return Result.fail(sensitivityRes.getError());
      updateProps.sensitivity = sensitivityRes.getValue();
    }

    // 4. Si el objeto está vacío, no hay nada que actualizar
    if (Object.keys(updateProps).length === 0) {
      // Podrías retornar un error personalizado de "No data provided to update"
      // o simplemente devolver la entidad actual buscándola en el repo.
      return this.repository.getOneById(idRes.getValue());
    }

    // 5. Ejecutar la actualización en el repositorio
    // Tu interfaz dice que update recibe (UserId, Partial<Preference>)
    return await this.repository.update(idRes.getValue(), updateProps);
  }
}