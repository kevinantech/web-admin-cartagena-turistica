import { PricingType, RestrictionMode } from "@/common/enums/common-enums";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import "reflect-metadata";

class ScheduleDto {
  @IsString()
  @IsNotEmpty()
  start: string; // formato: "HH:mm"
}

class PricePerGroupDto {
  @IsPositive()
  @IsInt()
  minPeople: number;

  @IsPositive()
  @IsInt()
  maxPeople: number;

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
  maxPeopleAllowed?: number;

  @ValidateIf((o: CreateReservableDto) => o.restrictionBy === RestrictionMode.BOOKINGS)
  @IsPositive()
  maxBookingsAllowed?: number;

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
  @ValidateNested({ each: true })
  @Type(() => PricePerGroupDto)
  pricesPerGroup?: PricePerGroupDto[];
}

export class CreatePlanDto {
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
  originCityId: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  destinationIds: string[];

  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @IsPositive()
  @ValidateIf((o: CreatePlanDto) => !o._reservable)
  displayPrice: number;

  @IsBoolean()
  _reservable: boolean;

  @ValidateIf((o: CreatePlanDto) => o._reservable)
  @ValidateNested()
  @Type(() => CreateReservableDto)
  reservable?: CreateReservableDto;
}
