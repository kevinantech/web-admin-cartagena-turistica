import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from "class-validator";
import "reflect-metadata";

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  reservationDate: Date;

  @IsEmail()
  contactEmail: string;

  @IsString()
  @IsPhoneNumber("CO")
  contactPhone: string;

  @IsPositive()
  @IsInt()
  numberOfPeople: number;
}
