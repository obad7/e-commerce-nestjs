import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PasswordsMatch implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.password !== value.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    return value;
  }
}
