import { PricingType, RestrictionMode } from "@/common/enums/common-enums";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  ValidateIf,
  ValidateNested,
} from "class-validator";

class ScheduleDto {
  @IsString()
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
  name: string;

  @IsString()
  categoryId: string;

  @IsString()
  description: string;

  @IsPositive()
  @Max(24)
  duration: number;

  @IsString()
  originCityId: string;

  @IsArray()
  @IsString({ each: true })
  destinationIds: string[];

  @IsOptional()
  @Type(() => CreateReservableDto)
  reservable: CreateReservableDto;

  @IsString()
  contactPhone: string;

  @IsPositive()
  @ValidateIf(({ reservable }: CreatePlanDto) => !reservable)
  displayPrice: number;

  // NOTE: El manejo de esta propiedad es interno.
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}
