/**
 * API DTO
 * Las propiedades que inicien con _ tienen una responsabilidad en el cliente y no en la API,
 * por eso se demarca esa diferencia.
 */
import { PricingType, RestrictionMode } from "@/common/enums/common-enums";
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
import { isValidRanges } from "~/lib/utils";

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

  @ValidateIf((o: CreateReservableDto) => o.restrictionBy === RestrictionMode.PEOPLE)
  @IsPositive()
  maxPeopleAllowed: number;

  @ValidateIf((o: CreateReservableDto) => o.restrictionBy === RestrictionMode.BOOKINGS)
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
  originCityId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  destinationIds: string[];

  @IsString()
  @IsPhoneNumber("CO")
  contactPhone: string;

  @IsPositive()
  @ValidateIf((o: CreateExperienceDto) => !o._reservable)
  displayPrice: number;

  @ValidateIf((o: CreateExperienceDto) => o._reservable)
  @ValidateNested()
  @Type(() => CreateReservableDto)
  reservable?: CreateReservableDto;

  @IsBoolean()
  _reservable: boolean;
}
