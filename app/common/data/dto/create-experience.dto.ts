/**
 * API DTO
 * Properties that start with _ have client-side responsibility and not API responsibility,
 * which is why this distinction is made.
 */
import { PricingType, RestrictionMode } from "@/common/enums/domain-enums";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Max,
  registerDecorator,
  ValidateIf,
  ValidateNested,
  ValidatorConstraint,
  type ValidationArguments,
  type ValidatorConstraintInterface,
} from "class-validator";
import "reflect-metadata";

// ----------------------------------------------------------------------------
// Validators
// ----------------------------------------------------------------------------}

@ValidatorConstraint({ name: "ValidatePricesPerGroup", async: false })
export class ValidatePricesPerGroupValidator implements ValidatorConstraintInterface {
  validate(property: any, args: ValidationArguments) {
    const obj = args.object as CreateReservableDto;
    return isValidRanges(
      property as PricePerGroupDto[],
      obj.minPeoplePerBooking,
      obj.maxPeoplePerBooking
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain valid price ranges that cover all possible group sizes between minPeoplePerBooking and maxPeoplePerBooking without overlaps`;
  }
}

// Decorador para aplicar la validación
export function ValidatePricesPerGroup() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      validator: ValidatePricesPerGroupValidator,
    });
  };
}

// ----------------------------------------------------------------------------
// DTOs
// ----------------------------------------------------------------------------

class ScheduleDto {
  @IsString()
  @IsNotEmpty()
  start: string; // formato: "HH:mm"
}

class PricePerGroupDto {
  @IsPositive()
  @IsInt()
  from: number;

  @IsPositive()
  @IsInt()
  to: number;

  @IsPositive()
  amount: number;
}

export class CreateReservableDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedule: ScheduleDto[];

  // --------------------------------------------------------------------------
  // Restricciones
  // --------------------------------------------------------------------------
  @IsEnum(RestrictionMode)
  restrictionBy: RestrictionMode;

  @ValidateIf((o: CreateReservableDto) => o.restrictionBy === RestrictionMode.MAX_PEOPLE)
  @IsPositive()
  maxPeopleAllowed: number;

  @ValidateIf(
    (o: CreateReservableDto) => o.restrictionBy === RestrictionMode.MAX_BOOKINGS
  )
  @IsPositive()
  maxBookingsAllowed: number;

  @IsPositive()
  @IsInt()
  maxPeoplePerBooking: number;

  @IsPositive()
  @IsInt()
  minPeoplePerBooking: number;

  // --------------------------------------------------------------------------
  // Precios
  // --------------------------------------------------------------------------
  @IsEnum(PricingType)
  pricingType: PricingType;

  @ValidateIf((o: CreateReservableDto) => o.pricingType === PricingType.PER_PERSON)
  @IsPositive()
  pricePerPerson: number;

  @ValidateIf((o: CreateReservableDto) => o.pricingType === PricingType.PER_GROUP)
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PricePerGroupDto)
  @ValidatePricesPerGroup()
  pricesPerGroup: PricePerGroupDto[];
}

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsPositive()
  @Max(24)
  duration: number;

  @IsString()
  @IsNotEmpty()
  providerName: string;

  @IsString()
  @IsNotEmpty()
  locationId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  tourStops: string[];

  @IsString()
  @IsPhoneNumber("CO")
  contactPhone: string;

  @IsPositive()
  @ValidateIf((o: CreateExperienceDto) => !o._reservable)
  basePrice: number;

  @ValidateIf((o: CreateExperienceDto) => o._reservable)
  @ValidateNested()
  @Type(() => CreateReservableDto)
  reservable?: CreateReservableDto;

  @IsBoolean()
  _reservable: boolean;
}

export type Range = {
  from: number;
  to: number;
};

/**
 * Validates that ranges are valid and consecutive.
 * A range is valid if it starts at globalMin, ends at globalMax, has no duplicates, and is consecutive with the previous range.
 * @param ranges Array of integer ranges
 * @param globalMin Lower limit
 * @param globalMax Upper limit
 * @returns True if ranges are valid and consecutive
 * @example isValidRanges([{ from: 1, to: 3 }, { from: 4, to: 6 }, { from: 7, to: 10 }], 1, 10) // returns true
 */
export function isValidRanges(
  ranges: Range[],
  globalMin: number,
  globalMax: number
): boolean {
  if (!ranges.length) return false;

  // Ordenar por rango inicial
  const sorted = [...ranges].sort((a, b) => a.from - b.from);

  // El primer rango debe empezar desde globalMin
  if (sorted[0].from !== globalMin) return false;

  for (let i = 0; i < sorted.length; i++) {
    const { from, to } = sorted[i];

    // Cada rango debe estar dentro de los límites
    if (from < globalMin || to > globalMax || from > to) return false;

    // Validar que los rangos sean consecutivos
    if (i > 0) {
      const prev = sorted[i - 1];
      if (from !== prev.to + 1) return false;
    }
  }

  // El último rango debe terminar en globalMax
  const last = sorted[sorted.length - 1];
  return last.to === globalMax;
}
