import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getShortChars } from '../shorty.config';

/**
 * Constraint to be used in GET params and in DTO to determine if short url is valid.
 * Using shorty.config as a reference list of chars
 */

export function isShortUrl() {
  return function (object: object, propertyName: string, _index?: number) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      validator: IsShortUrlConstraint,
    });
  };
}

@ValidatorConstraint({ async: false })
export class IsShortUrlConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    const chars = getShortChars();
    const regExp = new RegExp('^[' + compliantEscapeRegExp(chars) + ']+$');

    return !!(typeof value === 'string' && value) && regExp.test(value);
  }
  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not a proper short URL code.`;
  }
}

function compliantEscapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
